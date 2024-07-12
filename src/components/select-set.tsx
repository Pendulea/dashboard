import { useEffect } from "react"
import { BLACK } from "../constants"
import { SetCollection, SetModel } from "../models/set"
import React from "react"

interface IProps {
    sets: SetCollection
    onChangeSet: (set: SetModel) => void
    selectedSet?: SetModel
    size?: number
}

const SelectSet = (props: IProps) => {
    const { sets, onChangeSet, selectedSet } = props
    const selectRef = React.useRef<HTMLSelectElement>(null)

    const size = props.size || 1


    const reset = () => {
        if (selectRef.current){
            selectRef.current.value = undefined as any
        }
    }

    useEffect(() => {
        if (!selectedSet){
            reset()
            if (sets.count() > 0){
                onChangeSet(sets.first() as SetModel)
            }
        }
    }, [selectedSet])


    useEffect(() => {
        if (!selectedSet && sets.count() > 0){
            onChangeSet(sets.first() as SetModel)
        }
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: size * 11, marginBottom: size * 3}}>SET:</span>
            <select 
                ref={selectRef}
                defaultValue={undefined}
                onChange={({ target: { value } }) => {
                    onChangeSet(sets.findByID(value) as SetModel)
                }}
                style={{width: '100%', height: size * 30, outline: 'none', backgroundColor: BLACK, color: 'white', fontSize: 13 * size}}>
                {!selectedSet && <option value={undefined}></option>}
                {sets.map((set: SetModel) => {
                    const id = set.get().settings().get().id()
                    return (
                        <option 
                            key={set.get().settings().get().idString()}
                            value={set.get().settings().get().idString()}
                        >{id[0].toUpperCase()}-{id[1].toUpperCase()}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default SelectSet