import { Model, Collection } from 'acey'
import { AssetSettingsCollection, IAssetSettings } from './asset-settings'

// type SetSettings struct {
//     Assets   []AssetSettings  `json:"assets"`
//     ID       []string         `json:"id"`
//     Settings map[string]int64 `json:"settings"`
// }

export interface ISetSettings {
    assets: IAssetSettings[]
    id: string[]
    settings: { [key: string]: number}
}

export const DEFAULT_SET_SETTINGS: ISetSettings = {
    assets: [],
    id: [],
    settings: {}
}

export class SetSettingsModel extends Model {
    constructor(state: ISetSettings = DEFAULT_SET_SETTINGS, options: any){
        super({}, options)
        this.setState(Object.assign({}, state, {
            assets: new AssetSettingsCollection(state.assets, this.kids()),
            settings: new Model(state.settings, this.kids())
        }))
    }

    get = () => {
        return {
            assets: (): AssetSettingsCollection => this.state.assets,
            id: (): string[] => this.state.id,
            settings: (): Model => this.state.settings,
            idString: (): string => this.get().id().join('').toLowerCase()
        }
    }
}