import { useState } from 'react'
import SelectSet from '../../components/select-set'
import { AssetModel } from '../../models/asset'
import sets, { SetModel } from '../../models/set'
import SelectAsset from '../../components/select-asset'
import SelectColumns from '../../components/select-columns'
import Button from '../../components/button'


interface IProps {
    style?: any
    onChange: (set: SetModel, asset: AssetModel | null, column: string | null) => void
    onSubmit: () => void
    inline?: boolean,
    selectedSet: SetModel
    timeframe: number
    selectedAsset: AssetModel | null
    selectedColumn: string | null
}

const AddAsset = (props: IProps) => {

    const onChangeSet = (set: SetModel) => {
        const firstAsset = !props.selectedAsset ? (set.get().firstAsset() as AssetModel || null) : props.selectedAsset
        props.onChange(set, firstAsset, null)
    }

    const onChangeAsset = (asset: AssetModel) => {
        props.onChange(props.selectedSet as SetModel, asset, null)
    }

    const onChangeColumn = (column: string) => {
        props.onChange(props.selectedSet as SetModel, props.selectedAsset as AssetModel, column || null)
    }

    const renderSelectSet = () =>(
        <SelectSet 
            sets={sets}   
            onChangeSet={onChangeSet} 
            selectedSet={props.selectedSet} 
            timeframe={props.timeframe}
    />
    )

    const renderSelectAsset = () => (
        <SelectAsset 
            assets={props.selectedSet.get().assets()}
            onChangeAsset={onChangeAsset}
            selectedAsset={props.selectedAsset || undefined} 
            timeframe={props.timeframe}
        />
    ) 

    const renderSelectColumns = () => (
        props.selectedAsset && props.selectedAsset.get().dataType() != 3 && 
        <div style={{width: props.inline ? '35%' : '30%', marginTop: props.inline ? 0 : 10, marginLeft: props.inline ?20: 0}}>
            <SelectColumns 
                omitColumns={['time']}
                chunkSize={4}
                asset={props.selectedAsset}
                onCheckColumn={(checked, column) => onChangeColumn(checked ? column : '')}
                selectedColumns={props.selectedColumn ? [props.selectedColumn] : []}
            />
        </div>
    )


    const renderInColumn = () => {
        return (
            <div style={Object.assign({display: 'flex', flexDirection: 'column', paddingLeft: 20, borderTop: '1px solid white'}, props.style)}>
                <h1 style={{fontSize: 22, padding: 0, margin: 0, marginTop: 20}}>New chart</h1>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20}}>
                <div style={{width: '10%'}}>
                    {renderSelectSet()}
                </div>
                <div style={{width: '20%', marginLeft: 20}}>
                    {renderSelectAsset()}
                </div>
                </div>
                {renderSelectColumns()}
                <div style={{display:'flex', justifyContent: 'center', width: '30%'}}>
                    {props.selectedAsset && <Button 
                        color={'blue'}
                        title={'Add chart'}
                        style={{width: 100, height: 30, marginTop: 40}}
                        onClick={props.onSubmit}
                    />}
                </div>
            </div>
        )
    }

    const renderInline = () => {
        return (
            <div style={Object.assign({display: 'flex', flexDirection: 'row', paddingLeft: 20}, props.style)}>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <div style={{width: '10%'}}>
                        {renderSelectSet()}
                    </div>
                    <div style={{width: '20%', marginLeft: 20}}>
                        {renderSelectAsset()}
                    </div>
                    {renderSelectColumns()}
                    {props.selectedAsset && <Button 
                        color={'black'}
                        title={'Add line'}
                        disabled={!props.selectedColumn && props.selectedAsset.get().dataType() != 3}
                        style={{width: 80, height: 25, marginLeft:20, marginTop:20}}
                        textStyle={{fontSize: 13}}
                        onClick={props.onSubmit}
                        
                    />}
                </div>
            </div>
        )
    }

    return props.inline? renderInline() : renderInColumn()


}
export default AddAsset