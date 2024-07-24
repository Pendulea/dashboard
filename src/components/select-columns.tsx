import _  from "lodash"
import { AssetModel } from "../models/asset"
import  {  useMemo } from "react"
import Select from 'react-select';

interface IProps {
    asset: AssetModel

    columns: string[]
    onChange: (columns: string[]) => void

    omitColumns?: string[]
    size?: number
    maxSelectable?: number
}
const SelectColumns = (props: IProps) => {
    const { asset, omitColumns } = props

    const size = props.size || 1

    const getOptions = useMemo(() =>{
        const list = asset.get().ressource().get().dataTypeColumns().
          filter((c) => {
            if (omitColumns){
              return !omitColumns.includes(c)
            } else {
              return true
            }
          })
          
        return list.map((column) => {
            return {
                value: column,
                label: _.capitalize(column).replace('_', ' ')
            }
        })
    }, [asset])
    
    const onChange = (columns: string[]) => {
        props.onChange(columns.slice(0, props.maxSelectable || 10_000))
    }

    if (getOptions.length == 0){
        return null
    }

    const isMulti = props.maxSelectable && props.maxSelectable > 1 ? true : false
    return (
       <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 11 * size, marginBottom: 3 * size}}>COLUMNS:</span>
            <Select
                value={getOptions.filter((o) => props.columns.includes(o.value))}
                isMulti={isMulti}
                name="columns"
                options={getOptions}
                onChange={(e:any) => {
                  if (isMulti){
                    onChange(e.map((o: any) => o.value))
                  }else {
                    onChange([e.value])
                  }
                }}
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
        </div>
    )
}

export default SelectColumns;