import {useMemo } from "react"
import {  AssetModel } from "../models/asset"
import  { SetModel } from "../models/set"
import Select from 'react-select';
import selectStyle from "./select-style";

interface IProps {
    set: SetModel
    timeframe: number
    selectedAsset: AssetModel | null
    onChange?: (asset: AssetModel) => void
}

const SelectAsset = (props: IProps) => {
    const { set, selectedAsset } = props

    const onChange = (address: string) =>{
        const asset = set.get().assets().findByAddress(address) as AssetModel
        asset && props.onChange && props.onChange(asset)
    }

    const getOptions = useMemo(() => {
        if (set){
            return set.get().assets().orderByAddressAsc().filterByStartedSync(props.timeframe).map((asset: AssetModel) => {
                const ressource = asset.get().ressource()
                const label = ressource.get().dependencies().length > 0 ? asset.get().address().get().printableID() : ressource.get().label()
                return {
                    value: asset.get().addressString(),
                    label: label
                }
            })
        } else {
            return []
        }
    }, [set, props.timeframe])

    const ressource = selectedAsset ? selectedAsset.get().ressource() : null

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 11, marginBottom: 3}}>ASSET:</span>
            <Select
                value={
                    selectedAsset && ressource ? {
                        value: selectedAsset.get().addressString(),
                        label: selectedAsset.get().address().get().printableID() 
                    } : undefined
                }
                placeholder={"Select asset"}
                isSearchable={true}
                name="asset"
                options={getOptions}
                onChange={(e) => e && onChange(e.value)}
                styles={selectStyle}
            />
            {selectedAsset && <span style={{fontSize:  11.5, fontStyle: 'italic', marginTop: 5}}>
                {selectedAsset.get().ressource().get().description()}
            </span>}
        </div>
    )
}

export default SelectAsset