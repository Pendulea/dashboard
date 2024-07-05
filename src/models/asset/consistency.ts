import { Model, Collection} from 'acey'


export interface IConsistency {
    range: number[]
    timeframe: number
}

export const DEFAULT_CONSISTENCY: IConsistency = {
    range: [0,0],
    timeframe: 0
}

export class ConsistencyModel extends Model {
    constructor(state: IConsistency = DEFAULT_CONSISTENCY, options: any){
        super(state, options)
    }

    get = () => {
        return {
            range: (): number[] => this.state.range.slice(),
            timeframe: (): number => this.state.timeframe
        }
    }
}

export class ConsistencyCollection extends Collection {
    constructor(state: (IConsistency | ConsistencyModel)[] = [], options: any){
        super(state, [ConsistencyModel, ConsistencyCollection], options)
    }

    findByTimeframe = (timeframe: number) => {
        return this.find((consistency: ConsistencyModel) => consistency.get().timeframe() === timeframe) as ConsistencyModel | null
    }

}