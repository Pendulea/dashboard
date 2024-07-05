import { useRef, useState } from "react"
import { FLASHY_GREEN, GOLD, WHITE_GREY } from "../../constants"
import { AssetModel } from "../../models/asset"
import { SetModel } from "../../models/set"
import { Format } from "../../utils"
import { useFloating, offset, shift, flip, autoUpdate } from '@floating-ui/react-dom';
import moment from "moment"
import { getTypeByColumn } from "../../constants/columns"
import { ConsistencyModel } from "../../models/asset/consistency"



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
    if (consistency){
        range = consistency.get().range()

    } else {
        if (asset.get().consistencies().count() == 0){
            range = [0, 0]
        } else {
            const first = asset.get().consistencies().first() as ConsistencyModel
            range = first.get().range()
            range[1] = range[0]
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

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <img style={{width: synced ? 14 : 12, height: synced ? 14 : 12, marginRight: synced ? 5 : 7}} src={`/images/${synced ? 'check-green.png' : 'sync-orange.png'}`} />
                        <span style={{fontSize: label.length > 20 ? 11 : 14}}>{label}</span>
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
                            {t1 > t0 &&<span style={{marginLeft: 5, fontSize: 11, fontWeight: 800}}>{t0} / <span style={{color: synced ? FLASHY_GREEN : GOLD}}>{!synced ? t1 : moment(t1).fromNow()}</span></span>}
                            {t1 <= t0 &&<span style={{marginLeft: 5, fontSize: 11, color: GOLD}}>None</span>}
                        </div>
                        <p style={{fontSize: assetType.length > 30 ? 9.5 : 11, margin: 0, marginTop: 5}}>
                            ID: <span style={{fontWeight: 600}}>{assetType.toUpperCase()}</span>
                        </p> 

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
                {t1 > t0 &&<span style={{fontSize: 10, fontWeight: 500, color: WHITE_GREY}}>{t0} / <span style={{fontWeight: 800, color: synced ? FLASHY_GREEN : GOLD}}>{!synced ? t1 : moment(t1).fromNow()}</span></span>}
                {t1 <= t0 &&<span style={{fontSize: 11, color: GOLD, fontStyle: 'italic'}}>Not synchronized</span>}
            </div>            
        </div>
    )
}

export default AssetCell