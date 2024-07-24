import { useMemo } from "react"
import { SetCollection, SetModel } from "../models/set"
import Select from 'react-select';

interface IProps {
    sets: SetCollection
    timeframe: number
    onChange?: (set: SetModel) => void
    selectedSet: SetModel | null
}

const SelectSet = (props: IProps) => {
    const { sets, selectedSet } = props


    const onChange = (value: string) => {
        const s = sets.findByID(value)
        s && props.onChange && props.onChange(s)
    }

    const getOptions = useMemo(() => {
        return sets.map((set: SetModel) => {
            const idStr = set.get().settings().get().idString()
            const id = set.get().settings().get().id()
            return {
                value: idStr,
                label: `${id[0].toUpperCase()}-${id[1].toUpperCase()}`
            }
        })
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 11, marginBottom: 3}}>SET:</span>
            <Select
                value={
                    selectedSet ? {
                        value: selectedSet.get().settings().get().idString(),
                        label: `${selectedSet.get().settings().get().id()[0].toUpperCase()}-${selectedSet.get().settings().get().id()[1].toUpperCase()}`
                    } : undefined
                }
                isSearchable={true}
                name="set"
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
        </div>
    )
}

export default SelectSet