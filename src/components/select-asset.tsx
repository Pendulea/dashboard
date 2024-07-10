import { BLACK } from "../constants"
import { AssetModel } from "../models/asset"
import { SetModel } from "../models/set"

interface IProps {
    set: SetModel
    onChangeAsset: (asset: AssetModel) => void
    selectedAsset?: AssetModel
    dataType?: number
}

const SelectAsset = (props: IProps) => {
    const { set, selectedAsset, dataType } = props
    if (!set) 
            return null

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 11, marginBottom: 3}}>ASSET:</span>
            <select 
                defaultValue={undefined}
                onChange={({ target: { value } }) => {
                    props.onChangeAsset(set.get().assets().findByAddress(value) as AssetModel)
                }}
                style={{width: '100%', height: 30, outline: 'none', backgroundColor: BLACK, color: 'white'}}>
                {!selectedAsset && <option value={undefined}></option>}
                {set.get().assets().filter((a: AssetModel) => !dataType || a.get().ressource().get().dataType() === dataType).map((asset: AssetModel) => {
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


export default SelectAsset