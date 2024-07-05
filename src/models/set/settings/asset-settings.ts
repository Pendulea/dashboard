import { Model, Collection } from 'acey'
import { AddressParsedModel, DEFAULT_ADDRESS_PARSED, IAddressParsed } from '../../asset/address-parsed'

export interface IAssetSettings {
    address: IAddressParsed
    min_data_date: string
    decimals: number
}

export const DEFAULT_ASSET_SETTINGS: IAssetSettings = {
    address: DEFAULT_ADDRESS_PARSED,
    min_data_date: '',
    decimals: 0
}

export class AssetSettingsModel extends Model {
    constructor(state: IAssetSettings = DEFAULT_ASSET_SETTINGS, options: any){
        super({}, options)
        this.setState(Object.assign({}, state, {
            address: new AddressParsedModel(state.address, this.kids())
        }))
    }

    get = () => {
        return {
            address: (): AddressParsedModel => this.state.address,
            minDataDate: (): string => this.state.min_data_date,
            decimals: (): number => this.state.decimals
        }
    }
}

export class AssetSettingsCollection extends Collection {
    constructor(state: (IAssetSettings | AssetSettingsModel)[] = [], options: any){
        super(state, [AssetSettingsModel, AssetSettingsCollection], options)
    }
}