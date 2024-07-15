import { IChartApi, ISeriesApi, MouseEventParams } from "lightweight-charts"
import {  useCallback, useImperativeHandle, useRef } from "react"
import { CandlestickSeries, Chart, HistogramSeries, TimeScale } from "lightweight-charts-react-wrapper"

import options, {IChartOptions} from './chart-options'
import _ from "lodash"
import React from "react"
import { UnitCollection } from "../../models/tick/unit"
import { AssetModel } from "../../models/asset"
import { UnitChartRefType } from "./interfaces"
import styled from "styled-components"

const upColor = '#26a69a'
const downColor = '#ef5350'

interface IUnitChartProps { 
    unit: AssetModel
}

const UnitChart =  React.forwardRef<any, IChartOptions & IUnitChartProps>((props, ref)  => {
    const { unit } = props
    const candleSerieRef = useRef<ISeriesApi<'Candlestick'>>(null);
    const chartRef = useRef<IChartApi>(null);

    useImperativeHandle(ref, () => ({
        serie: candleSerieRef.current,
        chart: chartRef.current,
        assets: (): string[] => [unit.get().addressString()]
    } as UnitChartRefType), [candleSerieRef.current, chartRef.current])


    const ticks = unit.get().ticks() as UnitCollection || new UnitCollection([])

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
                <span style={{fontSize:  size *14, color: 'white', fontWeight: 500}}>{unit.get().address().get().printableID()}</span>
            </div>
        )
    }

    const renderLegend = (asset:AssetModel, size:number=1 ) => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 5, position:'absolute', top:0, left: 0,zIndex:5}}>
                {renderTitle(asset, size)}
                {renderAssetDataTooltip(asset)}
            </div>
        )
    }

    const renderAssetDataTooltip = (asset: AssetModel) => {
        if (asset.get().ressource().get().dataType()!= 1){
            return null
        }
        const ticks = asset.get().ticks() as UnitCollection || new UnitCollection([])

        const selectedTime = props.selectedTime ? props.selectedTime * 1000 : ticks.latestTime()
        const tick = ticks.get(selectedTime)
        if (!tick){
            return null
        }

        const open = tick.get().open()
        const high = tick.get().high()
        const low = tick.get().low()
        const close = tick.get().close()

        const color = open <= close ? upColor : downColor

        return (
            <SMALegend2 style={{top: 15}}>
                <span style={{marginLeft: 0, color}}>O <span>{open}</span></span>
                <span style={{marginLeft: 7, color}}>H <span>{high}</span></span>
                <span style={{marginLeft: 7, color}}>L <span>{low}</span></span>
                <span style={{marginLeft: 7, color}}>C <span>{close}</span></span>
            </SMALegend2>
        )
    }

    return (
        <div style={{position: 'relative', width: '100%'}}>
            {renderLegend(unit)}
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
                    data={ticks.state.map((t) => {
                        return {
                            time: t.get().time() / 1000,
                            open: t.get().open(),
                            high: t.get().high(),
                            low: t.get().low(),
                            close: t.get().close()
                        }
                    }) as any}
                    priceFormat={{
                        type: 'price',
                        precision: unit.get().decimals()-1,
                        minMove: 1 / Math.pow(10, unit.get().decimals()-1)
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