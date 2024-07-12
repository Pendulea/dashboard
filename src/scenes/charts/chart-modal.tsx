import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal';
import DropdownAlert from '../../components/dropdown-alert';
import UnitChart, { QuantityCategory } from './unit-chart';
import { UnitCollection } from '../../models/tick/unit';
import { IChartApi, ISeriesApi, LogicalRange, MouseEventParams, Time } from 'lightweight-charts';
import { AssetCollection, AssetModel } from '../../models/asset';
import SelectSet from '../../components/select-set';
import SelectAsset from '../../components/select-asset';
import sets, { SetModel } from '../../models/set';
import Button from '../../components/button';
import { TickCollection } from '../../models/tick';
import { showAlertMessage } from '../../constants/msg';
import { UnitChartRefType } from './interfaces';

interface ChartModalProps {
    onClose: () => void;
    show: boolean
    dropdownRef: React.RefObject<DropdownAlert>
}

const TIMEFRAME = 86400 * 1000


type ChartTypeCategory = 'unit' 

const buildChartType = (category: ChartTypeCategory, idx: number): string => {
  return `${category}-${idx}`  
}

const ChartModal: React.FC<ChartModalProps> = ({ onClose, dropdownRef, show }) => {
    if (!show) return null

    const [selectedTime, setSelectedTime] = useState<number | null>(null)
    const [quantityCategory, setQuantityCategory] = useState<QuantityCategory>('total')
    const [chartList, setChartList] = useState<AssetModel[][]>([])

    const [selectedSet, setSelectedSet] = useState<SetModel | null>(null)
    const [selectedAsset, setSelectedAsset] = useState<AssetModel | null>(null)
    const chartRefs = useRef<{[key in string]: UnitChartRefType}>({})

    const getChartRefs = (): {[key in string]: UnitChartRefType} => {
        return chartRefs.current
    }

    const getChartRef = (category: ChartTypeCategory, idx: number) => {
        return getChartRefs()[buildChartType(category, idx)] as UnitChartRefType
    }
  
    const getConcernedAssets = ():AssetModel[] => {
      const ret: AssetModel[] = []
      for (const key in getChartRefs()){ 
        const ref = getChartRefs()[key]
        if (!ref)
            continue
          ret.push(...ref.assets())
      }
      return ret
    }

    const onRefreshConcernedAssets = () => {
      const assets = getConcernedAssets()
      const maxLimit = new AssetCollection(assets, undefined).findMaxTicksCount()
      const promises = assets.map((asset) => {
          return asset.fetchTicks(TIMEFRAME, maxLimit)
      })
      const ret = Promise.all(promises)
      ret.then((res) => {
          for (const err of res){
              if (typeof err === 'string'){
                  showAlertMessage(dropdownRef).error(err)
                  return
              }
          }
      })
    }

    const addChart = async () => {
      if (selectedAsset){
        setChartList([...chartList, [selectedAsset]])
        setSelectedAsset(null)
        setSelectedSet(null)
        const err = await selectedAsset.fetchTicks(TIMEFRAME)
        if (typeof err === 'string'){
          showAlertMessage(dropdownRef).error(err)
        }
        onRefreshConcernedAssets()
      }
    } 


    const renderCloseBtn = () => {
        return (
            <div onClick={onClose} style={{cursor: 'pointer', display: 'flex', flexDirection:'row', width: '100%'}}>
                <img style={{width: 16, height: 16, padding: 10}} src={'/images/cross-white.png'}/>
            </div>
        )
    }

    const onChangeLogicRange = (range: LogicalRange, cat: ChartTypeCategory, idx: number) => {
      const chartType = buildChartType(cat, idx)
      for (const key in getChartRefs()){
          if (key !== chartType){
              const ref = getChartRefs()[key]
              if (!ref)
                  continue
              ref.chart.timeScale().setVisibleLogicalRange(range)
          }
      }
      if (range.from < 10) {
          fetchMore()
      }
  }

  const onCrossHairMove = (e: MouseEventParams<Time>, cat: ChartTypeCategory, idx: number) => {
    const chartType = buildChartType(cat, idx)

      function getCrosshairDataPoint(series: any, param: any) {
          if (!param.time) {
              return null;
          }
          const dataPoint = param.seriesData.get(series);
          return dataPoint || null;
      }

      const ref = getChartRef(cat, idx)
      if (!ref)
          return

      const dp = getCrosshairDataPoint(ref.serie, e)
      if (dp){
          for (const key in getChartRefs()){ 
            const ref = getChartRefs()[key]
            if (!ref)
                continue
              const chart = ref.chart
              const serie = ref.serie
              if (chart && serie){
                  chart.setCrosshairPosition(dp.value, dp.time, serie)
              }
          }
      }
      
      setSelectedTime((currentTime: any) => {
          if (currentTime !== e.time){
              return e.time
          }
          return currentTime
      })
  }


  const renderSelectAsset = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginLeft: 20, marginTop: 40}}>
        <div style={{width: '10%'}}>
          <SelectSet sets={sets} onChangeSet={(set) => setSelectedSet(set)} selectedSet={selectedSet || undefined} />
        </div>
        <div style={{width: '25%', marginLeft: 20}}>
          {selectedSet && <SelectAsset 
            assets={selectedSet.get().assets().filterByDataType(1)}
            onChangeAsset={(asset) => setSelectedAsset(asset)} 
            selectedAsset={selectedAsset || undefined} />}
        </div>
        {selectedAsset && <Button 
          color={'blue'}
          title={'Add chart'}
          style={{width: 100, height: 30, marginTop: 19, marginLeft:20}}
          onClick={addChart}
        />}
      </div>
    )
  }

    const fetchMore = async () => { 
      const ret: Promise<TickCollection |string>[] = []
      for (const asset of getConcernedAssets()){
            ret.push(asset.fetchTicks(TIMEFRAME))
      }

      const list = await Promise.all(ret)
      for (const err of list){
          if (typeof err === 'string'){
              showAlertMessage(dropdownRef).error(err)
              return
          }
      }
  }

    const renderPriceChart = (asset: AssetModel, idx: number) => {
      const CHART_KEY = 'unit'

      return (
        <div style={{width: '90%'}}>
            <UnitChart 
                unit={asset}
                timeframe={TIMEFRAME}
                ref={(ref) => chartRefs.current[buildChartType(CHART_KEY, idx)] = ref}
                onChangeLogicRange={(range) => onChangeLogicRange(range, CHART_KEY, idx)}
                onChangeCrossHair={(e) => onCrossHairMove(e, CHART_KEY, idx )}
                selectedTime={selectedTime}
                displayTimeScale={true}
                quantityCategory={quantityCategory}
                onRefreshAssets={onRefreshConcernedAssets}
            />
        </div>
      )
    }

  return (
    <Modal onClose={onClose}>
      <ModalWrapper>
      {renderCloseBtn()}
      {chartList.map((chart, idx) => {
          return (
            <div key={idx} style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20}}>
              {renderPriceChart(chart[0], idx)}
            </div>
          )
        })}
        {renderSelectAsset()}
      </ModalWrapper>
    </Modal>
  );
};

export default ChartModal;

const ModalWrapper = styled.div`
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  background-color: #111111;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;