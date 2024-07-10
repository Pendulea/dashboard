
export interface IUnitData {
    open: number
    high: number
    low: number
    close: number
    average: number
    median: number
    absolute_sum: number
    count: number
    time: number
}


export class UnitModel {

    constructor(private state: IUnitData) {
    }

    get = () => {
        return {
            open: (): number => this.state.open,
            high: (): number => this.state.high,
            low: (): number => this.state.low,
            close: (): number => this.state.close,
            average: (): number => this.state.average,
            median: (): number => this.state.median,
            absoluteSum: (): number => this.state.absolute_sum,
            count: (): number => this.state.count,
            time: (): number => this.state.time
        }
    }
}

export class UnitCollection {
    
    private _map: Map<number, UnitModel> = new Map()
    constructor(public state: UnitModel[]){}

    get = (time: number) => {
        return this._map.get(time)
    }

    first = () => this.state[0] as UnitModel | undefined

    orderByTimeAsc = () => {
        return this.state.sort((a: UnitModel, b: UnitModel) => {
            return a.get().time() - b.get().time()
        })
    }

    count = () => this.state.length

    earliestTime = () => {
        return this.state.reduce((acc: number, m: UnitModel) => {
            return Math.min(acc, m.get().time())
        }, Number.MAX_SAFE_INTEGER)
    }

    latestTime = () => {
        return this.state.reduce((acc: number, m: UnitModel) => {
            return Math.max(acc, m.get().time())
        }, 0)
    }

    add = (batch: IUnitData[]) => {
        const keep: UnitModel[] = []
        for (const tick of batch){
            if (!this.get(tick.time)){
                const u = new UnitModel(tick)
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