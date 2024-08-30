import{ useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Format } from '../utils';
import { FLASHY_GREEN, GREEN, RED } from '../constants';
import _ from 'lodash';
import selectStyle from './select-style';
import { AssetModel } from '../models/asset';
import { SetModel } from '../models/set';


interface IProps {
    set?:SetModel
    timeframes: number[]
    selectedTimeframe: number
    onSelect: (timeframe: number) => void
    onAdd?: (value: number) => Promise<void>
}

const TimeframeSelect = ({ onSelect, onAdd, selectedTimeframe, timeframes, set }: IProps ) => {
  const [loading, setLoading] = useState(false);
  const handleCreate = async (inputValue: string) => {
    if (!onAdd) {
      return
    }
    setLoading(true);
    try {
      const value = Format.labelToTimeFrame(inputValue);
      if (timeframes.includes(value)) {
        alert('Timeframe already exists');
        return;
      }
      await onAdd(value);
    } catch (e) {
      alert('Invalid timeframe');
    } finally {
      setLoading(false);
    }
  };

  const options = _.orderBy(timeframes.map((tf) => {
    return {
      value: tf,
      label: Format.timeFrameToLabel(tf) + ' (' + Format.timeFrameToLabel(tf, true) + ')',
    };
  }), 'value')

  return (
    <div style={{ width: '100%' }}>
      <CreatableSelect 
        isLoading={loading} 
        options={options} 
        styles={selectStyle} 
        placeholder={"Select" + onAdd ? "/Add a timeframe" : ""}
        formatCreateLabel={(inputValue) => {
          if (!inputValue) {
            return null;
          }
          let color = FLASHY_GREEN
          let extra = ''
          try {
            const tf = Format.labelToTimeFrame(inputValue)
            const e = Format.timeFrameToLabel(tf, true)
            if (typeof e === 'string'){
              extra = ` (${e})`
              inputValue = Format.timeFrameToLabel(tf) as string
            } else {
              throw e
            }

          } catch (e) {
            color= RED
          }
          return <span>Add <span style={{color}}>{inputValue}</span> {extra}</span>}
        }
        onCreateOption={onAdd ? handleCreate : undefined}  
        defaultValue={{
          value: selectedTimeframe,
          label: Format.timeFrameToLabel(selectedTimeframe) + ' (' + Format.timeFrameToLabel(selectedTimeframe, true) + ')',
        }}
        onChange={(selected) => {
          selected && onSelect(selected.value);
        }}
      />
      {set && <span
        onClick={async ()=> {
          const promises: Promise<string | null>[] = []
          set.get().assets().forEach((asset: AssetModel) => {
            promises.push(asset.rollback(100 * 365 * 24 * 60 * 60))
          })
          const results = await Promise.all(promises)
          const r = results.filter((r) => r)
          if (r.length){
            alert(r.join('\n'))
          } else {
            alert('Timeframe deletion processing...')
          }
        }}
        style={{marginTop: 3, fontWeight: 800, color: RED, fontSize: 11,cursor: 'pointer'}}>DELETE {Format.timeFrameToLabel(selectedTimeframe) as string} TIMEFRAME</span>}
    </div>
  );
};

export default TimeframeSelect;
