import { IChartApi, ISeriesApi, MouseEventParams } from "lightweight-charts"
import {  useCallback, useImperativeHandle, useRef } from "react"
import { Format } from "../../utils"
import { CandlestickSeries, Chart, HistogramSeries, TimeScale } from "lightweight-charts-react-wrapper"

import options, {IChartOptions} from './chart-options'
import _ from "lodash"
import React from "react"
import { QuantityCollection, QuantityModel } from "../../models/tick/quantity"
import { UnitCollection } from "../../models/tick/unit"
import sets, { SetModel } from "../../models/set"
import { AssetModel } from "../../models/asset"
import SelectSet from "../../components/select-set"
import SelectAsset from "../../components/select-asset"
import { UnitChartRefType } from "./interfaces"
import styled from "styled-components"

const upColor = '#26a69a'
const downColor = '#ef5350'
const localGreen = 'rgba(38, 166, 154, 0.6)'
const localRed = 'rgba(239, 83, 80, 0.6)'

export type QuantityCategory = 'total' | 'plus' | 'minus' | 'net'

interface IUnitChartProps { 
    quantityCategory: QuantityCategory
    unit: AssetModel
    timeframe: number
}

const UnitChart =  React.forwardRef<any, IChartOptions & IUnitChartProps>((props, ref)  => {
    const { unit, timeframe } = props
    const candleSerieRef = useRef<ISeriesApi<'Candlestick'>>(null);
    const chartRef = useRef<IChartApi>(null);

    const [selectedSet, setSelectedSet] = React.useState(sets.first() as SetModel) 
    const [selectedVolume, setSelectedVolume] = React.useState<AssetModel | undefined>(undefined)

    useImperativeHandle(ref, () => ({
        serie: candleSerieRef.current,
        chart: chartRef.current,
        assets: (): AssetModel[] => {
            const ret = [unit]
            if (selectedVolume){
                ret.push(selectedVolume)
            }
            return ret
        }
    } as UnitChartRefType), [candleSerieRef.current, chartRef.current, selectedVolume])


    const ticks = unit.get().ticks() as UnitCollection || new UnitCollection([])
    const quantityTicks = selectedVolume ? selectedVolume.get().ticks() as QuantityCollection : null

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

    
    const renderTitleUnit = () => {
        const setID = unit.get().address().get().setID()

        return (
            <div style={{position:'absolute',top: 0, left: 7, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0)'}}>
                <span style={{fontSize: 14, color: 'white'}}>{setID[0]}-{setID[1]}</span>
                <span style={{marginLeft: 7, marginRight: 7, fontSize:10}}>•</span>
                <span style={{fontSize: 14, color: 'white', fontWeight: 500}}>{unit.get().address().get().printableID()}</span>
            </div>
        )
    }

    const renderTitleVolume = () => {
        if (!selectedVolume){
            return null
        }

        const setID = selectedVolume.get().address().get().setID()

        return (
            <div style={{position:'absolute',top: 42, left: 7, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0)'}}>
                <span style={{fontSize: 12, color: 'white'}}>{setID[0]}-{setID[1]}</span>
                <span style={{marginLeft: 7, marginRight: 7, fontSize:10}}>•</span>
                <span style={{fontSize: 12, color: 'white', fontWeight: 500}}>{selectedVolume.get().address().get().printableID()}</span>
            </div>
        )
    }


    const renderAddVolumeInput = () => {
        if (selectedVolume){
            return null
        }
        return (
            <div style={{position:'absolute', left: 0, zIndex: 1000, top: 40, display: 'flex', flexDirection: 'column', padding:7}}>
                <span style={{fontSize: 12, fontWeight: 500, marginBottom: 2}}>ADD VOLUME</span>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: window.innerWidth * 0.055}}>
                        <SelectSet
                            size={0.8}
                            sets={sets} 
                            onChangeSet={(set) => setSelectedSet(set)}
                            selectedSet={selectedSet || undefined} 
                        />
                    </div>
                    <div style={{width: window.innerWidth * 0.10, marginLeft: 10}}>
                        {selectedSet && !selectedVolume && <SelectAsset 
                             size={0.8}
                            assets={selectedSet.get().assets().filterByDataType(2)}
                            onChangeAsset={(asset) => {
                                setSelectedVolume(asset)
                                setTimeout(() => {
                                    props.onRefreshAssets && props.onRefreshAssets()
                                }, 10)
                            }} 
                            selectedAsset={selectedVolume || undefined}
                        />}
                    </div>
                </div>
            </div>
        )
    }

    const renderVolumeToolTip = () => {
        if (!props.selectedTime || !selectedVolume){
            return null
        }
        
        const tick = selectedVolume.get().ticks()?.get(props.selectedTime * 1000) as QuantityModel
        if (!tick){
            return null
        }

        const volumeUp = tick.get().plus() 
        const volumeDown = tick.get().minus()
        const netVolume = volumeUp - volumeDown

        return (
            <SMALegend style={{top: 57}}>
                {volumeUp > 0 && <span>Vol: <span style={{color: upColor}}>+{Format.largeNumberToShortString(volumeUp)}</span></span>}
                {volumeDown > 0 &&<span> <span style={{color: downColor}}>-{Format.largeNumberToShortString(volumeDown)}</span></span>}
                {netVolume != 0 && <span style={{marginLeft:5}}>(<span style={{color: netVolume > 0 ? upColor: downColor}}>{Format.largeNumberToShortString(netVolume)}</span>)</span>}
            </SMALegend>
        )
    }

    const renderUnitTooltip = () => {
        if (!props.selectedTime){
            return null
        }
        const tick = ticks.get(props.selectedTime * 1000)
        if (!tick){
            return null
        }

        const open = tick.get().open()
        const high = tick.get().high()
        const low = tick.get().low()
        const close = tick.get().close()

        const color = open <= close ? upColor : downColor

        return (
            <SMALegend style={{top: 15}}>
                <span style={{marginLeft: 0, color}}>O <span>{open}</span></span>
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

            {renderTitleUnit()}
            {renderUnitTooltip()}
            {renderTitleVolume()}
            {renderVolumeToolTip()}
            {renderAddVolumeInput()}
        </div>
    )
})

const SMALegend = styled.div`
    position: absolute;
    padding: 8px;
    font-size: 12px;
    color: white;
    text-align: left;
    z-index: 1000;
    pointer-events: none;
`

export default UnitChart