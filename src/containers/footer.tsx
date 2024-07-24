import { useAcey } from "react-acey"
import { DARK_GREEN, GOLD } from "../constants"
import appStatus, { StatusModel } from "../models/status"
import { HTMLStatusModel } from "../models/status/html-status"

const Footer = () => {

    useAcey([
        appStatus
    ] as any)

    return (
        <div style={{position: 'fixed', bottom: 0, width: '100%', height: 35, backgroundColor: '#DDDDDD'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%', color: '#353535',marginLeft: 15}}>
                <span style={{fontSize: 11, fontWeight: 500}}>PENDING: <span style={{fontWeight: 800, fontSize: 13, color: appStatus.get().countPendingTasks() > 0 ? GOLD : undefined}}>{appStatus.get().countPendingTasks()}</span></span>
                <span style={{fontSize: 11, fontWeight: 500, marginLeft: 10, marginRight: 10}}> | </span>
                <span style={{fontSize: 11, fontWeight: 500}}>RUNNING: <span style={{fontWeight: 800, fontSize: 13, color: appStatus.get().countRunningTasks() > 0 ? DARK_GREEN : undefined}}>{appStatus.get().countRunningTasks()}</span></span>
                {appStatus.get().htmlStatuses().count() > 0 && <span style={{fontSize: 11, fontWeight: 500, marginLeft: 10, marginRight: 10}}> | </span>}
                {appStatus.get().htmlStatuses().count() > 0 && <span style={{fontSize: 11, fontWeight: 500, marginRight: 10}}>TASKS:</span>}

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {appStatus.get().htmlStatuses().slice(0, 5).map((html: HTMLStatusModel, index:number) => {
                        return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} key={html.get().setID() + index.toString()}>{index > 0 ? <span style={{marginRight: 10, marginLeft: 10, fontSize: 12}}>/</span> : null} <span style={{fontWeight: 800, fontSize: 12}}>{index+1}.</span><span style={{fontSize: 12, marginLeft: 7}}  dangerouslySetInnerHTML={{__html: html.get().html()}} ></span></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Footer