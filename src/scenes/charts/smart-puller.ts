import { AssetModel } from "../../models/asset"
import sets from "../../models/set"
import { TickCollection } from "../../models/tick"


interface IAsset { 
    address:string
    fetch_count: number
    last_from_time: number
}

class SmartTickFetcher {

    static calculateFromTime = (toTime: number, timeframe: number) => {
        return toTime - (1500 * timeframe)
    }

    private assets: IAsset[] = []
    constructor(private _timeframe: number){}

    private assetsAddresses = () => this.assets.map(a => a.address)
    private assetModels = () => sets.assetsByAddresses(this.assetsAddresses())

    setTimeframe = (timeframe: number) => {
        if (timeframe > 0 && timeframe !== this._timeframe){
            this._timeframe = timeframe
            this.assetModels().forEach((asset: AssetModel) => {
                asset.resetTicks()
            })
        }
    }

    addAsset = (address: string) => {
        if (!this.assets.find(a => a.address === address)){
            const asset = sets.assetsByAddresses([address]).first() as AssetModel
            if (asset){
                const consistency = asset.get().consistencies().findByTimeframe(this._timeframe)
                if (!consistency){
                    throw new Error(`Consistency not found for asset with address ${address}`)
                }
                this.assets.push({address, fetch_count: 0, last_from_time: consistency.get().range()[1]})                
            } else {
                throw new Error(`Asset with address ${address} not found`)
            }
        }
    }

    findMinLastFromTimeFromAlreadyFetched = () => { 
        if (this.assets.length == 0){
            return null
        }
        const list = this.assets.filter(a => a.fetch_count > 0)
        if (list.length == 0){
            //sort by last_from_time desc and return the first
            return this.assets.sort((a, b) => b.last_from_time - a.last_from_time)[0].last_from_time
        } else {
            //sort by last_from_time asc and return the first
            return list.sort((a, b) => a.last_from_time - b.last_from_time)[0].last_from_time
        }
    }


    fetch = async () => {
        const errors: string[] = []

        const minLastFromTime = this.findMinLastFromTimeFromAlreadyFetched()
        if (!minLastFromTime)
            return errors

        const assets = this.assetModels()

        const promises = assets.map((asset: AssetModel) => {
            return asset.fetchTicks(this._timeframe, minLastFromTime)
        }) as Promise<string | TickCollection | null>[]

        const results = await Promise.all(promises)
        results.forEach((result, i) => {
            if (typeof result === 'string'){
                errors.push(result)
            } else if (result !== null){
                const asset = assets.nodeAt(i) as AssetModel
                const idx = this.assets.findIndex(a => a.address === asset.get().addressString())
                if (idx >= 0) {
                    this.assets[idx].fetch_count++
                    this.assets[idx].last_from_time = SmartTickFetcher.calculateFromTime(minLastFromTime, this._timeframe)
                }
            }
        })

        return errors
    }

}

export default SmartTickFetcher