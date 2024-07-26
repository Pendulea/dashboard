import { useMemo } from "react"
import Select from 'react-select';
import selectStyle from "./select-style";
import _ from "lodash";
import { Format } from "../utils";

interface IProps {
    timeframes: number[]
    selectedTimeframe: number | null
    onChange?: (timeframe: number) => void
}

const SelectTimeframe = (props: IProps) => {
    const { selectedTimeframe, timeframes } = props


    const onChange = (value: string) => {
        props.onChange && props.onChange(parseInt(value))
    }

    const options = useMemo(() => _.orderBy(timeframes.map((tf) => {
        return {
          value: tf,
          label: Format.timeFrameToLabel(tf) + ' (' + Format.timeFrameToLabel(tf, true) + ')',
        };
      }), 'value'), [])
        

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Select
                value={
                    selectedTimeframe ? {
                        value: selectedTimeframe,
                        label: Format.timeFrameToLabel(selectedTimeframe) + ' (' + Format.timeFrameToLabel(selectedTimeframe, true) + ')'
                    } : undefined
                }
                placeholder={"Select timeframe"}
                isSearchable={true}
                options={options}
                onChange={(e: any) => e && onChange(e.value)}
                styles={selectStyle}
            />
        </div>
    )
}

export default SelectTimeframe