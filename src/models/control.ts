import { Model } from 'acey'

type TView = 'set-list' | 'chart'

interface IState {
    view: TView
}

const DEFAULT_STATE: IState = {
    view: 'set-list'
}

export class Controler extends Model {
    constructor(state: IState = DEFAULT_STATE, options: any){
        super(state, options)
    }

    isOnChart = () => {
        return this.state.view === 'chart'
    }

    setView = (view: TView) => {
        this.setState({view})
    }
}

const controler = new Controler(DEFAULT_STATE, {key: 'controler', connected: true})
export default controler