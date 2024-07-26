import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal';
import DropdownAlert from '../../components/dropdown-alert';
import UnitChart from './unit-chart';
import { LogicalRange, MouseEventParams, Time } from 'lightweight-charts';
import { AssetModel } from '../../models/asset';
import sets, { SetModel } from '../../models/set';
import { showAlertMessage } from '../../constants/msg';
import { UnitChartRefType } from './interfaces';
import QuantityChart from './quantity-chart';
import PointChart from './point-chart';
import _ from 'lodash';
import AddAsset from './add-asset';
import dataAffiner, { DataAffiner, IDataLine } from './data-affiner';
import SelectTimeframe from '../../components/select-timeframe';
import { MIN_TIME_FRAME } from '../../constants';
import TimeframeSelect from '../../components/timeframe-select';

interface ChartModalProps {
    onClose: () => void;
    show: boolean
    dropdownRef: React.RefObject<DropdownAlert>
}

type ChartTypeCategory = 'unit' | 'quantity'| 'point'

const buildChartType = (category: ChartTypeCategory, assetAddress: string, column:string): string => {
  return `${category}-${assetAddress}-${column}`  
}

const ChartModal: React.FC<ChartModalProps> = ({ onClose, dropdownRef, show }) => {
    if (!show) return null

    const [loading, setLoading] = useState<boolean>(false)
    const chartRefs = useRef<{[key in string]: UnitChartRefType}>({})
    const dataAffinerRef = useRef(new DataAffiner())
    const [selectedTimeframe, setSelectedTimeframe] = useState<number>(MIN_TIME_FRAME)

    useEffect(() => {
      dataAffinerRef.current.setTimeframe(selectedTimeframe)
      onRefreshConcernedAssets()
    }, [selectedTimeframe])

    const getChartRefs = (): {[key in string]: UnitChartRefType} => {
        return chartRefs.current
    }

    const getChartRef = (category: ChartTypeCategory, assetAddress: string, column:string ) => {
        return getChartRefs()[buildChartType(category,  assetAddress, column)] as UnitChartRefType
    }
  
    const onRefreshConcernedAssets = async () => {
      setLoading(true)
      const notSync = dataAffinerRef.current.assets.every(a => a.count_fetch === 0)
      const err = await dataAffinerRef.current.fetchTicks(!notSync)
      if (err){
        showAlertMessage(dropdownRef).error(err)
      }
      setTimeout(() => setLoading(false), 50)
    }

    const fetchMore = _.throttle(async () => {
      setLoading(true)
      const err = await dataAffinerRef.current.fetchTicks(false)
      if (err){
        showAlertMessage(dropdownRef).error(err)
      }
      setLoading(false)
    }, 300)

    const addChart = async (set: SetModel | null, asset: AssetModel | null, columns: string[]) => {
      if (asset){
        try {
          dataAffinerRef.current.addChart(asset.get().addressString(), columns.length > 0 ? columns[0] : '')
          await onRefreshConcernedAssets()
        }catch (err){
          alert(err)
        }
      }
    } 

    const onAddTimeframeToEverySet = async (timeframe: number) => {
     const promises = sets.map((set: SetModel) => set.addTimeframe(timeframe))as Promise<string | null>[]
      const errs = await Promise.all(promises)
      const err = errs.find(e => e !== null)
      if (err){
        showAlertMessage(dropdownRef).error(err)
      } else {
        showAlertMessage(dropdownRef).success()
      }
    }

    const renderHeader = () => {
        return (
            <div  style={{display: 'flex', flexDirection:'row', width: '100%', height: 50, position:'fixed', zIndex: 10000, backgroundColor: '#121212', borderBottom: '1px solid white'}}>
                <div  style={{width: '33.3%'}}>
                  <img onClick={onClose} style={{width: 16, height: 16, padding: 17, cursor: 'pointer'}} src={'/images/cross-white.png'}/>
                </div>
                <div style={{width: '33.3%', height: '100%', display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
                  <span style={{fontSize: 13, fontWeight: 600}}>DATA VISUALISATION</span>
                </div>
                <div style={{width: '33.3%', display: 'flex', justifyContent: 'flex-end', paddingRight: 10, paddingTop: 9}}>
                  <div style={{width: 150}}> 
                    <TimeframeSelect 
                      selectedTimeframe={selectedTimeframe}
                      timeframes={sets.allTimeframes()}
                      onSelect={(timeframe) => setSelectedTimeframe(timeframe)}
                      onAdd={onAddTimeframeToEverySet}
                    />
                  </div>
                </div>
            </div>
        )
    }

    const onChangeLogicRange = (range: LogicalRange, cat: ChartTypeCategory, assetAddress: string, column: string) => {
      const chartType = buildChartType(cat, assetAddress, column)
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

  const onCrossHairMove = (e: MouseEventParams<Time>, cat: ChartTypeCategory, assetAddress: string, column: string) => {

    function getCrosshairDataPoint(series: any, param: any) {
          if (!param.time) {
              return null;
          }
          const dataPoint = param.seriesData.get(series);
          return dataPoint || null;
      }

      const mainRef = getChartRef(cat, assetAddress, column)
      if (!mainRef){
        return
      }

      const dp = getCrosshairDataPoint(mainRef.serie, e)
      if (dp){
          for (const key in getChartRefs()){ 
            const ref = getChartRefs()[key]
            if (!ref || ref === mainRef){
              continue
            }
              const chart = ref.chart
              const serie = ref.serie
              if (chart && serie){
                  chart.setCrosshairPosition(dp.value, dp.time, serie)
              }
          }
      }

      for (const key in getChartRefs()){ 
        const ref = getChartRefs()[key]
        if (!ref)
            continue
          ref.updateSelectedTime(e.time ? Number(e.time) : null)
      }
  }

    const renderPriceChart = (chart: IDataLine, timeScale: boolean) => {
      const CHART_KEY = 'unit'
      
      return (
        <div style={{width: '90%'}}>
            <UnitChart 
                unit={chart}
                ref={(ref) => chartRefs.current[buildChartType(CHART_KEY, chart.asset_address, chart.column)] = ref}
                onChangeLogicRange={(range) => onChangeLogicRange(range, CHART_KEY, chart.asset_address, chart.column)}
                onChangeCrossHair={(e) => onCrossHairMove(e, CHART_KEY, chart.asset_address, chart.column)}
                displayTimeScale={timeScale}
                loading={loading}
                dataAffiner={dataAffinerRef.current}
            />
        </div>
      )
    }

    const renderVolumeChart = (chart: IDataLine, timeScale: boolean) => {
      const CHART_KEY = 'quantity'

      return (
        <div style={{width: '90%'}}>
            <QuantityChart 
                chart={chart}
                ref={(ref) => chartRefs.current[buildChartType(CHART_KEY, chart.asset_address, chart.column)] = ref}
                onChangeLogicRange={(range) => onChangeLogicRange(range, CHART_KEY, chart.asset_address, chart.column)}
                onChangeCrossHair={(e) => onCrossHairMove(e, CHART_KEY, chart.asset_address, chart.column)}
                displayTimeScale={timeScale}
                loading={loading}
                dataAffiner={dataAffinerRef.current}
            />
        </div>
      )
    }

    const renderPointChart = (charts: IDataLine[], timeScale: boolean) => {
      const CHART_KEY = 'point'
      return (
        <div style={{width: '90%'}}>
            <PointChart 
              charts={charts}
              ref={(ref) => chartRefs.current[buildChartType(CHART_KEY, charts[0].asset_address, charts[0].column)] = ref}
              onChangeLogicRange={(range) => onChangeLogicRange(range, CHART_KEY, charts[0].asset_address, charts[0].column)}
              onChangeCrossHair={(e) => onCrossHairMove(e, CHART_KEY, charts[0].asset_address, charts[0].column)}
              displayTimeScale={timeScale}
              onRefreshAssets={onRefreshConcernedAssets}
              timeframe={selectedTimeframe}
              loading={loading}
              dataAffiner={dataAffinerRef.current}
            />
        </div>
      )
    }

  return (
    <Modal onClose={onClose}>
      <ModalWrapper>
        <div style={{overflowY:'scroll', width:'100%', height:'100%'}}>
        {renderHeader()}
        <div style={{height: 70}} />
        {dataAffinerRef.current.charts.map((chart, idx) => {
          const asset = sets.assetsByAddresses([chart.sub_charts[0].asset_address]).first() as AssetModel
          const column = chart.sub_charts[0].column
            return (
              <div key={idx} style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                {asset.get().ressource().get().dataType() === 1  && !column && renderPriceChart(chart.sub_charts[0], idx+1 === dataAffinerRef.current.charts.length)}
                {asset.get().ressource().get().dataType() === 2  && !column && renderVolumeChart(chart.sub_charts[0], idx+1 === dataAffinerRef.current.charts.length)}
                {(asset.get().ressource().get().dataType() === 3 || !!column) && renderPointChart(chart.sub_charts, idx+1 === dataAffinerRef.current.charts.length)}
                <div style={{width: '10%', display: 'flex', alignItems: 'center',justifyContent:'center'}}>
                  <img src={'/images/cross-red.png'} style={{width: 18, height:18, padding: 10, marginBottom: 50}} />
                </div>
              </div>
            )
          })
        }

          <div style={{display: 'flex', flexDirection: 'row', width: '100%', paddingLeft: 20, marginTop: dataAffinerRef.current.assets.length > 0 ? 40 : 0, borderTop: dataAffinerRef.current.assets.length > 0 ? '1px solid white' : undefined}}>
              <span style={{fontSize: 15, fontWeight: 500, marginTop: dataAffinerRef.current.assets.length > 0 ? 42 : 22}}>
                ADD NEW CHART
              </span>
              <div style={{width:'80%', marginLeft: 30, marginTop: dataAffinerRef.current.assets.length > 0 ? 20 : 0}}>
                <AddAsset
                  timeframe={selectedTimeframe}
                  onSubmit={addChart}
                  multiColumn={false}
                />
              </div>
          </div>

          
          <div style={{height: 120}}></div>
        </div>
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
`;