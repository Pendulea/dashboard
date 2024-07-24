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
import dataAffiner, { IDataLine } from './data-affiner';

interface ChartModalProps {
    onClose: () => void;
    show: boolean
    dropdownRef: React.RefObject<DropdownAlert>
}

const TIMEFRAME =  86_400_000
dataAffiner.setTimeframe(TIMEFRAME)

type ChartTypeCategory = 'unit' | 'quantity'| 'point'

const buildChartType = (category: ChartTypeCategory, assetAddress: string, column:string): string => {
  return `${category}-${assetAddress}-${column}`  
}

const ChartModal: React.FC<ChartModalProps> = ({ onClose, dropdownRef, show }) => {
    if (!show) return null

    const [loading, setLoading] = useState<boolean>(false)
    const chartRefs = useRef<{[key in string]: UnitChartRefType}>({})

    const getChartRefs = (): {[key in string]: UnitChartRefType} => {
        return chartRefs.current
    }

    const getChartRef = (category: ChartTypeCategory, assetAddress: string, column:string ) => {
        return getChartRefs()[buildChartType(category,  assetAddress, column)] as UnitChartRefType
    }
  
    const onRefreshConcernedAssets = async () => {
      if (loading){
        return
      }
      setLoading(true)
      const notSync = dataAffiner.assets.every(a => a.count_fetch === 0)
      const err = await dataAffiner.fetchTicks(!notSync)
      if (err){
        showAlertMessage(dropdownRef).error(err)
      }
      setTimeout(() => setLoading(false), 50)
    }

    const fetchMore = _.debounce(async () => {
      if (loading){
        return
      }
      setLoading(true)
      const err = await dataAffiner.fetchTicks(false)
      if (err){
        showAlertMessage(dropdownRef).error(err)
      }
      setLoading(false)
    }, 500)

    const addChart = async (set: SetModel | null, asset: AssetModel | null, columns: string[]) => {
      if (asset){
        try {
          dataAffiner.addChart(asset.get().addressString(), columns.length > 0 ? columns[0] : '')
          await onRefreshConcernedAssets()
        }catch (err){
          alert(err)
        }
      }
    } 

    const renderHeader = () => {
        return (
            <div onClick={onClose} style={{cursor: 'pointer', display: 'flex', flexDirection:'row', width: '100%',position:'fixed', zIndex: 10000, backgroundColor: '#121212'}}>
                <img style={{width: 16, height: 16, padding: 10}} src={'/images/cross-white.png'}/>
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
      if (!mainRef)
          return

      const dp = getCrosshairDataPoint(mainRef.serie, e)
      if (dp){
          for (const key in getChartRefs()){ 
            const ref = getChartRefs()[key]
            if (!ref || ref === mainRef)
                continue
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
              timeframe={TIMEFRAME}
              loading={loading}
            />
        </div>
      )
    }

  return (
    <Modal onClose={onClose}>
      <ModalWrapper>
        <div style={{overflowY:'scroll', width:'100%', height:'100%'}}>
        {renderHeader()}
        <div style={{height: 40}}></div>
        {dataAffiner.charts.map((chart, idx) => {
          const asset = sets.assetsByAddresses([chart.sub_charts[0].asset_address]).first() as AssetModel
          const column = chart.sub_charts[0].column

            return (
              <div key={idx} style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                {asset.get().ressource().get().dataType() === 1  && !column && renderPriceChart(chart.sub_charts[0], idx+1 === dataAffiner.charts.length)}
                {asset.get().ressource().get().dataType() === 2  && !column && renderVolumeChart(chart.sub_charts[0], idx+1 === dataAffiner.charts.length)}
                {(asset.get().ressource().get().dataType() === 3 || !!column) && renderPointChart(chart.sub_charts, idx+1 === dataAffiner.charts.length)}
              </div>
            )
          })
        }

          <h1 style={{fontSize: 22, padding: 0, margin: 0}}>New chart</h1>
          <AddAsset
            timeframe={TIMEFRAME}
            onSubmit={addChart}
            style={{marginTop: dataAffiner.charts.length > 0 ? 40 : 0, paddingLeft: 20, borderTop: '1px solid white'}}
            multiColumn={false}
          />
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