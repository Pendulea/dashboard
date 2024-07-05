import { IModelOptions, Model } from 'acey'
import { service } from '../../utils'
import { CSVStatusCollection, ICSVStatus } from './csv-status'
import { HTMLStatusCollection, IHTMLStatus } from './html-status'

interface IStatus {
    count_pending_tasks: number
    count_running_tasks: number
    csv_statuses: ICSVStatus[]
    html_statuses: IHTMLStatus[]
    cpu_count: number
    available_memory: number
    available_disk_space: number
    min_timeframe: number
}

const DEFAULT_STATUS: IStatus = {
    count_pending_tasks: 0,
    count_running_tasks: 0,
    csv_statuses: [],
    html_statuses: [],
    cpu_count: 0,
    available_memory: 0,
    available_disk_space: 0,
    min_timeframe: 0
}

export class StatusModel extends Model {
    constructor(state = DEFAULT_STATUS, options: IModelOptions){        
        super({}, options) 
        this.updateFullState(state)
    }

    updateFullState = (state: IStatus) => {
        return this.setState(Object.assign({}, state, {
            csv_statuses: new CSVStatusCollection(state.csv_statuses, this.kids()),
            html_statuses: new HTMLStatusCollection(state.html_statuses, this.kids()),
        }))
    }

    refresh = async () => {
        try {
            const r = await service.request('GetStatus', {}) as IStatus
            this.updateFullState(r).save()
            return null
        } catch (e: any){
            return e.toString()
        }
    }

    get = () => {
        return {
            countPendingTasks: (): number => this.state.count_pending_tasks,
            countRunningTasks: (): number => this.state.count_running_tasks,
            csvStatuses: (): CSVStatusCollection => this.state.csv_statuses,
            htmlStatuses: (): HTMLStatusCollection => this.state.html_statuses,
            cpuCount: (): number => this.state.cpu_count,
            availableMemory: (): number => this.state.available_memory,
            availableDiskSpace: (): number => this.state.available_disk_space,
            freeCpuCount: (): number => this.state.cpu_count - this.state.count_running_tasks,
            minTimeframe: (): number => this.state.min_timeframe
        }
    }
}

const appStatus = new StatusModel(DEFAULT_STATUS, {key: 'status', connected: true})

export default appStatus