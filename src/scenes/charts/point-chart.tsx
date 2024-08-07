import { IChartApi, ISeriesApi, LineData, MouseEventParams, Time } from "lightweight-charts"
import {  useCallback, useImperativeHandle, useRef } from "react"
import { Chart, LineSeries, TimeScale } from "lightweight-charts-react-wrapper"
import options, {IChartOptions} from './chart-options'
import _ from "lodash"
import React from "react"
import {  AssetModel } from "../../models/asset"
import { UnitChartRefType } from "./interfaces"
import styled from "styled-components"
import { Format, generateRandomShade } from "../../utils"
import AddAsset from "./add-asset"
import sets, { SetModel } from "../../models/set"
import Checkbox from "../../components/checkbox"
import dataAffiner, { IAssetRef, TDataPoint , IDataLine, DataAffiner } from "./data-affiner"
import { IPointData } from "../../models/tick/point"
import Loading from "../../components/loader"
import { color } from "d3"


const selectTickValue = (asset: AssetModel, tick: TDataPoint, column: string): number => {
    if (!column){
        return (tick as IPointData).v
    }
    if (asset.get().dataType() === 1 || asset.get().dataType() === 2){
        const d = tick as any
        return d[column] || 0
    }
    return -1
}

const wrapTickValuePercent = (value: number, max: number, isPercent: boolean) => {
    if (isPercent){
        return max === 0 ? 0 : (value / max) * 100
    }
    return value
}

const getColor = (asset:AssetModel, column:string, override: { [key: string]: string }) => {
    const id = asset.get().addressString() + column
    if (override[id]){
        return override[id]
    }

    const args = asset.get().address().get().arguments()
    let argInt = 0
    if (args.length > 0){
        argInt = Format.stringToNumber(asset.get().address().get().setID().join('') + args.join('')) % 10_000
    } else {
        argInt = Format.stringToNumber(asset.get().address().get().setID().join('') + column) % 10_000
    }
    return generateRandomShade(asset.get().ressource().get().color(), argInt)
}

const convertToPercentOfMax = (data: LineData[], maxVisible: number): LineData[] => {
    if (data.length === 0) 
        return data;

    return data.map(d => ({
      time: d.time,
      value: (d.value / maxVisible) * 100,
    }));
};

const COLORS = [
    [
        '#ff930f',
        '#ff6361',
        '#ffa600',
        '#95b8d1',
        '#879e82'
    ],
    [
        '#893f71',
        '#72b043',
        '#f37324',
        '#008585',
        '#caf0f6',
    ],
    [
        '#f72585',
        '#a5eb64',
        '#bf5b04',
        '#4361ee',
        '#4cc9f0'
    ],
    [
        '#fff000',
        '#ed008c',
        '#00aeef',
        '#b5bdc4',
        '#ea8f98',
    ],
    [
        '#3bcae5',
        '#7d8bae',
        '#fde8b2',
        '#80558c',
        '#a4f4a1'
    ],
    [
        '#7fc194',
        '#80c783',
        '#57e5d7',
        '#6c58f1',
        '#e6e84c',
    ],
    [
        '#fcc3e2',
        '#f0f0f0',
        '#c0c0fd',
        '#05ff9b',
        '#d2b48c'
    ]
]


const PointToolTip = React.forwardRef((props: {
    charts: IDataLine[]
    isPercent: boolean,
    isMaxInTicks: boolean,
    timeframe: number,
    loading: boolean
    dataAffiner: DataAffiner
    colorOverride: {[key: string]: string}
    onChangeLineColor: (chart: IDataLine) => void
    onDeleteLine: (chart: IDataLine) => void
}, ref) => {

    const {
        isPercent,
        isMaxInTicks,
        timeframe,
        dataAffiner,
        charts
    } = props;

    useImperativeHandle(ref, () => ({
        updateSelectedTime: (time: number | null) => {
            setSelectedTime(time)
        }
    }), [])

    const [selectedTime, setSelectedTime] = React.useState<number | null>(null)

    const renderItem = (asset: AssetModel, chart: IDataLine, ref: IAssetRef, idx: number) => {
        if (ref.data.length === 0){
            return null
        }
        const time = selectedTime ? selectedTime * 1000 : ref.data[ref.data.length - 1].time as number
        const tickIdx = dataAffiner.binarySearchTick(ref.data, time)
        if (tickIdx === -1){
            return null
        }
        const tick = ref.data[tickIdx]
        const localMax = chart.max_value
        let max = Number.MIN_VALUE
        if (isPercent){
            if (isMaxInTicks){
                max = localMax
            } else {
                max = asset.get().consistencies().findByTimeframe(timeframe)?.get().maxValue() as number
            }
        }

        const color = getColor(asset, chart.column, props.colorOverride)
        let name = asset.get().address().get().printableID()
        if (asset.get().dataType() != 3){
            name += `.${chart.column.toUpperCase()}`
        }

        const tickValue = selectTickValue(asset, tick, chart.column)

        return (
            <div 
                className="noselect" 
                onClick={() => props.onChangeLineColor(chart)} 
                onDoubleClick={() => props.onDeleteLine(chart)}
                style={{color, fontSize: 12, fontWeight: 500, cursor: 'pointer'}}
            >
                <span>{name} : {tickValue.toLocaleString()} {isPercent ? ` (${wrapTickValuePercent(tickValue, max, isPercent).toFixed(2)}%)` : ''}</span>
            </div>
        )
    }

    return (
        <SMALegend2 style={{position: 'absolute', zIndex: 1000, top: 5, left: 5, display: 'flex', gap: '2px 20px', flexWrap:'wrap', width: '85%' }}>
            {charts.map((chart, idx) => {
                const asset = sets.assetsByAddresses([chart.asset_address]).first() as AssetModel
                const ref= dataAffiner.getAssetRefByAddr(asset.get().addressString())
                if (!ref){
                    return null
                }
                return (
                    <div key={idx+1}>
                        {renderItem(asset, chart, ref, idx)}
                    </div>
                )
            })}
             {props.loading && <Loading style={{marginLeft: 7}} size={14} white />}
            
        </SMALegend2>
    )
})


interface IPointChartProps { 
    charts: IDataLine[]
    timeframe: number
}

const PointChart =  React.forwardRef<any, IChartOptions & IPointChartProps>((props, ref)  => {
    const { timeframe, dataAffiner } = props
    const lineSerieRef = useRef<ISeriesApi<'Line'>>(null);
    const chartRef = useRef<IChartApi>(null);
    const toolTipRef = useRef<{
        updateSelectedTime: (time: number | null) => void
    } | null>(null)
    const [_r, setR] = React.useState<number>(0)


    const [isPercent, setIsPercent] = React.useState(false)
    const [isMaxInTicks, setIsMaxInTicks] = React.useState(true)
    const [assetColorOverride, setAssetColorOverride] = React.useState<{[key: string]: string}>({})

    useImperativeHandle(ref, () => ({
        serie: lineSerieRef.current,
        chart: chartRef.current,
        updateSelectedTime: (time: number | null) => {
            toolTipRef.current?.updateSelectedTime(time)
        },
    } as UnitChartRefType), [lineSerieRef.current, chartRef.current])

    const handleVisibleLogicalRangeChange = useCallback(() => {
        if (!chartRef || !chartRef.current) {
            return;
        }
        const timeScale = chartRef.current.timeScale()
        const logicalRange = timeScale.getVisibleLogicalRange();
 
        if (logicalRange !== null) {
            props.onChangeLogicRange && props.onChangeLogicRange(logicalRange)
        }
    }, []);

    const debouncedCrosshairMove = _.debounce((e: MouseEventParams) => {
        props.onChangeCrossHair && props.onChangeCrossHair(e)
    }, 5)

    const handleCrosshairMove = useCallback((e: MouseEventParams) => {
        debouncedCrosshairMove(e)
    }, []);

    const onOverrideAssetColor= (chart: IDataLine) => {
        const idx = Math.floor(Math.random() * COLORS.length)
        const list = COLORS[idx]
        const color = list[Math.floor(Math.random() * list.length)]
        const id = chart.asset_address + chart.column
        setAssetColorOverride({...assetColorOverride, [id]: color})
    }

    const getTicks = (asset: AssetModel, column: string)=> {
        const ref = dataAffiner.getAssetRefByAddr(asset.get().addressString())
        if (!ref){
            return []
        }

        return ref.data.map((tick: TDataPoint) => {
            return {value: selectTickValue(asset, tick, column), time: tick.time / 1000 as Time}
        })
    }

    const renderValueDisplayMenu = () =>{
        return (
            <div style={{display:'flex', flexDirection: 'column', position:'absolute', top: 0, right:  isPercent ? 150 : 80, zIndex: 5}}>
                <span style={{fontSize: 10, fontWeight: 700, marginBottom: 3}}>VALUE:</span>
                <Checkbox  
                        label="Normal"
                        checked={!isPercent}
                        onChange={() => setIsPercent(false)}
                    />
                    <Checkbox  
                        label="Percent"
                        checked={isPercent}
                        onChange={() => setIsPercent(true)}
                        style={{marginTop: 5}}
                    />
            </div>
        )
    }

    const renderPercentTypeMaxMenu = () =>{
        if (!isPercent){
            return null
        }
        return (
            <div style={{display:'flex', flexDirection: 'column', position:'absolute', top: 0, right: 80, zIndex: 5}}>
                <span style={{fontSize: 10, fontWeight: 700, marginBottom: 3}}>MAX:</span>
                    <Checkbox  
                        label="Visible"
                        checked={isMaxInTicks}
                        onChange={() => setIsMaxInTicks(true)}
                    />
                    <Checkbox  
                        label="ATH"
                        checked={!isMaxInTicks}
                        onChange={() => setIsMaxInTicks(false)}
                        style={{marginTop: 5}}
                    />
            </div>
        )
    }

    const renderLines = () => {
        return props.charts.map((chart: IDataLine, idx) => {
            const asset = sets.assetsByAddresses([chart.asset_address]).first() as AssetModel
            const ticks = getTicks(asset, chart.column)
            let max = chart.max_value
            if (isPercent && !isMaxInTicks){
                max = asset.get().consistencies().findByTimeframe(timeframe)?.get().maxValue() as number
            }

            const data = isPercent ? convertToPercentOfMax(ticks, max) : ticks

            return (
                <LineSeries
                    ref={idx == 0  ? lineSerieRef : undefined}
                    key={'bffwfw'+idx+1}
                    data={data}
                    reactive={true}
                    lastValueVisible={false}
                    priceLineVisible={false}
                    priceFormat={{
                        type: isPercent ? 'percent' : 'price',
                    }}
                    lineWidth={2}
                    color={getColor(asset, chart.column, assetColorOverride)}
                />
            )
        })
    }

    return (
        <div style={{position: 'relative', width: '100%'}}>
            <PointToolTip 
                ref={toolTipRef}
                charts={props.charts}
                isPercent={isPercent}
                isMaxInTicks={isMaxInTicks}
                timeframe={timeframe}
                loading={props.loading}
                dataAffiner={dataAffiner}
                colorOverride={assetColorOverride}
                onChangeLineColor={onOverrideAssetColor}
                onDeleteLine={(chart: IDataLine) => {
                    const idx = dataAffiner.getMotherChartIndex(props.charts[0])
                    if (idx === -1){
                        return
                    }
                    try {
                        dataAffiner.removeSubChart(idx, chart)
                        setR(Math.random())
                    } catch (e){
                        alert(e)
                    }

                }}
            />
            <Chart 
                onCrosshairMove={handleCrosshairMove} 
                ref={chartRef}
                {...options}
            >
                <TimeScale
                    onVisibleLogicalRangeChange={handleVisibleLogicalRangeChange}
                    visible={props.displayTimeScale}
                />
                {renderLines()}
            </Chart>
            {props.charts.length < 5 && <div style={{display: 'flex', flexDirection: 'row', width:'100%', marginTop: 30, marginBottom: 30}}>
                <span style={{fontSize: 12, fontWeight: 700, marginRight: 30, marginLeft: 20, marginTop: 23}}>ADD NEW LINE</span>
                <div style={{width: '85%'}}>
                    <AddAsset 
                        timeframe={timeframe}
                        onSubmit={(set: SetModel | null, asset: AssetModel | null, columns: string[]) => {
                            if (asset){
                                const idx = dataAffiner.getMotherChartIndex(props.charts[0])
                                if (idx === -1){
                                    return
                                }
                                dataAffiner.addSubChart(idx, asset.get().addressString(), columns.length> 0 ? columns[0] : '')
                                props.onRefreshAssets && setTimeout(props.onRefreshAssets, 50)
                            }
                        }}
                        multiColumn={false}
                    />
                </div>
            </div>}

            {renderValueDisplayMenu()}
            {renderPercentTypeMaxMenu()}
        </div>
    )
})

const SMALegend2 = styled.div`
    font-size: 12px;
    color: white;
    text-align: left;

`

export default PointChart