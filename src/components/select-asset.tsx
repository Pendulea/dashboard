import {useMemo } from "react"
import {  AssetModel } from "../models/asset"
import  { SetModel } from "../models/set"
import Select from 'react-select';

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
            return set.get().assets().filterByStartedSync(props.timeframe).map((asset: AssetModel) => {
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


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 11, marginBottom: 3}}>ASSET:</span>
            <Select
                value={
                    selectedAsset ? {
                        value: selectedAsset.get().addressString(),
                        label: selectedAsset.get().ressource().get().label()
                    } : undefined
                }
                isSearchable={true}
                name="asset"
                options={getOptions}
                onChange={(e) => e && onChange(e.value)}
                styles={{
                  valueContainer: (provided) => ({
                    ...provided,
                    height: '30px',
                    padding: '0 8px',
                    display: 'flex',
                    alignItems: 'center',
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  indicatorsContainer: (provided) => ({
                    ...provided,
                    height: '30px',
                  }),
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: '#353535',
                    borderColor: '#353535',
                    minHeight: '25px',
                    height: '30px',
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: '#FFFFFF',
                    height: 'auto',
                    fontSize: 13,
                    margin: '0px',
                    paddingTop: 0,
                    paddingBottom: 0,
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: '#353535',
                    color: '#fff',
                    fontSize: 13,
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    fontSize: 13,
                    color: '#fff',
                    fontWeight: 600,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? '#555555'
                      : state.isFocused
                      ? '#444444'
                      : '#353535',
                    color: '#fff',
                    padding: '5px 10px',
                    fontSize: 13,
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#aaa',
                    fontSize: 13,
                  }),
                }}
            />
            {selectedAsset && <span style={{fontSize:  11.5, fontStyle: 'italic', marginTop: 5}}>
                {selectedAsset.get().ressource().get().description()}
            </span>}
        </div>
    )
}

export default SelectAsset