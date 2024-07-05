
import { Model } from "acey";

import { AvailableAssetCollection, IAvailableAsset } from "./asset";
import { ISetType, SetTypeCollection } from "./set-type";
import { service } from "../../utils";

export interface IRessources {
    available_assets: IAvailableAsset[]
    available_set_types: ISetType[]
}

export const DEFAULT_RESSOURCES: IRessources = {
    available_assets: [],
    available_set_types: []
}

export class RessourcesModel extends Model {
    constructor(state: IRessources = DEFAULT_RESSOURCES, options: any){
        super({}, options)
        this.updateState(state)
    }

    updateState = (state: IRessources) => {
        this.setState(Object.assign({}, state, {
            available_assets: new AvailableAssetCollection(state.available_assets, this.kids()),
            available_set_types:  new SetTypeCollection(state.available_set_types, this.kids())
        }))
    }


    get = () => {
        return {
            availableAssets: (): AvailableAssetCollection => this.state.available_assets,
            availableSetTypes: (): SetTypeCollection => this.state.available_set_types
        }
    }

    refresh = async () => {
        try {
            const data = await service.request('GetRessources', {}) as IRessources 
            this.updateState(data)
            this.action().save()
            return null
        } catch (e: any){
            return e.toString() as string
        }
    }

}

const ressources = new RessourcesModel(DEFAULT_RESSOURCES, {key: 'ressources', connected: true})
export default ressources