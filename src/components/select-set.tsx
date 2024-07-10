import { BLACK } from "../constants"
import { SetCollection, SetModel } from "../models/set"

interface IProps {
    sets: SetCollection
    onChangeSet: (set: SetModel) => void
    selectedSet?: SetModel
}

const SelectSet = (props: IProps) => {
    const { sets, onChangeSet, selectedSet } = props
    
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 11, marginBottom: 3}}>SET:</span>
            <select 
                defaultValue={undefined}
                onChange={({ target: { value } }) => {
                    onChangeSet(sets.findByID(value) as SetModel)
                }}
                style={{width: '100%', height: 30, outline: 'none', backgroundColor: BLACK, color: 'white'}}>
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