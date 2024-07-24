import { IChartApi, ISeriesApi, MouseEventParams } from "lightweight-charts"
import {  useCallback, useEffect, useImperativeHandle, useRef } from "react"
import { CandlestickSeries, Chart, HistogramSeries, TimeScale } from "lightweight-charts-react-wrapper"

import options, {IChartOptions} from './chart-options'
import _ from "lodash"
import React from "react"
import { AssetModel } from "../../models/asset"
import { UnitChartRefType } from "./interfaces"
import styled from "styled-components"
import dataAffiner, { IDataLine } from "./data-affiner"
import { IUnitData } from "../../models/tick/unit"
import sets from "../../models/set"
import Loading from "../../components/loader"

const upColor = '#26a69a'
const downColor = '#ef5350'

interface IUnitChartProps { 
    unit: IDataLine
}

const UnitToolTip = React.forwardRef((props: {
    ticks: IUnitData[]
    asset: AssetModel
}, ref) => {
    const { ticks, asset } = props

    const [selectedTime, setSelectedTime] = React.useState<number | null>(null)

    useImperativeHandle(ref, () => ({
        updateSelectedTime: (time: number | null) => {
            setSelectedTime(time)
        }
    }), [])

    if (asset.get().ressource().get().dataType() != 1 || ticks.length === 0){
        return null
    }

    const time = selectedTime ? selectedTime * 1000 : ticks[ticks.length - 1].time  
    const idx = dataAffiner.binarySearchTick(ticks, time)
    if (idx < 0){
        return null
    }

    const tick = ticks[idx]
    
    const {
        open,
        high,
        low,
        close
    } = tick

    const color = open <= close ? upColor : downColor

    return (
        <SMALegend2 style={{top: 15}}>
            <span style={{marginLeft: 0, color}}>O <span>{open}</span></span>
            <span style={{marginLeft: 7, color}}>H <span>{high}</span></span>
            <span style={{marginLeft: 7, color}}>L <span>{low}</span></span>
            <span style={{marginLeft: 7, color}}>C <span>{close}</span></span>
        </SMALegend2>
    )
})


const UnitChart =  React.forwardRef<any, IChartOptions & IUnitChartProps>((props, ref)  => {
    const { unit } = props
    const candleSerieRef = useRef<ISeriesApi<'Candlestick'>>(null);
    const chartRef = useRef<IChartApi>(null);
    const toolTipRef = useRef<{
        updateSelectedTime: (time: number | null) => void
    } | null>(null)

    useImperativeHandle(ref, () => ({
        serie: candleSerieRef.current,
        chart: chartRef.current,
        updateSelectedTime: (time: number | null) => {
            toolTipRef.current?.updateSelectedTime(time)
        },
    } as UnitChartRefType), [candleSerieRef.current, chartRef.current])

    const asset = sets.assetsByAddresses([unit.asset_address]).first() as AssetModel

    const getTicks = ()=> {
        const ref = dataAffiner.getAssetRefByAddr(unit.asset_address)
        if (!ref){
            return []
        }
        return ref.data as IUnitData[]
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

    const renderTitle = (asset: AssetModel, size: number = 1) => {
        const setID = asset.get().address().get().setID()
        
        return (
            <div style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                <span style={{fontSize: size * 14, color: 'white'}}>{setID[0]}-{setID[1]}</span>
                <span style={{marginLeft:  size * 7, marginRight:  size *7, fontSize: size *10}}>•</span>
                <span style={{fontSize:  size *14, color: 'white', fontWeight: 500}}>{asset.get().address().get().printableID()}</span>
                {props.loading && <Loading style={{marginLeft: 7}} size={14} white />}
            </div>
        )
    }

    const renderLegend = (size: number = 1) => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 5, position:'absolute', top:0, left: 0,zIndex:5}}>
                {renderTitle(asset, size)}
                <UnitToolTip 
                    ticks={getTicks()}
                    asset={asset}
                    ref={toolTipRef}
                />
            </div>
        )
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
                <CandlestickSeries
                    ref={candleSerieRef}
                    data={getTicks().map((t) => {
                        return {
                            time: t.time / 1000,
                            open: t.open,
                            high: t.high,
                            low: t.low,
                            close: t.close
                        }
                    }) as any}
                    priceFormat={{
                        type: 'price',
                        precision: asset.get().decimals()-1,
                        minMove: 1 / Math.pow(10, asset.get().decimals()-1)
                    }}
                    upColor={upColor}
                    downColor={downColor}
                    wickDownColor={downColor}
                    wickUpColor={upColor}
                    lastValueVisible={false}
                    priceLineVisible={false}
                    reactive={true}
                />
            </Chart>
        </div>
    )
})

const SMALegend2 = styled.div`
    font-size: 12px;
    color: white;
    text-align: left;
    pointer-events: none;
`

export default UnitChart