
// Plus  float64 `json:"plus"`
// Minus float64 `json:"minus"`

// PlusAvg  float64 `json:"plus_average"`
// MinusAvg float64 `json:"minus_average"`

// PlusMed  float64 `json:"plus_median"`  // median
// MinusMed float64 `json:"minus_median"` // median

// PlusCount  int64 `json:"plus_count"`  // count
// MinusCount int64 `json:"minus_count"` // count

export interface IQuantityData {
    plus: number
    minus: number
    plus_average: number
    minus_average: number
    plus_median: number
    minus_median: number
    plus_count: number
    minus_count: number
    time: number
}


export class QuantityModel {

    constructor(private state: IQuantityData) {}

    get = () => {
        return {
            plus: (): number => this.state.plus,
            minus: (): number => this.state.minus,
            plusAvg: (): number => this.state.plus_average,
            minusAvg: (): number => this.state.minus_average,
            plusMedian: (): number => this.state.plus_median,
            minusMedian: (): number => this.state.minus_median,
            plusCount: (): number => this.state.plus_count,
            minusCount: (): number => this.state.minus_count,
            time: (): number => this.state.time
        }
    }
}


export class QuantityCollection {
    
    private _map: Map<number, QuantityModel> = new Map()
    constructor(public state: QuantityModel[]){}

    get = (time: number) => {
        return this._map.get(time)
    }

    first = () => this.state[0] as QuantityModel | undefined

    orderByTimeAsc = () => {
        return this.state.sort((a: QuantityModel, b: QuantityModel) => {
            return a.get().time() - b.get().time()
        })
    }

    count = () => this.state.length

    earliestTime = () => {
        return this.state.reduce((acc: number, m: QuantityModel) => {
            return Math.min(acc, m.get().time())
        }, Number.MAX_SAFE_INTEGER)
    }

    latestTime = () => {
        return this.state.reduce((acc: number, m: QuantityModel) => {
            return Math.max(acc, m.get().time())
        }, 0)
    }

    add = (batch: IQuantityData[]) => {
        const keep: QuantityModel[] = []
        for (const tick of batch){
            if (!this.get(tick.time)){
                const u = new QuantityModel(tick)
                keep.push(u)
                this._map.set(tick.time, u)
            }
        }
        if (keep.length == 0){
            return
        }
        this.state = [...keep, ...this.state]
    }
}