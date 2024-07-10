import { IChartApi, ISeriesApi, MouseEventParams } from "lightweight-charts"
import {  useCallback, useImperativeHandle, useRef } from "react"
import SMALegend from "./legends"
import { Format } from "../../utils"
import { CandlestickSeries, Chart, HistogramSeries, TimeScale } from "lightweight-charts-react-wrapper"

import options, {IChartOptions} from './chart-options'
import _ from "lodash"
import React from "react"
import { QuantityCollection, QuantityModel } from "../../models/tick/quantity"
import { UnitCollection } from "../../models/tick/unit"

const upColor = '#26a69a'
const downColor = '#ef5350'
const localGreen = 'rgba(38, 166, 154, 0.6)'
const localRed = 'rgba(239, 83, 80, 0.6)'

export type QuantityCategory = 'total' | 'plus' | 'minus' | 'net'

interface IUnitChartProps { 
    quantityCategory: QuantityCategory
    quantityTicks?: QuantityCollection
    unitTicks: UnitCollection
}

const UnitChart =  React.forwardRef<any, IChartOptions & IUnitChartProps>((props, ref)  => {
    const { unitTicks, quantityTicks } = props
    const candleSerieRef = useRef<ISeriesApi<'Candlestick'>>(null);
    const chartRef = useRef<IChartApi>(null);

    useImperativeHandle(ref, () => ({
        serie: candleSerieRef.current,
        chart: chartRef.current,
    }), [candleSerieRef.current, chartRef.current])


    const handleVisibleLogicalRangeChange = useCallback(() => {
        if (!chartRef || !chartRef.current) {
            return;
        }

        const timeScale = chartRef.current.timeScale()
        const logicalRange = timeScale.getVisibleLogicalRange();
 
        if (logicalRange !== null) {
            props.onChangeLogicRange && props.onChangeLogicRange(logicalRange)
            if (logicalRange && logicalRange.from < 10) {
                props.onFetchMore && props.onFetchMore()
            }
        }
    }, []);

    const debouncedCrosshairMove = _.debounce((e: MouseEventParams) => {
        props.onChangeCrossHair && props.onChangeCrossHair(e)
    }, 5)

    const handleCrosshairMove = useCallback((e: MouseEventParams) => {
        debouncedCrosshairMove(e)
    }, []);

    
    const renderTooltip = () => {
        if (!props.selectedTime){
            return null
        }

        const tick = props.unitTicks.get(props.selectedTime * 1000)
        if (!tick){
            return null
        }

        const volumeUp = -1// tick.get().volume_bought()
        const volumeDown = -1 //tick.get().volume_sold()
        const netVolume = -1 //volumeUp - volumeDown
        const open = tick.get().open()
        const high = tick.get().high()
        const low = tick.get().low()
        const close = tick.get().close()

        const color = open <= close ? upColor : downColor

        return (
            <SMALegend>
                <span>Vol: <span style={{color: upColor}}>+{Format.largeNumberToShortString(volumeUp)}</span></span>
                <span> <span style={{color: downColor}}>-{Format.largeNumberToShortString(volumeDown)}</span></span>
                <span> <span style={{color: netVolume > 0 ? upColor: downColor}}>{Format.largeNumberToShortString(netVolume)}</span></span>
                <span style={{marginLeft: 15, color}}>O <span>{open}</span></span>
                <span style={{marginLeft: 7, color}}>H <span>{high}</span></span>
                <span style={{marginLeft: 7, color}}>L <span>{low}</span></span>
                <span style={{marginLeft: 7, color}}>C <span>{close}</span></span>
            </SMALegend>
        )
    }

    return (
        <div style={{position: 'relative', width: '100%'}}>
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
                    data={unitTicks.state.map((t) => {
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
                        precision: 4,
                        minMove: 0.0001, // Set minimum price change to 0.0001
                    }}
                
                    upColor={upColor}
                    downColor={downColor}
                    wickDownColor={downColor}
                    wickUpColor={upColor}
                    lastValueVisible={false}
                    priceLineVisible={false}
                    reactive={true}
                />
                {quantityTicks && <HistogramSeries
                    data={quantityTicks.state.map((t: QuantityModel) => {
                        const o = {value: 0, time: t.get().time() / 1000, color: t.get().plus() >  t.get().minus() ? localGreen : localRed}

                        switch (props.quantityCategory){
                            case 'total':
                                o.value = t.get().plus() + t.get().minus()
                                break
                            case 'plus':
                                o.value = t.get().plus()
                                break
                            case 'minus':
                                o.value = t.get().minus()
                                break
                            case 'net':
                                o.value = Math.abs(t.get().plus() - t.get().minus())
                                break

                        }
                        return o
                    }) as any}
                    priceScaleId="overlay"
                    priceFormat={{type: 'volume'}}
                    lastValueVisible={false}
                    reactive={true}
                />}
            </Chart>
            {renderTooltip()}
        </div>
    )
})

export default UnitChart