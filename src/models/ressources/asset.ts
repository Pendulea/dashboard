import { Model, Collection } from 'acey'
import { SetModel } from '../set'
import { AssetCollection, AssetModel } from '../asset'
import { service } from '../../utils'


export interface IAvailableAsset {
    asset_type: string
    data_type: number
    dependencies: number[]
    argument_types: string[]
    label: string
    description: string
    color: string
    data_type_name: string
    data_type_color: string
    data_type_columns: string[]
    data_type_description: string
}

export const DEFAULT_AVAILABLE_ASSET: IAvailableAsset = {
    asset_type: '' as any,
    data_type: '' as any,
    dependencies: [],
    argument_types: [],
    label: '',
    description: '',
    color: '',
    data_type_name: '',
    data_type_color: '',
    data_type_columns: [],
    data_type_description: ''
}

export class AvailableAssetModel extends Model {
    constructor(state: IAvailableAsset = DEFAULT_AVAILABLE_ASSET, options: any){
        super(state, options)
    }

    isIndicator = () => {
        return this.get().dependencies() && this.get().dependencies().length > 0
    }

    fetchMinDataDate = async (set: SetModel) => {
        try {
            const res = await service.request('GetAssetMinDate', {
                asset_type: this.get().assetType(),
                set_id: set.get().settings().get().idString()
            }) as { date: string }
            return res.date 
        } catch (e: any) {
            return new Error(e.toString())
        }
    }

    get = () => {
        return {
            assetType: (): string => this.state.asset_type,
            dataType: (): number => this.state.data_type,
            dependencies: (): number[] => (this.state.dependencies || []).slice(),
            argumentTypes: (): string[] => (this.state.argument_types|| []).slice(),
            label: (): string => this.state.label,
            description: (): string => this.state.description,
            dataTypeName: (): string => this.state.data_type_name,
            dataTypeColor: (): string => this.state.data_type_color,
            dataTypeColumns: (): string[] => (this.state.data_type_columns || []).slice() ,
            dataTypeDescription: (): string => this.state.data_type_description,
            color: (): string => this.state.color
        }
    }
}

export class AvailableAssetCollection extends Collection {
    constructor(state: (IAvailableAsset | AvailableAssetModel)[] = [], options: any){
        super(state, [AvailableAssetModel, AvailableAssetCollection], options)
    }

    assetTypes = (): string[] => {
        return this.map((asset: AvailableAssetModel) => asset.get().assetType())
    }

    toAssets = (set: SetModel) => {
        const assetTypes = this.assetTypes()
        return set.get().assets().filter((asset: AssetModel) => {
            if (assetTypes.includes(asset.get().address().get().assetType())){
                return true
            }
        }) as AssetCollection
    }

    filterWithDependencies = () => {
        return this.filter((asset: AvailableAssetModel) => asset.isIndicator()) as AvailableAssetCollection
    }

    findByAssetType = (assetType: string) => {
        return this.find((asset: AvailableAssetModel) => asset.get().assetType() === assetType) as AvailableAssetModel
    }

    orderByAssetTypeAsc = () => {
        return this.orderBy('asset_type', 'asc') as AvailableAssetCollection
    }

    filterByDataType = (dataType: number) => {
        return (this.filter((asset: AvailableAssetModel) => asset.get().dataType() === dataType) as AvailableAssetCollection).orderByAssetTypeAsc()
    }

}

