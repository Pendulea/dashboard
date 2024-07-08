import React from "react"
import sets, { SetModel } from "../../models/set"
import { AssetModel } from "../../models/asset"
import { BLACK } from "../../constants"
import _ from 'lodash'
import TimeframeCell from "./timeframe-cell"
import Checkbox from "../../components/checkbox"


export type UnpackedOrder = string[] | null

interface IPropsSelectAddressCell { 
    onUpdateOrder: (output: UnpackedOrder) => void
}
const SelectAddressCell = (props: IPropsSelectAddressCell) => {

    const DEFAULT_COLUMNS = ['time']

    const [selectedSet, setSelectedSet] = React.useState<SetModel>(sets.first() as SetModel)
    const [selectedAsset, setSelectedAsset] = React.useState<AssetModel>(selectedSet.get().assets().first() as AssetModel)
    const [selectedColumns, setSelectedColumns] = React.useState<string[]>(DEFAULT_COLUMNS)

    const onChangeSet = (set: SetModel) => {
        setSelectedSet(set)
        setSelectedAsset(set.get().assets().first() as AssetModel)
        setSelectedColumns(DEFAULT_COLUMNS)
        props.onUpdateOrder(formatOrder(set.get().assets().first() as AssetModel, DEFAULT_COLUMNS))
        
    }

    const onChangeAsset = (asset: AssetModel) => {
        setSelectedAsset(asset)
        setSelectedColumns(DEFAULT_COLUMNS)
        props.onUpdateOrder(formatOrder(asset, DEFAULT_COLUMNS))
    }

    const onChangeColumns = (checked: boolean, column: string) => {
        if (column !== 'time'){
            if (checked){
                setSelectedColumns([...selectedColumns, column])
                props.onUpdateOrder(formatOrder(selectedAsset, [...selectedColumns, column]))
            } else {
                setSelectedColumns(selectedColumns.filter((c) => c !== column))
                props.onUpdateOrder(formatOrder(selectedAsset, selectedColumns.filter((c) => c !== column)))
            }
        }
    }

    const formatOrder = (asset: AssetModel, columns: string[]): UnpackedOrder => {
        if (columns.length < 2)
            return null
        const ret: string[] = [ asset.get().addressString(), ...columns]
        if (ret.length < 2)
            return null
        return ret
    }

    const renderSetSelect = () => {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: 11, marginBottom: 3}}>SET:</span>
                <select 
                    defaultValue={undefined}
                    onChange={({ target: { value } }) => {
                        onChangeSet(sets.findByID(value) as SetModel)
                    }}
                    style={{width: '100%', height: 30, outline: 'none', backgroundColor: BLACK, color: 'white'}}>
                    {!selectedSet && <option value={undefined}></option>}
                    {sets.map((set: SetModel) => {
                        const id = set.get().settings().get().id()
                        return (
                            <option 
                                key={set.get().settings().get().idString()}
                                value={set.get().settings().get().idString()}
                            >{id[0].toUpperCase()}-{id[1].toUpperCase()}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

    const renderAssetSelect = () => {
        if (!selectedSet) 
                return null

        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: 11, marginBottom: 3}}>ASSET:</span>
                <select 
                    defaultValue={undefined}
                    onChange={({ target: { value } }) => {
                        onChangeAsset(selectedSet.get().assets().findByAddress(value) as AssetModel)
                    }}
                    style={{width: '100%', height: 30, outline: 'none', backgroundColor: BLACK, color: 'white'}}>
                    {!selectedAsset && <option value={undefined}></option>}
                    {selectedSet.get().assets().map((asset: AssetModel) => {
                        const ressource = asset.get().ressource()
                        const label = ressource.get().dependencies().length > 0 ? asset.get().address().get().printableID() : ressource.get().label()
                        return (
                            <option 
                                key={"435453"+asset.get().addressString()}
                                value={asset.get().addressString()}
                            >{label}</option>
                        )
                    })}
                </select>
                {selectedAsset && <span style={{fontSize: 11.5, fontStyle: 'italic', marginTop: 5}}>
                    {selectedAsset.get().ressource().get().description()}
                </span>}
            </div>
        )
    }


    const chunkedColumns = () => {
        if (!selectedAsset)
            return []
        return _.chunk(selectedAsset.get().ressource().get().dataTypeColumns(), 3)
    }

    return (
        <div>
        <div style={{display: 'flex', flexDirection:  'row', alignItems: 'flex-start'}}>
            <div style={{width: '15%'}}>
                {renderSetSelect()}
            </div>
            {selectedSet && <div style={{width: '40%', marginLeft: 30}}>
                {renderAssetSelect()}
            </div>}
            {selectedAsset && <div style={{width: '38%', display: 'flex', flexDirection: 'column', marginLeft: 20}}>
                <span style={{fontSize: 11, marginLeft: 20, marginBottom: 3}}>COLUMNS:</span>
                {chunkedColumns().map((columns: string[], idx) => {
                    return <div key={'ccc'+idx} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'flex-end'}}>
                        {columns.map((column: string, idx) => {
                            return (
                                <div key={column + idx} style={{width: '33%', display: 'flex', justifyContent: 'flex-end'}}>
                                    <Checkbox 
                                        label={column}
                                        checked={selectedColumns.includes(column)}
                                        onChange={(checked: boolean) => onChangeColumns(checked, column)}
                                        size='medium'
                                    />
                                </div>
                            )
                        })}
                    </div>
                })}
            </div>}
        </div>
         <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 15}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <span style={{fontSize: 10}}>AVAILABLE TIMEFRAMES:</span>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        {selectedSet.get().availableTimeframes().map((timeframe: number, idx: number) => {
                            return <TimeframeCell key={'fwefewf'+ idx} timeframe={timeframe} style={{marginLeft: 10}}/> 
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SelectAddressCell