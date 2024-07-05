import { Model, Collection } from 'acey'
import { AddressParsedModel, DEFAULT_ADDRESS_PARSED, IAddressParsed } from './address-parsed'
import { ConsistencyCollection, IConsistency } from './consistency'
import { AvailableAssetCollection, AvailableAssetModel } from '../ressources/asset'
import ressources from '../ressources'

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
    constructor(state: IAsset = DEFAULT_ASSET, options: any){
        super({}, options)
        this.setState(Object.assign({}, state, {
            address: new AddressParsedModel(state.address, this.kids()),
            consistencies: new ConsistencyCollection(state.consistencies, this.kids())
        }))
    }

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
            }
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