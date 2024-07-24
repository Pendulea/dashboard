import { IChartApi, ISeriesApi, MouseEventParams } from "lightweight-charts"
import {  useCallback, useEffect, useImperativeHandle, useRef } from "react"
import { Chart, HistogramSeries, TimeScale } from "lightweight-charts-react-wrapper"

import options, {IChartOptions} from './chart-options'
import _ from "lodash"
import React from "react"
import { AssetModel } from "../../models/asset"
import { UnitChartRefType } from "./interfaces"
import styled from "styled-components"
import { Format } from "../../utils"
import Checkbox from "../../components/checkbox"
import dataAffiner, { IDataLine } from "./data-affiner"
import { IQuantityData } from "../../models/tick/quantity"
import sets from "../../models/set"
import Loading from "../../components/loader"

const upColor = '#26a69a'
const downColor = '#ef5350'
const localGreen = 'rgba(38, 166, 154, 0.6)'
const localRed = 'rgba(239, 83, 80, 0.6)'

export type QuantityCategory = 'regular' | 'average' | 'median'

interface IUnitChartProps { 
    chart: IDataLine
}

const selectTickValueByCategory = (tick: IQuantityData, plus: boolean, category: QuantityCategory, isNet: boolean): number => {
    if (isNet){
         if (category === 'regular'){
             const net = tick.plus - tick.minus
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
             const net = tick.plus_average - tick.minus_average
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
             const net = tick.plus_median - tick.minus_median
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
                 return plus ? tick.plus : -tick.minus
             case 'average':
                 return plus ?tick.plus_average : -tick.minus_average
             case 'median':
                 return plus ? tick.plus_median : -tick.minus_median
         }
    }
    return 0
 }


const QuantityToolTip = React.forwardRef((props: {
    asset: AssetModel
    category: QuantityCategory
    ticks: IQuantityData[]
    isNet: boolean
}, ref) => {
    const { asset, ticks } = props

    const [selectedTime, setSelectedTime] = React.useState<number | null>(null)

    useImperativeHandle(ref, () => ({
        updateSelectedTime: (time: number | null) => {
            setSelectedTime(time)
        }
    }), [])

    if (asset.get().ressource().get().dataType()!= 2 || ticks.length === 0 ){
        return null
    }

    const time = selectedTime ? selectedTime * 1000 : ticks[ticks.length - 1].time as number
    const tickIdx = dataAffiner.binarySearchTick(ticks, time)
    if (tickIdx === -1){
        return null
    }
    const radix = asset.get().decimals()
    const tick = ticks[tickIdx]

    const volumeUp = selectTickValueByCategory(tick, true, props.category, props.isNet)
    const volumeDown = selectTickValueByCategory(tick, false, props.category, props.isNet)
    const netVolume = volumeUp - -volumeDown

    return (
        <SMALegend2 style={{top: 15, fontSize: 12}}>
             {!props.isNet && <span>Total <span style={{color: 'white', fontWeight: 600}}>{Format.largeNumberToShortString(volumeUp + -volumeDown, radix)}</span> : </span>}
             {volumeUp != 0 && <span style={{fontWeight: 600}}><span style={{color: upColor}}>+{Format.largeNumberToShortString(volumeUp, radix)}</span></span>}
             {volumeDown != 0 && <span style={{fontWeight: 600}}><span style={{color: downColor}}> {Format.largeNumberToShortString(volumeDown, radix)}</span></span>}
            {!props.isNet && <span> = <span style={{color: netVolume > 0 ? upColor : downColor, fontWeight: 700}}>{netVolume > 0? "+": ''}{Format.largeNumberToShortString(netVolume, radix)}</span></span>}
        </SMALegend2>
    )
})


const QuantityChart =  React.forwardRef<any, IChartOptions & IUnitChartProps>((props, ref)  => {
    const { chart } = props

    const histoSerieRef = useRef<ISeriesApi<'Histogram'>>(null);
    const chartRef = useRef<IChartApi>(null);
    const toolTipRef = useRef<{
        updateSelectedTime: (time: number | null) => void
    } | null>(null)

    const [category, setCategory] = React.useState<QuantityCategory>('regular')
    const [isNet, setIsNet] = React.useState<boolean>(false)

    useImperativeHandle(ref, () => ({
        serie: histoSerieRef.current,
        chart: chartRef.current,
        updateSelectedTime: (time: number | null) => {
            toolTipRef.current?.updateSelectedTime(time)
        },
    } as UnitChartRefType), [histoSerieRef.current, chartRef.current])

    const getTicks = (asset: AssetModel)=> {
        const ref = dataAffiner.getAssetRefByAddr(asset.get().addressString())
        if (!ref){
            return []
        }
        return ref.data as IQuantityData[]
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

    const renderLegend = (asset:AssetModel, size:number=1 ) => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 5, position:'absolute', top:0, left: 0,zIndex:5}}>
                {renderTitle(asset, size)}
                <QuantityToolTip 
                    ref={toolTipRef}
                    ticks={dataAffiner.getAssetRefByAddr(asset.get().addressString())?.data as IQuantityData[]}
                    asset={asset}
                    category={category}
                    isNet={isNet}
                />
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
  
    const asset = sets.assetsByAddresses([chart.asset_address]).first() as AssetModel

    return (
        <div style={{position: 'relative', width: '100%'}}>
            {renderLegend(asset)}
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
                    data={getTicks(asset).map((t: IQuantityData) => {
                        const o = {value: selectTickValueByCategory(t, true, category, isNet), time: t.time / 1000, color: localGreen}
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
                    data={getTicks(asset).map((t: IQuantityData) => {
                        const o = {value: selectTickValueByCategory(t, false, category, isNet), time: t.time / 1000, color: localRed}
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