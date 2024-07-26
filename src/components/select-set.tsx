import { useMemo } from "react"
import { SetCollection, SetModel } from "../models/set"
import Select from 'react-select';
import selectStyle from "./select-style";

interface IProps {
    sets: SetCollection
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
        return sets.orderByRank().map((set: SetModel) => {
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
                placeholder={"Select set"}
                isSearchable={true}
                name="set"
                options={getOptions}
                onChange={(e) => e && onChange(e.value)}
                styles={selectStyle}
            />
        </div>
    )
}

export default SelectSet