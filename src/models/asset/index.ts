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

const TICK_FETCHING_LIMIT = 1000


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
    
    resetTicks = () => {
        this._ticks = null
        this._done = false
        this.setState({fetching_ticks: false})
    }

    averageTickTimeGap = () => {
        if (!this._ticks){
            return 0
        }
    }

    minTickTime = () => {   
        if (!this._ticks){
            return Number.MAX_SAFE_INTEGER
        }
        return this._ticks.earliestTime()
    }

    hasMoreTicksToFetch = () => this._done === false

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

    fetchTicks = async (timeframe: number): Promise<string | TickCollection> => {
        if (this.isFetchingTicks() || !this.hasMoreTicksToFetch()){
            return this._ticks as TickCollection || null
        }

        try {
            this.setState({fetching_ticks: true}).save()
            const res = await service.request('GetTicks', {
                address: this.get().addressString(),
                timeframe,
                offset_unix_time: !this._ticks ? Date.now() : this._ticks.earliestTime(),
            }) as {
                data_type: number,
                list: (IPointData | IUnitData | IQuantityData)[]
            }
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
                        throw new Error('Unknown data type')
                }
            } 
            if (res.list.length < TICK_FETCHING_LIMIT){
                this._done = true
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

    minTickTime = () => {
        let min = Number.MAX_SAFE_INTEGER
        for (let i = 0; i < this.count(); i++){
            const asset = this.nodeAt(i) as AssetModel
            if (asset.get().ticksCount() > 0){
                min = Math.min(min, asset.get().ticks()?.earliestTime() || 0)
            }
        }
        if (min=== Number.MAX_SAFE_INTEGER){
            return 0
        }
        return min
    }

    hasMoreTicksToFetch = () => {
        for (let i = 0; i < this.count(); i++){
            if ((this.nodeAt(i) as AssetModel).hasMoreTicksToFetch()){
                return true
            }
        }
        return false
    }

    findLeastMaxConsistency = (timeframe: number) => {
        let min = '9999-12-31'

        for (let i = 0; i < this.count(); i++){
            const asset = this.nodeAt(i) as AssetModel
            const consistency = asset.get().consistencies().findByTimeframe(timeframe)
            if (!consistency){
                return null
            }
            if (consistency.get().range()[1] > consistency.get().range()[0]){
                const d = Format.unixTimestampToStrDate(new Date(consistency.get().range()[1]))
                if (d < min){
                    min = d
                } 
            } else {
                return null
            }
        }
        if (min === '9999-12-31'){
            return null
        }
        return min
    }

    findMaxTicksCount = () => {
        let max = 0

        for (let i = 0; i < this.count(); i++){
            const asset = this.nodeAt(i) as AssetModel
            const count = asset.get().ticksCount()
            if (count > max){
                max = count
            }
        }
        if (max % TICK_FETCHING_LIMIT === 0){
            return max
        }
        return max + (TICK_FETCHING_LIMIT - (max % TICK_FETCHING_LIMIT))
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