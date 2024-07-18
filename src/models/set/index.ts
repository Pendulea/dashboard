import {Model, Collection} from 'acey'
import { DEFAULT_SET_SETTINGS, ISetSettings, SetSettingsModel } from './settings'
import { AssetCollection, AssetModel, IAsset } from '../asset'
import { service } from '../../utils'
import _ from 'lodash'
import { AvailableAssetCollection, AvailableAssetModel } from '../ressources/asset'
import ressources from '../ressources'
import cryptoList from '../../constants/crypto-list'

export interface ISet {
    settings: ISetSettings
    size : number
    assets: IAsset[]
    type: number
}

export const DEFAULT_SET: ISet = {
    settings: DEFAULT_SET_SETTINGS,
    size: 0,
    assets: [],
    type: 0
}

export interface IAddAssetRequest {
    set_id: string
    asset: {
        min_data_date: string
        address: {
            asset_type: string 
            dependencies: string[] //addresses
            arguments: string[]
        }
    }
}

export class SetModel extends Model {

    private _crypto: {name: string, symbol: string, icon: string} | null = null
    constructor(state: ISet = DEFAULT_SET, options: any){
        super({}, options)
        this._updateState(state)
    }

    private _updateState = (state: ISet) => {
        if (!this._crypto && state.settings.id.length){
            this._crypto = cryptoList.find((crypto) => crypto.symbol.toUpperCase() === state.settings.id[0].toUpperCase()) || null
        }

        return this.setState(Object.assign({}, state, {
            settings: new SetSettingsModel(state.settings, this.kids()),
            assets: new AssetCollection(state.assets, this.kids())
        }))
    }

    get = () => {
        return {
            settings: (): SetSettingsModel => this.state.settings,
            size: (): number => this.state.size,
            assets: (): AssetCollection => this.state.assets,
            availableTimeframes: (): number[] => {
                const timeframes: number[] = []
                this.get().assets().forEach((asset: AssetModel) => {
                    asset.get().consistencies().forEach((consistency) => {
                        timeframes.push(consistency.get().timeframe())
                    })
                })
                return _.uniq(timeframes)
            },
            type: (): number => this.state.type,
            assetsToAdd: (): AvailableAssetCollection => {
                const setType = ressources.get().availableSetTypes().findByType(this.get().type())
                if (!setType) {
                    throw new Error('Set type not found')
                }

                const supportedTypesBySet = setType.get().archiveChilds()?.allAssetTypes() || []
                const list = ressources.get().availableAssets().filter((asset: AvailableAssetModel) => {
                    //if asset is in the list of supported ones by the set type 
                    return supportedTypesBySet.includes(asset.get().assetType())
                    &&  //and they are not already used 
                    !this.get().assets().isAssetUsed(asset.get().assetType())
                }) as AvailableAssetCollection
                list.concat(ressources.get().availableAssets().filterWithDependencies().state)
                return list.orderBy(['data_type', 'asset_type'], ['asc', 'asc']) as AvailableAssetCollection
            },
            name: (): string => {
                return this._crypto?.name || 'undefined'
            },
            icon: (): string => {
                return this._crypto?.icon || ''
            },
            firstAsset: (): AssetModel | undefined => {
                return this.get().assets().orderByAddressAsc().first() as AssetModel | undefined
            }
        }
    }

    addAsset = async (asset: IAddAssetRequest) => {
        try {
            const res = await service.request('AddAsset', asset) as ISet
            this._updateState(res).save()
            return null
        } catch (e: any) {
            return e.toString() as string
        }
    }

    addTimeframe = async (timeframe: number) => {
        try {
            await service.request('AddTimeframe', {
                set_id: this.get().settings().get().idString(),
                timeframe: timeframe
            })
            return null
        } catch (e: any) {
            return e.toString() as string
        }
    }

    supportTimeframe = (timeframe: number) => {
        return this.get().availableTimeframes().includes(timeframe)
    }

}

export class SetCollection extends Collection {
    constructor(models: (ISet | SetModel)[] = [], options: any){
        super(models, [SetModel, SetCollection], options)
    }

    elem0 = (): SetModel  => {
        return this.orderByRank().nodeAt(0) as SetModel 
    }

    findByPairA = (assetA: string) => {
        return this.filter((set: SetModel) => {
            return set.get().settings().get().id()[0].toUpperCase() === assetA.toUpperCase()
        }) as SetCollection
    }

    orderByRank = () => {
        const ret: SetModel[] = []
        cryptoList.forEach((crypto) => {
            const list = this.findByPairA(crypto.symbol)
            if (!list.count())
                return
            ret.push(...list.state)
        })
        return new SetCollection(ret, {})
    }

    assetsByAddresses = (addresses: string[]) => {
        const formated = _.uniq(addresses)
        let assets: AssetModel[] = []
        this.forEach((set: SetModel) => {
            set.get().assets().forEach((asset: AssetModel) => {
                if (formated.includes(asset.get().addressString())){
                    assets.push(asset)
                }
            })
        })
        return new AssetCollection(assets, {})
    }

    commonTimeframes = () => {
        const first = this.first() as SetModel
        if (!first){
            return []
        }
        let refTimeframes = first.get().availableTimeframes()
        this.forEach((set: SetModel) => {
            refTimeframes = _.intersection(refTimeframes, set.get().availableTimeframes())
        })
        return refTimeframes
    }

    filterBySupportingTimeframe = (timeframe: number) => {
        return this.filter((set: SetModel) => {
            return set.supportTimeframe(timeframe)
        }) as SetCollection
    }

    filterByIDs = (ids: string[]) => {
        return this.filter((set: SetModel) => {
            return ids.includes(set.get().settings().get().idString())
        }).uniq() as SetCollection
    }

    findByID = (id: string) => {
        return this.find((set: SetModel) => {
            return set.get().settings().get().idString() === id
        }) as SetModel | undefined
    }

    addSet = async (symbol: string) => {
        try { 
            const res = await service.request('AddSet', {symbol: symbol}) as ISet 
            this.push(res).save()
            return null
        } catch (e: any){
            return e.toString() as string
        }
    }

    refresh = async () => {
        try {
            const data = await service.request('GetSetList', {}) as { set_list: ISet[] } 
            for (const set of data.set_list){
                const idString = set.settings.id.join('').toLowerCase()
                const existing = this.findByID(idString)
                if (!existing){
                    this.push(set)
                    continue
                }
                existing.setState({
                    size: set.size,
                    type: set.type,
                    settings: new SetSettingsModel(set.settings, existing.kids())
                })
                set.assets.forEach((assetJSON) => {
                    const asset = existing.get().assets().findByAddress(assetJSON.address_string)
                    if (!asset){
                        existing.get().assets().push(assetJSON)
                        return
                    }
                    asset.updateState(assetJSON)
                })
            }
            this.action().save()
            return null
        } catch (e: any){
            return e.toString() as string
        }
    }
}

const sets = new SetCollection([], {key: 'sets', connected: true})
export default sets




