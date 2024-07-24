import { BLACK, FLASHY_GREEN } from "../../../constants"
import { Format } from "../../../utils"

interface ITimeframeCellProps {
    style?: any,
    timeframe: number
    onClick?: () => void
    selected?: boolean
    big?: boolean
}

const TimeframeCell = (props: ITimeframeCellProps) => {
    const { timeframe, onClick, selected, big } = props

    return (
        <div onClick={onClick} key={'tf'+timeframe} style={Object.assign({cursor: !!onClick ? 'pointer' : 'not-allowed', width: big ? 45 : 35, height: big ? 24 : 20, display: 'flex', justifyContent: 'center', alignItems: 'center', color: selected ? BLACK : 'white', backgroundColor: selected ? 'white' : 'transparent', border: `1px solid ${selected ? FLASHY_GREEN : 'white'}`, textAlign: 'center', borderRadius: big ? 20 : 13}, props.style)}>
            <span style={{color: selected ? BLACK : 'white', fontSize: selected ? (big ? 13 : 11.5) : (big ? 12 : 10.5), fontWeight: selected ? 900 : 800 }}>{Format.timeFrameToLabel(timeframe) as string}</span>
        </div>
    )
}

export default TimeframeCell
