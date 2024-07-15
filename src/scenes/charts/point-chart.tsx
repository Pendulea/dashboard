import { IChartApi, ISeriesApi, LineData, MouseEventParams, Time } from "lightweight-charts"
import {  useCallback, useEffect, useImperativeHandle, useRef } from "react"
import { Chart, LineSeries, TimeScale } from "lightweight-charts-react-wrapper"

import options, {IChartOptions} from './chart-options'
import _ from "lodash"
import React from "react"
import { AssetCollection, AssetModel } from "../../models/asset"
import { UnitChartRefType } from "./interfaces"
import styled from "styled-components"
import { UnitCollection, UnitModel } from "../../models/tick/unit"
import { QuantityModel } from "../../models/tick/quantity"
import { PointModel } from "../../models/tick/point"
import { Format, generateRandomShade } from "../../utils"
import AddAsset from "./add-asset"
import sets, { SetModel } from "../../models/set"
import Checkbox from "../../components/checkbox"


interface IPointChartProps { 
    asset: AssetModel
    column: string
    fetchCount: number
    timeframe: number
}

interface IExtraLine {
    asset_address: string
    column: string
}

const getMaxValue = (data: LineData[]): number => {
    const maxValue = Math.max(...data.map(d => d.value));
    return maxValue
}

const convertToPercentOfMax = (data: LineData[], timeframe: number, asset?: AssetModel): LineData[] => {
    if (data.length === 0) 
        return data;

    let maxValue: number = Number.MIN_VALUE
    if (asset){
        maxValue = asset.get().consistencies().findByTimeframe(timeframe)?.get().maxValue() as number
    }  else {
        maxValue = getMaxValue(data)
    }
    return data.map(d => ({
      time: d.time,
      value: (d.value / maxValue) * 100,
    }));
};
function synchronizeDataLists(dataLists: LineData[][]): LineData[][] {
    // Step 1: Collect all unique timestamps
    const allTimestamps = new Set<Time>();
    for (const dataList of dataLists) {
        for (const dataPoint of dataList) {
            allTimestamps.add(dataPoint.time);
        }
    }

    // Convert set to sorted array
    const sortedTimestamps = Array.from(allTimestamps).sort();

    // Step 2: Create synchronized data lists
    const synchronizedDataLists = dataLists.map(dataList => {
        const timeToDataPointMap = new Map<Time, LineData>();
        dataList.forEach(dataPoint => timeToDataPointMap.set(dataPoint.time, dataPoint));

        const synchronizedDataList: LineData[] = [];
        let lastValue = 0; // Initial last value is 0

        for (const timestamp of sortedTimestamps) {
            if (timeToDataPointMap.has(timestamp)) {
                lastValue = timeToDataPointMap.get(timestamp)!.value;
            }
            synchronizedDataList.push({ time: timestamp, value: lastValue });
        }

        return synchronizedDataList;
    });

    return synchronizedDataLists;
}


function binarySearch(arr: LineData[], targetTime: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = arr[mid];

        if (midVal.time === targetTime) {
            return mid;
        } else if (Number(midVal.time) < targetTime) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Target not found
}

const PointChart =  React.forwardRef<any, IChartOptions & IPointChartProps>((props, ref)  => {
    const { timeframe } = props
    const lineSerieRef = useRef<ISeriesApi<'Line'>>(null);
    const chartRef = useRef<IChartApi>(null);

    const [extraLines, setExtraLines] = React.useState<IExtraLine[]>([])

    const [selectedSet, setSelectedSet] = React.useState<SetModel>(sets.first() as SetModel)
    const [selectedAsset, setSelectedAsset] = React.useState<null | AssetModel>(null)
    const [selectedColumn, setSelectedColumn] = React.useState<string | null>(null)
    const [isPercent, setIsPercent] = React.useState(false)
    const [isMaxInTicks, setIsMaxInTicks] = React.useState(true)
    const [dataList, setData] = React.useState<LineData[][]>([])
    const [maxList, setMaxList] = React.useState<number[]>([])


    useImperativeHandle(ref, () => ({
        serie: lineSerieRef.current,
        chart: chartRef.current,
        assets: (): string[] => [props.asset.get().addressString(), ...extraLines.map(l => l.asset_address)],
    } as UnitChartRefType), [lineSerieRef.current, chartRef.current, extraLines])

    useEffect(() => {
        
        const lines: IExtraLine[] = [{
            asset_address: props.asset.get().addressString(),
            column: props.column
        }, ...extraLines.slice(0, 4)]

        const dataList = synchronizeDataLists(lines.map((line, idx) => {
            const asset = sets.assetsByAddresses([line.asset_address]).first() as AssetModel
            return getTicks(asset, line.column)
        }))

        setData(dataList)
        setMaxList(dataList.map(d => getMaxValue(d)))

    }, [props.fetchCount])


    const selectTickValue = (asset:AssetModel, tick: UnitModel | QuantityModel | PointModel, column: string): number => {
        if (!column){
            return (tick as PointModel).get().value()
        }
        if (asset.get().dataType() === 1){
            const d = (tick as UnitModel).state as any
            return d[column] || 0
        }
        if (asset.get().dataType() === 2){
            const d = (tick as QuantityModel).state as any
            return d[column] || 0
        }
        return -1
    }

    const wrapTickValuePercent = (value: number, max: number) => {
        if (isPercent){
            return max === 0 ? 0 : (value / max) * 100
        }
        return value

    }

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

    const getTicks = (asset: AssetModel, column:string )=> {
        const ticks = asset.get().ticks()
        if (!ticks){
            return []
        }
        return ticks.state.map((tick: UnitModel | QuantityModel | PointModel) => {
            return {value: selectTickValue(asset, tick, column), time: tick.get().time() / 1000 as Time}
        })
    }

    const getColor = (asset:AssetModel, column:string)=> {
        const args = asset.get().address().get().arguments()
        let argInt = 0
        if (args.length > 0){
            argInt = Format.stringToNumber(asset.get().address().get().setID().join('') + args.join('')) % 10_000
        } else {
            argInt = Format.stringToNumber(asset.get().address().get().setID().join('') + column) % 10_000
        }
        return generateRandomShade(asset.get().ressource().get().color(), argInt)
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

    const renderLegend = () => {
        const renderItem = (asset: AssetModel, column: string, idx: number) => {
            const data = dataList[idx]
            if (!data|| data.length === 0){
                return null
            }
            const selectedTime = props.selectedTime ? props.selectedTime : data[data.length - 1].time as number
            const tickIdx = binarySearch(data, selectedTime)
            if (tickIdx === -1){
                return null
            }
            const tick = data[tickIdx]
            const localMax = maxList[idx]
            let max = Number.MIN_VALUE
            if (isPercent){
                if (isMaxInTicks){
                    max = localMax
                } else {
                    max = asset.get().consistencies().findByTimeframe(timeframe)?.get().maxValue() as number
                }
            }

            const color = getColor(asset, column)
            let name = asset.get().address().get().printableID()
            if (asset.get().dataType() != 3){
                name += `.${column.toUpperCase()}`
            }
            return (
                <div style={{color, fontSize: 12, fontWeight: 500}}>
                    <span>{name} : {tick.value} {isPercent ? ` (${wrapTickValuePercent(tick.value, max).toFixed(2)}%)` : ''}</span>
                </div>
            )
        }

        const lines: IExtraLine[] = [{
            asset_address: props.asset.get().addressString(),
            column: props.column
        }, ...extraLines.slice(0, 4)]

        return (
            <SMALegend2 style={{position: 'absolute', zIndex:1000, top: 5, left: 5, display: 'flex', gap: '2px 20px', flexWrap:'wrap', width: '85%' }}>
                {lines.map((line, idx) => {
                    const asset = sets.assetsByAddresses([line.asset_address]).first() as AssetModel
                    return (
                        <div key={idx+1}>
                            {renderItem(asset, line.column, idx)}
                        </div>
                    )
                })}
            </SMALegend2>
        )
    }

    const renderLines = () => {
        const lines: IExtraLine[] = [{
            asset_address: props.asset.get().addressString(),
            column: props.column
        }, ...extraLines.slice(0, 4)]

        return lines.map((line, idx) => {
            const list = dataList[idx]
            if (!list){
                return null
            }

            const asset = sets.assetsByAddresses([line.asset_address]).first() as AssetModel
            const data = isPercent ? convertToPercentOfMax(dataList[idx], timeframe, !isMaxInTicks ? asset : undefined) : dataList[idx]

            return (
                <LineSeries
                    key={'bffwfw'+idx+1}
                    data={data}
                    reactive={true}
                    lastValueVisible={false}
                    priceLineVisible={false}
                    priceFormat={{
                        type: isPercent ? 'percent' : 'price',
                    }}
                    lineWidth={2}
                    color={getColor(asset, line.column)}
                />
            )
        })
    }

    return (
        <div style={{position: 'relative', width: '100%'}}>
            {renderLegend()}
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
            {extraLines.length <4 && <AddAsset 
                selectedSet={selectedSet}
                selectedAsset={selectedAsset}
                selectedColumn={selectedColumn}
                onChange={(set, asset, column) => {
                    setSelectedSet(set)
                    setSelectedAsset(asset)
                    if (
                        (column && _.find(extraLines, {asset_address: asset?.get().addressString(), column: column})) ||
                        (column && props.asset === asset && props.column === column)
                    ){
                        return 
                    } else {
                        setSelectedColumn(column || '')
                    }
                }}
                onSubmit={() => {
                    if (selectedAsset){
                        setExtraLines([...extraLines, {asset_address: selectedAsset.get().addressString(), column: selectedColumn || ''}])
                        setSelectedAsset(null)
                        setSelectedColumn(null)
                        props.onRefreshAssets && setTimeout(props.onRefreshAssets, 50)
                    }
                }}
                inline={true}
                style={{marginTop: 20}}
            />}
            {renderValueDisplayMenu()}
            {renderPercentTypeMaxMenu()}
        </div>
    )
})

const SMALegend2 = styled.div`
    font-size: 12px;
    color: white;
    text-align: left;
    pointer-events: none;
`

export default PointChart