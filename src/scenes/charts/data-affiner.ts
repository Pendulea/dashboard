import _ from "lodash"
import { AssetModel } from "../../models/asset"
import sets from "../../models/set"
import { IPointData } from "../../models/tick/point"
import { IQuantityData } from "../../models/tick/quantity"
import { IUnitData } from "../../models/tick/unit"
import { service } from "../../utils"

export interface IDataLine {
    asset_address: string
    column: string
    max_value: number
}

export type TDataPoint = IPointData | IUnitData | IQuantityData

export interface IAssetRef {
    address: string
    data: TDataPoint[]
    _data: TDataPoint[]
    count_fetch: number
}

export class DataAffiner {
    
    binarySearchTick = (array: TDataPoint[], targetTime: number): number => {
        let left = 0;
        let right = array.length - 1;
    
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midVal = array[mid];
    
            if (midVal.time === targetTime) {
                return mid;
            } else if (Number(midVal.time) < targetTime) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    
        return -1; // Target not found
    }

    charts: { sub_charts: IDataLine[] }[] = []
    assets: IAssetRef[] = []
    
    private loading = false
    private last_fetch_from_time: number = 0
    private timeframe: number = 0

    setTimeframe = (timeframe: number) => {
        if (timeframe > 0 && timeframe !== this.timeframe){
            this.timeframe = timeframe
            this.assets.forEach(a => {
                a._data = []
                a.count_fetch = 0
                a.data = []
            })
            this.charts.forEach(c => {
                c.sub_charts.forEach(sc => {
                    sc.max_value = 0
                })
            })
            this.last_fetch_from_time = this.latestConsistencyFromAssets()
        }
    }

    latestConsistencyFromAssets = () => {
        let latest = 0
        this.assets.forEach(a => {
            const assetModel = sets.assetsByAddresses([a.address]).first() as AssetModel
            if (!assetModel)
                return
            const c = assetModel.get().consistencies().findByTimeframe(this.timeframe)
            if (!c)
                return
            const range = c.get().range()
            latest = Math.max(latest, range[1])
        })
        return latest
    }


    getMotherChartIndex =(chart: IDataLine) => {
        return this.charts.findIndex(c => c.sub_charts[0].asset_address === chart.asset_address && c.sub_charts[0].column === chart.column)
    }

    getAssetRefByAddr = (address: string) => {
        return this.assets.find(a => a.address === address) 
    }

    getAssetRefIndexByAddr = (address: string) => {
        return this.assets.findIndex(a => a.address === address)
    }

    private _fetchTicks = async (addr: string, from: number, to: number) => {
        try {
            const r = await service.request('GetTicks', {
                address: addr,
                timeframe: this.timeframe,
                from_time: from,
                to_time: to,
            }) as {
                data_type: number,
                list: (IPointData | IUnitData | IQuantityData)[]
            }
            return r
        } catch (e:any){
            return e.toString() as string
        }
    }

    private _updateMaxWithNewTicks = (asset: IAssetRef, newTicks: TDataPoint[]) => {
        for (let i = 0; i < this.charts.length; i++){
            for (let j = 0; j < this.charts[i].sub_charts.length; j++){
                const subChart = this.charts[i].sub_charts[j]
                if (subChart.asset_address === asset.address){
                    let max = subChart.max_value
                    for (const tick of newTicks){
                        if (subChart.column === ''){
                            const v = (tick as IPointData).v
                            if (v !== undefined){
                                max = Math.max(max, v)
                            }
                            const v2 = (tick as IUnitData).close
                            if (v2 !== undefined){
                                max = Math.max(max, v2)
                            }
                            const v3 = (tick as IQuantityData).plus
                            if (v3 !== undefined){
                                max = Math.max(max, v3)
                            }
                        } else {
                            const v = (tick as any)[subChart.column]
                            if (v !== undefined){
                                max = Math.max(max, v)
                            }
                        }
                    }
                    this.charts[i].sub_charts[j].max_value = max
                }
            }
        }
    }

    private _synchronizeData = () => {
        // Step 1: Collect all unique timestamps
        const allTimestamps = new Set<number>();
        for (const asset of this.assets) {
            for (const dataPoint of asset._data) {
                allTimestamps.add(dataPoint.time);
            }
        }

        const sortedTimestamps = Array.from(allTimestamps).sort((a, b) => a - b);

        // Step 2: Synchronize data for each asset
        for (let i = 0; i < this.assets.length; i++) {
            const asset = this.assets[i]
            const newData: TDataPoint[] = [];
            const existingDataMap = new Map(asset._data.map(dp => [dp.time, dp]));

            let lastValue: TDataPoint
            const assetModel = sets.assetsByAddresses([asset.address]).first() as AssetModel
            if (assetModel.isPoint()){
                lastValue = { time: 0, v: 0 } as IPointData
            } else if (assetModel.isUnit()){
                lastValue = { time: 0, close: 0, open: 0, high: 0, low: 0, average: 0, median: 0, absolute_sum: 0, count: 0 }as IUnitData
            } else if (assetModel.isVolume()){
                lastValue = { time: 0, plus: 0, minus: 0, plus_average: 0,minus_average: 0,plus_median: 0, minus_median: 0, plus_count: 0,minus_count: 0 } as IQuantityData
            } else {
                throw new Error(`Asset with address ${asset.address} is not a point, unit or volume`)
            }

            for (const timestamp of sortedTimestamps) {
                if (existingDataMap.has(timestamp)) {
                    lastValue = existingDataMap.get(timestamp) as TDataPoint;
                    newData.push(lastValue);
                } else if (lastValue) {
                    const newPoint = _.cloneDeep(lastValue);
                    newPoint.time = timestamp;
                    newData.push(newPoint);
                }
            }
            this.assets[i].data = newData;
        }
    }

    fetchTicks = async (sync: boolean) => {
        if (this.assets.length === 0 || this.loading){
            return null
        }
        this.loading = true

        const newLastFetchFromTime = sync ? this.last_fetch_from_time : this.last_fetch_from_time - (1500 * this.timeframe)

        const assetToFetch = this.assets.
        filter((a) => {
            const assetModel = sets.assetsByAddresses([a.address]).first() as AssetModel
            if (!assetModel)
                return false
            const c = assetModel.get().consistencies().findByTimeframe(this.timeframe)
            if (!c)
                return false
            const range = c.get().range()
            if (range[1] < newLastFetchFromTime){
                return false
            }
            if (a.count_fetch > 0 && range[0] > this.last_fetch_from_time){
                return false
            }
            return true
        })
        
        let assetAddresses = assetToFetch.map(a => a.address)
        if (sync)
            assetAddresses = assetToFetch.filter(a => a.count_fetch === 0).map(a => a.address)

        const promises: Promise<string | {
            data_type: number;
            list: (IPointData | IUnitData | IQuantityData)[];
        }>[] = []

        assetAddresses.forEach((addr: string) => {
            const from = newLastFetchFromTime
            const to = sync ? Date.now() : this.last_fetch_from_time
            promises.push(this._fetchTicks(addr, from, to))
        })

        const list = await Promise.allSettled(promises)
       
        //check for errors
        for (const r of list){
            if (r.status === 'fulfilled' && typeof r.value  === 'string'){
                return r.value as string
            }
        }

        for (let i = 0; i < assetAddresses.length; i++){
            const address = assetAddresses[i]
            const promise = list[i]
            if (promise.status === 'fulfilled'){
                const res = promise.value as {
                    data_type: number;
                    list: (IPointData | IUnitData | IQuantityData)[];
                }
                const assetIdx = this.getAssetRefIndexByAddr(address)
                this.assets[assetIdx].count_fetch++

                this.assets[assetIdx]._data = [...res.list, ...this.assets[assetIdx]._data]
                this._synchronizeData()
                this._updateMaxWithNewTicks(this.assets[assetIdx], res.list)

            }
        }

        this.last_fetch_from_time = newLastFetchFromTime
        this.loading = false
        return null   
    }

    private _addAssetIfRequired = (address: string)=>{
        if (!this.assets.find(a => a.address === address)){
            const assetModel = sets.assetsByAddresses([address]).first() as AssetModel | undefined
            if (!assetModel){
                throw new Error(`Asset with address ${address} not found`)
            }
            const consistency = assetModel.get().consistencies().findByTimeframe(this.timeframe)
            if (!consistency){
                throw new Error(`Consistency not found for asset with address ${address}`)
            }
            const range = consistency.get().range()
            if (range[0] === range[1]){
                throw new Error(`asset is not synchronized yet`)
            }
            if (this.last_fetch_from_time === 0){
                this.last_fetch_from_time = range[1]
            }
            this.assets.push({address, data: [], count_fetch: 0, _data: []})
        }
    }

    addChart = (address: string, column: string) => {
        if (this.timeframe === 0){
            throw new Error(`Timeframe must be set before adding a chart`)
        }

        this._addAssetIfRequired(address)

        this.charts.push({
            sub_charts: [{asset_address: address, column, max_value: 0}],
        })
    }

    addSubChart = (motherChartIndex: number, address: string, column: string) => {
        const assetModel = sets.assetsByAddresses([address]).first() as AssetModel | undefined
        if (!assetModel)
            throw new Error(`Asset with address ${address} not found`)
        
        if (!column && !assetModel.isPoint())
            throw new Error(`if asset is not a point, column must be provided`)

        const motherChart = this.charts[motherChartIndex]
        if (!motherChart)
            throw new Error(`Mother chart not found`)

        if (motherChart.sub_charts.find((data: IDataLine) => data.asset_address === address && data.column === column))
            return

        this._addAssetIfRequired(address)
        this.charts[motherChartIndex].sub_charts.push({asset_address: address, column, max_value: 0})
    }

    removeSubChart = (motherChartIndex: number, subChart: IDataLine) => {
        const motherChart = this.charts[motherChartIndex]
        if (!motherChart)
            throw new Error(`Mother chart not found`)

        const subChartIndex = motherChart.sub_charts.findIndex((data: IDataLine) => data.asset_address === subChart.asset_address && data.column === subChart.column)
        if (subChartIndex === -1)
            throw new Error(`Sub chart not found`)

        if (motherChart.sub_charts.length === 1){
            throw new Error(`Mother chart must have at least one sub chart`)
        }

        motherChart.sub_charts.splice(subChartIndex, 1)
    }
} 

export default DataAffiner
