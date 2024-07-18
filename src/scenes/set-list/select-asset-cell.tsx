import React from "react"
import sets, { SetModel } from "../../models/set"
import { AssetModel } from "../../models/asset"
import _ from 'lodash'
import TimeframeCell from "./timeframe-cell"
import Checkbox from "../../components/checkbox"
import SelectSet from "../../components/select-set"
import SelectAsset from "../../components/select-asset"
import SelectColumns from "../../components/select-columns"


export type UnpackedOrder = string[] | null

interface IPropsSelectAddressCell { 
    onUpdateOrder: (output: UnpackedOrder) => void
    timeframe: number
}
const SelectAddressCell = (props: IPropsSelectAddressCell) => {

    const DEFAULT_COLUMNS = ['time']

    const [selectedSet, setSelectedSet] = React.useState<SetModel>(sets.elem0())
    const [selectedAsset, setSelectedAsset] = React.useState<AssetModel | undefined>(selectedSet.get().firstAsset())
    const [selectedColumns, setSelectedColumns] = React.useState<string[]>(DEFAULT_COLUMNS)

    const onChangeSet = (set: SetModel) => {
        const firstAsset = set.get().firstAsset() 
        setSelectedSet(set)
        setSelectedAsset(firstAsset)
        setSelectedColumns(DEFAULT_COLUMNS)
        firstAsset && props.onUpdateOrder(formatOrder(firstAsset, DEFAULT_COLUMNS))
    }

    const onChangeAsset = (asset: AssetModel) => {
        setSelectedAsset(asset)
        setSelectedColumns(DEFAULT_COLUMNS)
        props.onUpdateOrder(formatOrder(asset, DEFAULT_COLUMNS))
    }

    const onChangeColumns = (checked: boolean, column: string) => {
        if (column !== 'time' && selectedAsset){
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

    return (
        <div>
        <div style={{display: 'flex', flexDirection:  'row', alignItems: 'flex-start'}}>
            <div style={{width: '15%'}}>
                <SelectSet 
                    sets={sets} 
                    onChangeSet={onChangeSet} 
                    selectedSet={selectedSet}
                    timeframe={props.timeframe}
                />
            </div>
            {selectedSet && <div style={{width: '40%', marginLeft: 30}}>
                <SelectAsset 
                    assets={selectedSet.get().assets()} 
                    onChangeAsset={onChangeAsset} 
                    selectedAsset={selectedAsset}
                    timeframe={props.timeframe}
                />
            </div>}
            {selectedAsset && <div style={{width: '38%', marginLeft: 20}}>
                <SelectColumns 
                    asset={selectedAsset} 
                    onCheckColumn={onChangeColumns} 
                    selectedColumns={selectedColumns}
                />
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