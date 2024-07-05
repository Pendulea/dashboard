import { DARK_GREEN, GOLD } from "../constants"
import { StatusModel } from "../models/status"
import { HTMLStatusModel } from "../models/status/html-status"

interface IProps {
    status: StatusModel

}

const Footer = (props: IProps) => {
    const { status } = props

    return (
        <div style={{position: 'fixed', bottom: 0, width: '100%', height: 35, backgroundColor: '#DDDDDD'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%', color: '#353535',marginLeft: 15}}>
                <span style={{fontSize: 11, fontWeight: 500}}>PENDING: <span style={{fontWeight: 800, fontSize: 13, color: status.get().countPendingTasks() > 0 ? GOLD : undefined}}>{status.get().countPendingTasks()}</span></span>
                <span style={{fontSize: 11, fontWeight: 500, marginLeft: 10, marginRight: 10}}> | </span>
                <span style={{fontSize: 11, fontWeight: 500}}>RUNNING: <span style={{fontWeight: 800, fontSize: 13, color: status.get().countRunningTasks() > 0 ? DARK_GREEN : undefined}}>{status.get().countRunningTasks()}</span></span>
                {status.get().htmlStatuses().count() > 0 && <span style={{fontSize: 11, fontWeight: 500, marginLeft: 10, marginRight: 10}}> | </span>}
                {status.get().htmlStatuses().count() > 0 && <span style={{fontSize: 11, fontWeight: 500, marginRight: 10}}>TASKS:</span>}

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {status.get().htmlStatuses().slice(0, 5).map((html: HTMLStatusModel, index:number) => {
                        return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} key={html.get().setID() + index.toString()}>{index > 0 ? <span style={{marginRight: 10, marginLeft: 10, fontSize: 12}}>/</span> : null} <span style={{fontWeight: 800, fontSize: 12}}>{index+1}.</span><span style={{fontSize: 12, marginLeft: 7}}  dangerouslySetInnerHTML={{__html: html.get().html()}} ></span></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Footer