import { useEffect } from "react"
import { BLACK } from "../constants"
import { AssetCollection, AssetModel } from "../models/asset"
import { SetModel } from "../models/set"
import React from "react"

interface IProps {
    assets: AssetCollection
    onChangeAsset: (asset: AssetModel) => void
    timeframe: number
    selectedAsset?: AssetModel
    size?: number
}

const SelectAsset = (props: IProps) => {
    const { assets, selectedAsset } = props
    const selectRef = React.useRef<HTMLSelectElement>(null)

    const size = props.size || 1

    const reset = () => {
        if (selectRef.current){
            selectRef.current.value = undefined as any
        }
    }

    useEffect(() => {
        if (!selectedAsset){
            reset()
        }
    }, [selectedAsset])

    const assetList = assets.filterByStartedSync(props.timeframe)

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: size * 11, marginBottom: size * 3}}>ASSET:</span>
            <select 
                ref={selectRef}
                defaultValue={undefined}
                onChange={({ target: { value } }) => {
                    props.onChangeAsset(assets.findByAddress(value) as AssetModel)
                }}
                style={{width: '100%', height: size * 30, outline: 'none', backgroundColor: BLACK, color: 'white', fontSize:13 * size}}>
                {!selectedAsset && <option value={undefined}></option>}
                {assetList.orderByAddressAsc().map((asset: AssetModel) => {
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
            {selectedAsset && <span style={{fontSize: size * 11.5, fontStyle: 'italic', marginTop: size * 5}}>
                {selectedAsset.get().ressource().get().description()}
            </span>}
        </div>
    )
}


export default SelectAsset