import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal';
import DropdownAlert from '../../components/dropdown-alert';
import UnitChart, { QuantityCategory } from './unit-chart';
import { UnitCollection } from '../../models/tick/unit';
import { IChartApi, ISeriesApi, LogicalRange, MouseEventParams, Time } from 'lightweight-charts';
import { AssetModel } from '../../models/asset';
import SelectSet from '../../components/select-set';
import SelectAsset from '../../components/select-asset';
import sets, { SetModel } from '../../models/set';
import Button from '../../components/button';
import { TickCollection } from '../../models/tick';
import { showAlertMessage } from '../../constants/msg';

interface ChartModalProps {
    onClose: () => void;
    show: boolean
    dropdownRef: React.RefObject<DropdownAlert>
}

const TIMEFRAME = 86400 * 1000


type ChartType = 'unit'

const ChartModal: React.FC<ChartModalProps> = ({ onClose, dropdownRef, show }) => {
    if (!show) return null

    const [selectedTime, setSelectedTime] = useState<number | null>(null)
    const [quantityCategory, setQuantityCategory] = useState<QuantityCategory>('total')
    const [chartList, setChartList] = useState<AssetModel[][]>([])

    const [selectedSet, setSelectedSet] = useState<SetModel | null>(null)
    const [selectedAsset, setSelectedAsset] = useState<AssetModel | null>(null)

    
    const childRefs: {[key in ChartType]: React.RefObject<{chart: IChartApi, serie: ISeriesApi<any>}>} = {
      'unit': useRef<{chart: IChartApi, serie: ISeriesApi<any>}>(null),
      // 'rsi': useRef<{chart: IChartApi, serie: ISeriesApi<any>}>(null),
      // 'volatility': useRef<{chart: IChartApi, serie: ISeriesApi<any>}>(null),
    }
    
    const renderCloseBtn = () => {
        return (
            <div onClick={onClose} style={{cursor: 'pointer', position: 'fixed', top: 10, left: 10}}>
                <img style={{width: 16, height: 16}} src={'/images/cross-white.png'}/>
            </div>
        )
    }

    const onChangeLogicRange = (range: LogicalRange, chartType: ChartType) => {
      for (const key in childRefs){
          if (key !== chartType){
              childRefs[key as ChartType].current?.chart.timeScale().setVisibleLogicalRange(range)
          }
      }
  }

  const onCrossHairMove = (e: MouseEventParams<Time>, chartType: ChartType) => {

      function getCrosshairDataPoint(series: any, param: any) {
          if (!param.time) {
              return null;
          }
          const dataPoint = param.seriesData.get(series);
          return dataPoint || null;
      }
      
      const dp = getCrosshairDataPoint(childRefs[chartType].current?.serie, e)
      if (dp){
          for (const key in childRefs){ 
              const chart = childRefs[key as ChartType].current?.chart
              const serie = childRefs[key as ChartType].current?.serie
              if (key !== chartType && chart && serie){
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
            set={selectedSet || undefined} 
            dataType={1}
            onChangeAsset={(asset) => setSelectedAsset(asset)} 
            selectedAsset={selectedAsset || undefined} />}
        </div >
        {selectedAsset && <Button 
          color={'green'}
          title={'Add chart'}
          style={{width: 100, height: 30, marginTop: 19, marginLeft:20}}
          onClick={ async () => {
            setChartList([...chartList, [selectedAsset]])
            setSelectedAsset(null)
            const err = await selectedAsset.fetchTicks(TIMEFRAME)
            if (typeof err === 'string'){
              showAlertMessage(dropdownRef).error(err)
            }
          }}
        />}
      </div>
    )
  }

    const fetchMore = async () => { 
      const ret: Promise<string | TickCollection | null>[] = []
      for (const chart of chartList){
          for (const asset of chart){
              ret.push(asset.fetchTicks(TIMEFRAME))
          }
      }

      const list = await Promise.all(ret)
      for (const err of list){
          if (typeof err === 'string'){
              showAlertMessage(dropdownRef).error(err)
              return
          }
      }
  }

    const renderPriceChart = (ticks?: UnitCollection) => {
        const CHART_KEY = 'unit'
      return (
        <div style={{width: '90%'}}>
            <UnitChart 
                unitTicks={ticks ? ticks : new UnitCollection([])}
                onFetchMore={fetchMore}
                ref={childRefs[CHART_KEY]}
                onChangeLogicRange={(range) => onChangeLogicRange(range, CHART_KEY)}
                onChangeCrossHair={(e) => onCrossHairMove(e, CHART_KEY)}
                selectedTime={selectedTime}
                displayTimeScale={true}
                quantityCategory={quantityCategory}
            />
        </div>
      )
    }

  return (
    <Modal onClose={onClose}>
      <ModalWrapper>
        {renderSelectAsset()}
        {chartList.map((chart, idx) => {
          return (
            <div key={idx} style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20}}>
              {renderPriceChart(chart[0].get().ticks() as UnitCollection)}
            </div>
          )
        })}
        {renderCloseBtn()}
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