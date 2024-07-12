import { CrosshairMode, LogicalRange, MouseEventParams } from "lightweight-charts";

export interface IChartOptions {
    onRefreshAssets?: () => void
    selectedTime: number | null
    onChangeLogicRange?: (range: LogicalRange) => void
    onChangeCrossHair?: (e: MouseEventParams) => void
    displayTimeScale: boolean
}

export default {
    height: 320,
    layout: {
        background: {color: '#111111'},
        textColor: '#EEEEEE',
        
    },
    grid: {
        vertLines: {
            color: '#353535',
        },
        horzLines: {
            color: '#353535',
        },
    },
    crosshair: {
        mode: CrosshairMode.Normal,
    },
    rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
        borderVisible: false,
        visible: true,
        minimumWidth: 80
    },
    timeScale: {
        shiftVisibleRangeOnNewBar: true,
        borderColor: '#FFFFFF',
        timeVisible: true, // This ensures that time is displayed
    },
};
