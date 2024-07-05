import{ useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Format } from '../../utils';
import { customStyles } from './select-style'
import { SetModel } from '../../models/set';
import { FLASHY_GREEN, GREEN, RED } from '../../constants';
import _ from 'lodash';


interface IProps {
    set: SetModel
    defaultValue?: number 
    onSelect: (timeframe: number) => void
    onAdd: (resp : null | string) => void
}

const TimeframeSelect = ({ set, onSelect, onAdd, defaultValue }: IProps ) => {
  const timeframes = set.get().availableTimeframes()
  const [loading, setLoading] = useState(false);

  const handleCreate = async (inputValue: string) => {
    setLoading(true);
    try {
      const value = Format.labelToTimeFrame(inputValue);
      if (timeframes.includes(value)) {
        alert('Timeframe already exists');
        return;
      }

      onAdd(await set.addTimeframe(value))
    } catch (e) {
      onAdd('Invalid timeframe')
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
        styles={customStyles} 
        placeholder="Select/Add a timeframe"
        formatCreateLabel={(inputValue) => {
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
        onCreateOption={handleCreate} 
        defaultValue={defaultValue ? {
          value: defaultValue,
          label: Format.timeFrameToLabel(defaultValue) + ' (' + Format.timeFrameToLabel(defaultValue, true) + ')',
        
        } : undefined}
        onChange={(selected) => {
          selected && onSelect(selected.value);
        }}
      />
    </div>
  );
};

export default TimeframeSelect;
