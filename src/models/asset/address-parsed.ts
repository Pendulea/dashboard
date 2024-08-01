import { Model, Collection } from 'acey'
import ressources from '../ressources'

// type AssetAddressParsed struct {
//     SetID        []string       `json:"set_id"`
//     AssetType    AssetType      `json:"asset_type"`
//     Dependencies []AssetAddress `json:"dependencies"`
//     Arguments    []string       `json:"arguments"`
// }

export interface IAddressParsed {
    set_id: string[]
    asset_type: string
    dependencies: IAddressParsed[]
    arguments: string[]
}

export const DEFAULT_ADDRESS_PARSED: IAddressParsed = {
    set_id: [],
    asset_type: '' as any,
    dependencies: [],
    arguments: []
}

export class AddressParsedModel extends Model {
    constructor(state: IAddressParsed = DEFAULT_ADDRESS_PARSED, options: any){
        super({}, options)
        this.setState(Object.assign({}, state, {
            dependencies: state.dependencies && state.dependencies.length > 0 ? new AddressParsedCollection(state.dependencies, this.kids()) : null
        }))
    }

    get = () => {
        return {
            setID: (): string[] => (this.state.set_id || []).slice(),
            assetType: (): string => this.state.asset_type,
            dependencies: (): AddressParsedCollection | null => this.state.dependencies,
            arguments: (): string[] => (this.state.arguments || []).slice(),
            printableID: (): string => {
                let depStr = ""
                const dep = this.get().dependencies()
                if (dep){
                    depStr = dep.map((d: AddressParsedModel) => {
                        if (d.get().dependencies()){
                            return d.get().printableID()
                        }
                        const r = ressources.get().availableAssets().findByAssetType(d.get().assetType())
                        return r.get().label()
                    }).join(', ')
                }
                const argumentStr = this.get().arguments().join(", ")
                let ret = ''
                ret = this.get().assetType().toUpperCase()
                if (argumentStr !== ""){
                    ret += `(${argumentStr})`
                }
                if (depStr !== ""){
                    ret += `[${depStr}]`
                }
                return ret
            }
        }
    }
}

export class AddressParsedCollection extends Collection {
    constructor(state: (IAddressParsed | AddressParsedModel)[] = [], options: any){
        super(state, [AddressParsedModel, AddressParsedCollection], options)
    }
}