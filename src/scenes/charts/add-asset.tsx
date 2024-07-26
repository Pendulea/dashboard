import { useImperativeHandle, useState } from 'react'
import { AssetModel } from '../../models/asset'
import sets, { SetModel } from '../../models/set'
import SelectSet from '../../components/select-set'
import SelectAsset from '../../components/select-asset'
import SelectColumns from '../../components/select-columns'
import Button from '../../components/button'

interface IProps {
    style?: any
    multiColumn: boolean
    onSubmit?: (set: SetModel | null, asset: AssetModel | null, columns: string[]) => void
    onChange?: (set: SetModel | null, asset: AssetModel | null, columns: string[]) => void
    timeframe: number
}

const AddAsset = (props: IProps) => {

    const [selectedSet, setSelectedSet] = useState<SetModel | null>(sets.first() as SetModel)
    const [selectedAsset, setSelectedAsset] = useState<AssetModel | null>(null)
    const [selectedColumns, setSelectedColumns] = useState<string[]>([])

    const renderSelectSet = () => (
        <SelectSet 
            sets={sets.filterContainingTimeframe(props.timeframe)}   
            selectedSet={selectedSet}
            onChange={(set) => {
                setSelectedSet(set)
                const firstAsset = set.get().assets().filterByStartedSync(props.timeframe).first() as AssetModel
                setSelectedAsset(firstAsset)
                setSelectedColumns([])
                props.onChange && props.onChange(set, firstAsset, [])
            }}
        />
    )

    const renderSelectAsset = () => {
        if (!selectedSet){
            return null
        }
        return (
            <SelectAsset 
                set={selectedSet}
                timeframe={props.timeframe}
                selectedAsset={selectedAsset}
                onChange={(asset) => {
                    setSelectedAsset(asset)
                    setSelectedColumns([])
                    props.onChange && props.onChange(selectedSet, asset, [])
                }}
            />
        )
    }

    
    const hasSubmit = props.onSubmit !== undefined

    return (
        <div style={Object.assign({}, props.style)}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <div style={{width: '20%'}}>
                    {renderSelectSet()}
                </div>
                <div style={{width: hasSubmit ? '30%' : '37%', paddingLeft: 20}}>
                    {renderSelectAsset()}
                </div>
                {selectedAsset && (selectedAsset.get().dataType() !== 3 || props.multiColumn) && <div style={{width: hasSubmit ? '30%' : '37%',  paddingLeft: 20}}>
                    <SelectColumns 
                        omitColumns={props.multiColumn ? [] : ['time']}
                        asset={selectedAsset}
                        maxSelectable={props.multiColumn ? 10000 : 1}
                        columns={selectedColumns}
                        onChange={(columns) => {
                            const filteredColumns = props.multiColumn ? columns : [columns[0]]
                            setSelectedColumns(filteredColumns)
                            props.onChange && props.onChange(selectedSet, selectedAsset, filteredColumns)
                        }}
                    />
                </div>}
                {hasSubmit && <div style={{display:'flex', justifyContent: 'center'}}>
                    {selectedAsset && <Button 
                        color='black'
                        icon='/images/plus-white.png'
                        title=''
                        style={{width: 60, height: 30, marginTop: 19, marginLeft: 20}}
                        onClick={() => {
                            props.onSubmit && props.onSubmit(selectedSet, selectedAsset, selectedColumns)
                        }}
                        iconStyle={{width: 14, height: 14}}
                    />}
                </div>}
            </div>
        </div>
    )
}

export default AddAsset