import {  useState } from "react"
import { BLUE, FLASHY_GREEN, GOLD, GREEN, MIN_TIME_FRAME, RED, WHITE_GREY } from "../../../constants"
import { AssetModel } from "../../../models/asset"
import { SetModel } from "../../../models/set"
import { Format } from "../../../utils"
import { useFloating, offset, shift, flip, autoUpdate } from '@floating-ui/react-dom';
import moment from "moment"
import { getTypeByColumn } from "../../../constants/columns"
import { ConsistencyModel } from "../../../models/asset/consistency"

interface IProps {
    asset: AssetModel
    set: SetModel
    timeframe: number 
}

const AssetCell = (props: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDTOpen, setIsTYOpen] = useState(false);
    
    const floating = useFloating({
        placement: 'bottom-start',
        middleware: [offset(5), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const floatingFT = useFloating({
        placement: 'bottom-start',
        middleware: [offset(5), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });


    const { asset, timeframe } = props

    const consistency = asset.get().consistencies().findByTimeframe(timeframe)

    let range: number[];
    let valueRange: number[];
    if (consistency){
        range = consistency.get().range()
        valueRange = [consistency.get().minValue(), consistency.get().maxValue()]
    } else {
        if (asset.get().consistencies().count() == 0){
            range = [0, 0]
            valueRange = [0, 0]
        } else {
            const first = asset.get().consistencies().first() as ConsistencyModel
            range = first.get().range()
            range[1] = range[0]
            valueRange = [first.get().minValue(), first.get().maxValue()]
        }
    }
    const t0 = Format.unixTimestampToStrDate(new Date(range[0]))
    const t1 = Format.unixTimestampToStrDate(new Date(range[1]))

    const ressource = asset.get().ressource()
    const dataTypeName = ressource.get().dataTypeName()
    const dataTypeColor = ressource.get().dataTypeColor()
    
    const assetType = ressource.get().assetType()

    const synced = asset.isSynced(timeframe)
    const label = ressource.get().dependencies().length > 0 ? asset.get().address().get().printableID() : ressource.get().label()


    const renderLastRead = () => {
        const DAY =  86_400_000
        const lastRead = asset.get().lastReadTime()
        let color = BLUE
        if (lastRead.getTime() < Date.now() - DAY * 10){
            color = GOLD
        } else if (lastRead.getTime() < Date.now() - DAY * 20){
            color = RED
        }
        
        return (
            <p style={{fontSize: 11, margin: 0, marginTop: 5}}>
                Last read: <span style={{fontWeight: 600}}><span style={{color}}>{moment(lastRead).fromNow()}</span></span>
            </p> 
        )
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <img style={{width: synced ? 14 : 12, height: synced ? 14 : 12, marginRight: synced ? 5 : 7}} src={`/images/${synced ? 'check-green.png' : 'sync-orange.png'}`} />
                        <span  style={{fontSize: label.length > 20 ? 11 : 14}}>{label}</span>
                    </div>
                    <span onClick={() => setIsTYOpen(true)} style={{cursor: 'pointer', fontSize: 11, color: dataTypeColor, marginLeft: 3 }}>({dataTypeName})</span>
                </div>
                <div ref={floating.refs.reference as any} onClick={() => setIsOpen(true)}  style={{marginLeft: 5, cursor: 'pointer'}}>
                    <img src={'/images/info.png'} style={{width: 14, height: 14}} />
                </div>
                {isOpen && (
                    <div
                        onMouseLeave={() => setIsOpen(false)}
                        ref={floating.refs.floating as any}
                        style={{
                            position: floating.strategy,
                            backgroundColor: 'black',
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                            width: 250
                        }}
                        >
                            <p style={{fontSize: 14, margin: 0, fontWeight: 800}}>
                                {ressource.get().label()}
                                <span style={{fontSize: 11, color: dataTypeColor, marginLeft: 3  }}>({dataTypeName})</span>
                            </p>
                            <p style={{fontSize: 12.5, marginTop: 10, fontStyle: 'italic'}}>
                                {ressource.get().description()}
                            </p>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 15}}>
                                <span style={{fontSize: 10, color: WHITE_GREY}}>Max data latency: <span style={{fontSize: 11, fontWeight: 800, color: 'white'}}>{asset.get().consistencyMaxLookbackDays() * 24}h</span></span>
                                <span style={{fontSize: 10, marginLeft: 10, color: WHITE_GREY}}>Decimals: <span style={{fontSize: 11, fontWeight: 800, color: 'white'}}>{asset.get().decimals()}</span></span>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', borderTop: '1px solid white', marginTop: 5, paddingTop: 10}}>
                                <span style={{fontSize: 11, color: WHITE_GREY}}>Data availability:</span>
                                {t1 > t0 &&<span style={{marginLeft: 5, fontSize: 11, fontWeight: 800}}>{t0} / <span style={{color: synced ? FLASHY_GREEN : GOLD}}>{t1}</span></span>}
                                {t1 <= t0 &&<span style={{marginLeft: 5, fontSize: 11, color: GOLD}}>None</span>}
                            </div>
                            <p style={{fontSize: 11, margin: 0, marginTop: 5}}>
                                Data range from: <span style={{fontWeight: 600}}><span style={{color: RED}}>{Format.largeNumberToShortString(valueRange[0])}</span> to <span style={{color: FLASHY_GREEN}}>{Format.largeNumberToShortString(valueRange[1])}</span></span>
                            </p> 
                            {renderLastRead()}
                            <p style={{fontSize: assetType.length > 30 ? 9.5 : 11, margin: 0, marginTop: 5}}>
                                ID: <span style={{fontWeight: 600}}>{assetType.toUpperCase()}</span>
                            </p>

                            {t1 > t0 && <div style={{marginTop: 10}}>
                                <span style={{fontWeight: 400, fontSize: 10.5}}>ACTIONS :</span>
                                <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between',marginTop: 2}}>
                                    <span 
                                        onClick={async () => {
                                            //100 years
                                            const r = await asset.rollback(86_400 * 1000 * 365 * 100, timeframe)
                                            if (r){
                                                alert(r)
                                            } else {
                                                alert('Timeframe deletion processing...')
                                            }
                                        }}
                                        style={{cursor: 'pointer', fontSize:9.5, color: RED, fontWeight: 700, border: `1px solid ${RED}`,paddingTop: 3, paddingBottom:3, paddingLeft: 5, paddingRight: 5}}>Delete {timeframe === MIN_TIME_FRAME  ? 'full' : Format.timeFrameToLabel(timeframe) as string} dataset</span>
                                    <span 
                                        onClick={async () => {
                                            //7 days
                                            const r = await asset.rollback(86_400 * 1000 * 90, timeframe)
                                            if (r){
                                                alert(r)
                                            } else {
                                                alert('Rollback processing...')
                                            }
                                        }}
                                        style={{cursor: 'pointer',fontSize:9.5, color: 'orange', fontWeight: 700, border: `1px solid orange`,paddingTop: 3, paddingBottom:3, paddingLeft: 5, paddingRight: 5}}>Rollback to {Format.unixTimestampToStrDate(new Date(range[1] - 86_400 * 1000 * 90))} {timeframe !== MIN_TIME_FRAME ? '(' + Format.timeFrameToLabel(timeframe) as string + ')' : ''}</span>
                                </div>
                            </div>}

                    </div>
                )}
                {isDTOpen && (
                    <div
                    onMouseLeave={() => setIsTYOpen(false)}
                    ref={floatingFT.refs.floating as any}
                    style={{
                        position: floatingFT.strategy,
                        backgroundColor: 'black',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        width: 250,
                    }}
                    >
                        <p style={{fontSize: 14, margin: 0, fontWeight: 800, color: dataTypeColor}}>
                           {dataTypeName.toUpperCase()}
                        </p>
                        <p style={{fontSize: 13.5, marginTop: 10, fontStyle: 'italic'}}>
                            {ressource.get().dataTypeDescription()}
                        </p>
                        <span style={{fontSize: 12, color: WHITE_GREY}}>
                            Columns list:   
                        </span>
                        <ul style={{display: 'flex', flexDirection: 'column'}}>
                        {ressource.get().dataTypeColumns().map((col, index) => {
                            const colType = getTypeByColumn(col)
                            return (
                                <li key={col + index} style={{fontSize: 13, fontWeight: 600, color: 'white', marginLeft: 5}}>{col} <span style={{fontWeight: 500, color: colType === 'int64' ? '#2FADC9' : '#2FC99F'}}>({getTypeByColumn(col)})</span></li>
                            )
                        })}
                        </ul>
                    </div>
                )}

            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                {t1 > t0 &&<span style={{fontSize: 10, fontWeight: 500, color: WHITE_GREY}}>{t0} / <span style={{fontWeight: 800, color: synced ? FLASHY_GREEN : GOLD}}>{t1}</span></span>}
                {t1 <= t0 &&<span style={{fontSize: 11, color: GOLD, fontStyle: 'italic'}}>Not synchronized</span>}
            </div>            
        </div>
    )
}

export default AssetCell