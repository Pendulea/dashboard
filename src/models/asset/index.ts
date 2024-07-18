import { Model, Collection } from 'acey'
import { AddressParsedModel, DEFAULT_ADDRESS_PARSED, IAddressParsed } from './address-parsed'
import { ConsistencyCollection, IConsistency } from './consistency'
import { AvailableAssetCollection, AvailableAssetModel } from '../ressources/asset'
import ressources from '../ressources'
import { Format, service } from '../../utils'
import { IPointData, PointCollection } from '../tick/point'
import { IUnitData, UnitCollection } from '../tick/unit'
import { IQuantityData, QuantityCollection } from '../tick/quantity'
import { TickCollection } from '../tick'
import SmartTickFetcher from '../../scenes/charts/smart-puller'
import { DATA_DELAY_TOLERANCE } from '../../constants'


export interface IAsset {
    address_string: string
    address: IAddressParsed
    consistency_max_lookback_days: number
    consistencies: IConsistency[]
    data_type: number
    decimals: number
    min_data_date: string
}

const DEFAULT_ASSET: IAsset = {
    address_string: '',
    address: DEFAULT_ADDRESS_PARSED,
    consistency_max_lookback_days: 0,
    consistencies: [],
    data_type: 0,
    decimals: 0,
    min_data_date: ''
}

export class AssetModel extends Model {

    private _ticks: TickCollection | null = null
    private _done: boolean = false
    
    isLateUnsynced = (timeframe: number) => {
        const extraSec = Date.now() % 86_400_000
        const maxDayConsistency = Date.now() - this.get().consistencyMaxLookbackDays() * 86_400_000 - extraSec

        const consistency = this.get().consistencies().findByTimeframe(timeframe)
        if (!consistency || !consistency.hasStartedSync()){
            return -1
        }
        const maxRange = consistency.get().range()[1]
        if (maxRange > (maxDayConsistency - DATA_DELAY_TOLERANCE))
            return null
        return maxRange - (maxDayConsistency - DATA_DELAY_TOLERANCE)
    }

    resetTicks = () => {
        this._ticks = null
        this._done = false
        this.setState({fetching_ticks: false})
    }

    hasMoreTicksToFetch = () => this._done === false

    earliestTickTime = (timeframe:number) => {
        const ticks = this.get().ticks()
        if (!ticks){
            const c = this.get().consistencies().findByTimeframe(timeframe)
            if (c && c.hasStartedSync()){
                return c.get().range()[1]
            }
        } else {
            return ticks.earliestTime()
        }
        return -1
    }

    constructor(state: IAsset = DEFAULT_ASSET, options: any){
        super({}, options)
        this.setState(Object.assign({}, state, {
            address: new AddressParsedModel(state.address, this.kids()),
            consistencies: new ConsistencyCollection(state.consistencies, this.kids()),
            fetching_ticks: false
        }))
    }

    updateState = (state: IAsset) => {
        this.setState(Object.assign({}, state, {
            address: new AddressParsedModel(state.address, this.kids()),
            consistencies: new ConsistencyCollection(state.consistencies, this.kids())
        }))
    }

    fetchTicks = async (timeframe: number, toTime: number): Promise<string | null | TickCollection> => {
        if (this.isFetchingTicks() || !this.hasMoreTicksToFetch()){
            return null
        }

        const c = this.get().consistencies().findByTimeframe(timeframe)
        if (!c){
            return 'no consistency found'
        }
         
        const isFirstFetch = this.get().ticksCount() === 0

        if (!isFirstFetch && toTime <= c.get().range()[0]){
            this._done = true
            return null
        }

        const fromTime = SmartTickFetcher.calculateFromTime(toTime, timeframe)
        if (this.earliestTickTime(timeframe) < fromTime){
            return null
        }


        try {
            this.setState({fetching_ticks: true}).save()
            const res = await service.request('GetTicks', {
                address: this.get().addressString(),
                timeframe,
                to_time: isFirstFetch ? Date.now() : toTime,
                from_time: fromTime
            }) as {
                data_type: number,
                list: (IPointData | IUnitData | IQuantityData)[]
            }
            //in case the asset has been reset while fetching
            if (!this.isFetchingTicks())
                return null

            if (!this._ticks){
                switch (res.data_type){
                    case 1:
                        this._ticks = new UnitCollection([])
                        break
                    case 2:
                        this._ticks = new QuantityCollection([])
                        break
                    case 3:
                        this._ticks = new PointCollection([])
                        break
                    default:
                        throw new Error('unknown data type')
                }
            }
            
            this._ticks.add(res.list as any)
            this.setState({fetching_ticks: false}).save()
            return this._ticks
        } catch (e: any) {
            this.setState({fetching_ticks: false})
            return e.toString() as string
        }
    }

    isFetchingTicks = (): boolean => this.state.fetching_ticks

    get = () => {
        return {
            addressString: (): string => this.state.address_string,
            address: (): AddressParsedModel => this.state.address,
            consistencyMaxLookbackDays: (): number => this.state.consistency_max_lookback_days,
            consistencies: (): ConsistencyCollection => this.state.consistencies,
            dataType: (): number => this.state.data_type,
            decimals: (): number => this.state.decimals,
            minDataDate: (): string => this.state.min_data_date,
            ressource: (): AvailableAssetModel => {
                return ressources.get().availableAssets().findByAssetType(this.get().address().get().assetType())
            },
            ticks: (): TickCollection | null => this._ticks,
            ticksCount: (): number => this._ticks ? this._ticks.count() : 0
        }
    }

    isSynced = (timeframe: number) => {
        const t = this.get().consistencies().findByTimeframe(timeframe)
        if (t){
            const nMaxOK = Math.floor(((Date.now() - Math.max(timeframe, 86_400_000)) / 86_400_000) - this.get().consistencyMaxLookbackDays())
            const nCurrentMax = Math.floor(t.get().range()[1] / 86_400_000)
            return nCurrentMax >= nMaxOK
        }
        return false
    }

}

export class AssetCollection extends Collection {

    constructor(state: (IAsset | AssetModel)[] = [], options: any){
        super(state, [AssetModel, AssetCollection], options)
    }

    filterByStartedSync = (timeframe: number) => {
        return this.filter((asset: AssetModel) => {
            const c = asset.get().consistencies().findByTimeframe(timeframe)
            return c && c.hasStartedSync()
        }) as AssetCollection
    }

    findMaxConsistency = (timeframe: number) => {
        let min = 0
        this.forEach((asset: AssetModel) => {
            const c = asset.get().consistencies().findByTimeframe(timeframe)
            if (c && c.hasStartedSync()){
                const range = c.get().range()
                if (range[1] > min){
                    min = range[1]
                }
            }
        })
        return min
    }

    findMinHistoricalDate = () => {
        let min = '9999-12-31'

        for (let i = 0; i < this.count(); i++){
            const asset = this.nodeAt(i) as AssetModel
            const minDate = asset.get().minDataDate()
            if (!minDate){
                return null
            }
            if (minDate < min){
                min = minDate
            }
        }
        if (min === '9999-12-31'){
            return null
        }
        return min
    }

    filterLateUnsynced = (timeframe: number) => {
        return this.filter((asset: AssetModel) => {
            return asset.isLateUnsynced(timeframe) !== null
        }) as AssetCollection
    }
    
    findByAddress = (address: string) => {
        return this.find((asset: AssetModel) => {
            return asset.get().addressString() === address
        }) as AssetModel
    }

    filterByAddresses = (addresses: string[]) => {
        return this.filter((asset: AssetModel) => {
            return addresses.includes(asset.get().addressString())
        }) as AssetCollection
    }

    containsOneOfAssets = (assetTypes: string[]) => {
        return this.find((asset: AssetModel) => {
            return assetTypes.includes(asset.get().address().get().assetType())
        }) as AssetModel
    }

    assetTypeList = () => {
        return this.map((asset: AssetModel) => {
            return asset.get().address().get().assetType()
        }) as string[]
    }

    orderByAddressAsc = () => {
        return this.orderBy((a: AssetModel) => {
            return a.get().addressString()
        }, 'asc') as AssetCollection
    }

    isAssetUsed = (assetType: string) => {
       const found = this.find((asset: AssetModel) => {
            const addr = asset.get().address().get()
            return addr.assetType() === assetType && addr.dependencies() === null
        })
        return !!found
    }

    filterByDataType = (dataType: number) => {
        return this.filter((asset: AssetModel) => {
            return asset.get().dataType() === dataType
        }) as AssetCollection
    }

    toRessource = (): AvailableAssetCollection => {
        const assetList = this.assetTypeList()
        return ressources.get().availableAssets().filter((asset: AvailableAssetModel) => {
            return assetList.includes(asset.get().assetType())
        }) as AvailableAssetCollection
    }

}