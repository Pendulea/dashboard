import { IChartApi, ISeriesApi, MouseEventParams } from "lightweight-charts"
import {  useCallback, useImperativeHandle, useRef } from "react"
import { Chart, HistogramSeries, TimeScale } from "lightweight-charts-react-wrapper"

import options, {IChartOptions} from './chart-options'
import _ from "lodash"
import React from "react"
import { AssetModel } from "../../models/asset"
import { UnitChartRefType } from "./interfaces"
import styled from "styled-components"
import { QuantityCollection, QuantityModel } from "../../models/tick/quantity"
import { Format } from "../../utils"
import Checkbox from "../../components/checkbox"

const upColor = '#26a69a'
const downColor = '#ef5350'
const localGreen = 'rgba(38, 166, 154, 0.6)'
const localRed = 'rgba(239, 83, 80, 0.6)'

export type QuantityCategory = 'regular' | 'average' | 'median'

interface IUnitChartProps { 
    quantity: AssetModel
}

const QuantityChart =  React.forwardRef<any, IChartOptions & IUnitChartProps>((props, ref)  => {
    const { quantity } = props
    const histoSerieRef = useRef<ISeriesApi<'Histogram'>>(null);
    const chartRef = useRef<IChartApi>(null);
    const [category, setCategory] = React.useState<QuantityCategory>('regular')
    const [isNet, setIsNet] = React.useState<boolean>(false)

    useImperativeHandle(ref, () => ({
        serie: histoSerieRef.current,
        chart: chartRef.current,
        assets: (): string[] => [quantity.get().addressString()]
    } as UnitChartRefType), [histoSerieRef.current, chartRef.current])

    const selectTickValueByCategory = (tick: QuantityModel, plus: boolean): number => {
        
       if (isNet){
            if (category === 'regular'){
                const net = tick.get().plus() - tick.get().minus()
                if (plus && net > 0){
                    return net
                } else if (plus && net < 0){
                    return 0
                }
                if (!plus && net < 0){
                    return net
                } else if (!plus && net > 0){
                    return 0
                }
            }
            if (category === 'average'){
                const net = tick.get().plusAvg() - tick.get().minusAvg()
                if (plus && net > 0){
                    return net
                } else if (plus && net < 0){
                    return 0
                }
                if (!plus && net < 0){
                    return net
                } else if (!plus && net > 0){
                    return 0
                }
            }
            if (category === 'median'){
                const net = tick.get().plusMedian() - tick.get().minusMedian()
                if (plus && net > 0){
                    return net
                } else if (plus && net < 0){
                    return 0
                }
                if (!plus && net < 0){
                    return net
                } else if (!plus && net > 0){
                    return 0
                }
            }
       } else {
            switch (category) {
                case 'regular':
                    return plus ? tick.get().plus() : -tick.get().minus()
                case 'average':
                    return plus ?tick.get().plusAvg(): -tick.get().minusAvg()
                case 'median':
                    return plus ? tick.get().plusMedian() : -tick.get().minusMedian()
            }
       }
       return 0
    }


    const ticks = quantity.get().ticks() as QuantityCollection || new QuantityCollection([])

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
                <span style={{fontSize:  size *14, color: 'white', fontWeight: 500}}>{quantity.get().address().get().printableID()}</span>
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

    const renderFilterMenu = () =>{
        return (
            <div style={{display:'flex', flexDirection: 'column', position:'absolute', top: 0, right: 90, zIndex: 5}}>
                <span style={{fontSize:10, fontWeight:500, marginBottom:2, textAlign: 'center'}}>FILTER:</span>
                <div style={{display:'flex', flexDirection: 'row'}}>
                    <Checkbox  
                        label="Regular"
                        checked={category === 'regular'}
                        onChange={() => setCategory('regular')}
                    />
                    <Checkbox  
                        label="Average"
                        checked={category === 'average'}
                        onChange={() => setCategory('average')}
                        style={{marginLeft: 20}}
                    />
                    <Checkbox  
                        label="Median"
                        checked={category === 'median'}
                        onChange={() => setCategory('median')}
                        style={{marginLeft: 20}}
                    />
                </div>
            </div>
        )
    }

    const renderVolumeTypeMenu = () =>{
        return (
            <div style={{display:'flex', flexDirection: 'column', position:'absolute', top: 0, right: 400, zIndex: 5}}>
                <span style={{fontSize:10, fontWeight:500, marginBottom:2, textAlign: 'center'}}>TYPE:</span>
                <div style={{display:'flex', flexDirection: 'row'}}>
                    <Checkbox  
                        label="All"
                        checked={!isNet}
                        onChange={() => setIsNet(false)}
                    />
                    <Checkbox  
                        label="Net"
                        checked={isNet}
                        onChange={() => setIsNet(true)}
                        style={{marginLeft: 20}}
                    />
                </div>
            </div>
        )
    }


    const renderAssetDataTooltip = (asset: AssetModel) => {
        if (asset.get().ressource().get().dataType()!= 2){
            return null
        }
        const ticks = asset.get().ticks() as QuantityCollection || new QuantityCollection([])

        const selectedTime = props.selectedTime ? props.selectedTime * 1000 : ticks.latestTime()
        const tick = ticks.get(selectedTime)
        if (!tick){
            return null
        }
        const radix = asset.get().decimals()

        const volumeUp = selectTickValueByCategory(tick, true)
        const volumeDown = selectTickValueByCategory(tick, false)
        const netVolume = volumeUp - -volumeDown

        return (
            <SMALegend2 style={{top: 15, fontSize: 12}}>
                 {!isNet && <span>Total <span style={{color: 'white', fontWeight: 600}}>{Format.largeNumberToShortString(volumeUp + -volumeDown, radix)}</span> : </span>}
                 {volumeUp != 0 && <span style={{fontWeight: 600}}><span style={{color: upColor}}>+{Format.largeNumberToShortString(volumeUp, radix)}</span></span>}
                 {volumeDown != 0 && <span style={{fontWeight: 600}}><span style={{color: downColor}}> {Format.largeNumberToShortString(volumeDown, radix)}</span></span>}
                {!isNet && <span> = <span style={{color: netVolume > 0 ? upColor : downColor, fontWeight: 700}}>{netVolume > 0? "+": ''}{Format.largeNumberToShortString(netVolume, radix)}</span></span>}
            </SMALegend2>
        )
    }

    return (
        <div style={{position: 'relative', width: '100%'}}>
            {renderLegend(quantity)}
            <Chart 
                onCrosshairMove={handleCrosshairMove} 
                ref={chartRef}
                {...options}
            >
                <TimeScale
                    onVisibleLogicalRangeChange={handleVisibleLogicalRangeChange}
                    visible={props.displayTimeScale}
                />
                <HistogramSeries
                    ref={histoSerieRef}
                    data={ticks.state.map((t: QuantityModel) => {
                        const o = {value: selectTickValueByCategory(t, true), time: t.get().time() / 1000, color: localGreen}
                        return o
                    }) as any}
                    priceFormat={{
                        type: 'volume'
                    }}
                    lastValueVisible={false}
                    priceLineVisible={false}
                    reactive={true}
                />
                <HistogramSeries
                    data={ticks.state.map((t: QuantityModel) => {
                        const o = {value: selectTickValueByCategory(t, false), time: t.get().time() / 1000, color: localRed}
                        return o
                    }) as any}
                    priceFormat={{type: 'volume'}}
                    lastValueVisible={false}
                    priceLineVisible={false}
                    reactive={true}
                />
                {renderFilterMenu()}
                {renderVolumeTypeMenu()}
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

export default QuantityChart