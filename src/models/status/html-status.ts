import { Model, IModelOptions, Collection } from 'acey'

export interface IHTMLStatus {
    set_id: string
    html: string
}

const DEFAULT_HTML_STATUS: IHTMLStatus = {
    set_id: '',
    html: '',
}

export class HTMLStatusModel extends Model {
    constructor(state = DEFAULT_HTML_STATUS, options: IModelOptions){
        super(state, options) 
    }

    get = () => {
        return {
            setID: (): string => this.state.set_id,
            html: (): string => this.state.html,
        }
    }
}

export class HTMLStatusCollection extends Collection {
    constructor(models: (IHTMLStatus | HTMLStatusModel)[] = [], options: any){
        super(models, [HTMLStatusModel, HTMLStatusCollection], options)
    }
}


