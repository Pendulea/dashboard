import _ from "lodash"
import { AssetModel } from "../models/asset"
import Checkbox from "./checkbox"

interface IProps {
    asset: AssetModel
    onCheckColumn: (checked: boolean, column:string) => void
    selectedColumns: string[]
    omitColumns?:string[]
    size?: number
    chunkSize?: number
}

const SelectColumns = (props: IProps) => {
    const { asset, onCheckColumn, selectedColumns, omitColumns } = props

    const size = props.size || 1
    const chunkSize = props.chunkSize || 3

    const chunkedColumns = () => {
        const columns = asset.get().ressource().get().dataTypeColumns()
        if (omitColumns){
            return _.chunk(columns.filter((c) => !omitColumns.includes(c)), chunkSize)
        }
        return _.chunk(asset.get().ressource().get().dataTypeColumns(), chunkSize)
    }
    
    const columnList= chunkedColumns()
    if (columnList.length == 0){
        return null
    }

    return (
       <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 11 * size, marginBottom: 3 * size}}>COLUMNS:</span>
            {chunkedColumns().map((columns: string[], idx) => {
                return <div key={'ccc'+idx} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'flex-end'}}>
                    {columns.map((column: string, idx) => {
                        return (
                            <div key={column + idx} style={{width: (100 / chunkSize) - 1 + '%', display: 'flex', justifyContent: 'flex-end'}}>
                                <Checkbox 
                                    label={column}
                                    checked={selectedColumns.includes(column)}
                                    onChange={(checked: boolean) => onCheckColumn(checked, column)}
                                    size='medium'
                                />
                            </div>
                        )
                    })}
                </div>
            })}
        </div>
    )
}

export default SelectColumns;