

import { IModelOptions, Model, Collection } from 'acey'

export interface ICSVStatus {
    build_id: string
    status: string
    percent: number
    size: number
    from: number
    to: number
    request_time: number
    timeframe_label: string
}

const DEFAULT_CSV_STATUS: ICSVStatus = {
    build_id: '',
    status: '',
    request_time: 0,
    size: 0,
    percent: 0,
    from: 0,
    to: 0,
    timeframe_label: '',
}

export class CSVStatusModel extends Model {
    constructor(state = DEFAULT_CSV_STATUS, options: IModelOptions){
        super(state, options) 
    }

    get = () => {
        return {
            buildID: (): string => this.state.build_id,
            status: (): string => this.state.status,
            percent: (): number => this.state.percent,
            size: (): number => this.state.size,
            from: (): number => this.state.from,
            to: (): number => this.state.to,
            requestTime: (): Date => new Date(this.state.request_time * 1000),
            timeframeLabel: (): string => this.state.timeframe_label
        }
    }
}

export class CSVStatusCollection extends Collection {

    constructor(models: (ICSVStatus | CSVStatusModel)[] = [], options: any){
        super(models, [CSVStatusModel, CSVStatusCollection], options)
    }
}