import React, { useRef, useState } from 'react';
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
import SmartTickFetcher from './smart-puller';

interface ChartModalProps {
    onClose: () => void;
    show: boolean
    dropdownRef: React.RefObject<DropdownAlert>
}

const TIMEFRAME =  60*5 * 1000
const smartFetcher = new SmartTickFetcher(TIMEFRAME)

type ChartTypeCategory = 'unit' | 'quantity'| 'point'

const buildChartType = (category: ChartTypeCategory, asset: AssetModel, column:string): string => {
  return `${category}-${asset.get().addressString()}-${column}`  
}

interface IChart {
  asset_address: string,
  column: string
}

const ChartModal: React.FC<ChartModalProps> = ({ onClose, dropdownRef, show }) => {
    if (!show) return null

    const [selectedTime, setSelectedTime] = useState<number | null>(null)
    const [chartList, setChartList] = useState<IChart[]>([])

    const [selectedSetID, setSelectedSet] = useState<string>((sets.elem0() as SetModel).get().settings().get().idString())
    const [selectedAssetAddress, setSelectedAsset] = useState<string | null>(null)
    const [selectedColumn, setSelectedColumn] = useState<string>('')
    const [fetchCount, setFetchCount] = React.useState(0)
    const chartRefs = useRef<{[key in string]: UnitChartRefType}>({})
    
  const getSelectedSet = (): SetModel => {
    return sets.findByID(selectedSetID) as SetModel
  }

  const getSelectedAsset = (): AssetModel | null => {
    const set= getSelectedSet()
    if (!set || !selectedAssetAddress)
        return null
    return set.get().assets().findByAddress(selectedAssetAddress) || null
  }

    const getChartRefs = (): {[key in string]: UnitChartRefType} => {
        return chartRefs.current
    }

    const getChartRef = (category: ChartTypeCategory, asset: AssetModel, column:string ) => {
        return getChartRefs()[buildChartType(category,  asset, column)] as UnitChartRefType
    }
  
    const getConcernedAssets = (): string[] => {
      const ret: string[] = []
      for (const key in getChartRefs()){ 
        const ref = getChartRefs()[key]
        if (!ref)
            continue
          ret.push(...ref.assets())
      }
      return ret
    }

    const onRefreshConcernedAssets = async () => {
      getConcernedAssets().forEach((address) => {
        smartFetcher.addAsset(address)
      })
        
      const errors = await smartFetcher.fetch()
      if (errors.length > 0){
        showAlertMessage(dropdownRef).error(errors.join(', '))
      }
      setFetchCount((prev) => prev + 1)
    }

    const addChart = async () => {
      if (selectedAssetAddress){
        const asset = getSelectedAsset()
        if (!asset)
          return

        setChartList((prev) => {
          const ret = [...prev, {
            asset_address: selectedAssetAddress,
            column: selectedColumn
          }]
          return ret
        })
        
        setSelectedAsset(null)
        setTimeout(onRefreshConcernedAssets, 10)
      }
    } 


    const renderHeader = () => {
        return (
            <div onClick={onClose} style={{cursor: 'pointer', display: 'flex', flexDirection:'row', width: '100%',position:'fixed', zIndex: 10000, backgroundColor: '#121212'}}>
                <img style={{width: 16, height: 16, padding: 10}} src={'/images/cross-white.png'}/>
            </div>
        )
    }

    const onChangeLogicRange = (range: LogicalRange, cat: ChartTypeCategory, asset: AssetModel, column: string) => {
      const chartType = buildChartType(cat, asset, column)
      for (const key in getChartRefs()){
          if (key !== chartType){
              const ref = getChartRefs()[key]
              if (!ref)
                  continue
              ref.chart.timeScale().setVisibleLogicalRange(range)
          }
      }
      if (range.from < 10) {
          onRefreshConcernedAssets()
      }
  }

  const onCrossHairMove = (e: MouseEventParams<Time>, cat: ChartTypeCategory, asset: AssetModel, column: string) => {

    function getCrosshairDataPoint(series: any, param: any) {
          if (!param.time) {
              return null;
          }
          const dataPoint = param.seriesData.get(series);
          return dataPoint || null;
      }

      const mainRef = getChartRef(cat, asset, column)
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
      
      setSelectedTime((currentTime: any) => {
          if (currentTime !== e.time){
              return e.time
          }
          return currentTime
      })
  }

    const renderPriceChart = (asset: AssetModel, timeScale: boolean) => {
      const CHART_KEY = 'unit'
      const column = ''

      return (
        <div style={{width: '90%'}}>
            <UnitChart 
                unit={asset}
                ref={(ref) => chartRefs.current[buildChartType(CHART_KEY, asset, column)] = ref}
                onChangeLogicRange={(range) => onChangeLogicRange(range, CHART_KEY, asset, column)}
                onChangeCrossHair={(e) => onCrossHairMove(e, CHART_KEY, asset, column)}
                selectedTime={selectedTime}
                displayTimeScale={timeScale}
            />
        </div>
      )
    }

    const renderVolumeChart = (asset: AssetModel, timeScale: boolean) => {
      const CHART_KEY = 'quantity'
      const column = ''

      return (
        <div style={{width: '90%'}}>
            <QuantityChart 
                quantity={asset}
                ref={(ref) => chartRefs.current[buildChartType(CHART_KEY, asset, column)] = ref}
                onChangeLogicRange={(range) => onChangeLogicRange(range, CHART_KEY, asset, column)}
                onChangeCrossHair={(e) => onCrossHairMove(e, CHART_KEY, asset, column)}
                selectedTime={selectedTime}
                displayTimeScale={timeScale}
            />
        </div>
      )
    }

    const renderPointChart = (asset: AssetModel, column: string, timeScale: boolean) => {
      const CHART_KEY = 'point'
      return (
        <div style={{width: '90%'}}>
            <PointChart 
                asset={asset}
                column={column}
                ref={(ref) => chartRefs.current[buildChartType(CHART_KEY, asset, column)] = ref}
                onChangeLogicRange={(range) => onChangeLogicRange(range, CHART_KEY, asset, column)}
                onChangeCrossHair={(e) => onCrossHairMove(e, CHART_KEY, asset, column)}
                selectedTime={selectedTime}
                displayTimeScale={timeScale}
                onRefreshAssets={onRefreshConcernedAssets}
                timeframe={TIMEFRAME}
                fetchCount={fetchCount}
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
        {chartList.map((chart, idx) => {
          const { asset_address, column } = chart
          const asset = sets.assetsByAddresses([asset_address]).first() as AssetModel
            return (
              <div key={idx} style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                {asset.get().ressource().get().dataType() === 1  && !column && renderPriceChart(asset, idx+1 === chartList.length)}
                {asset.get().ressource().get().dataType() === 2  && !column && renderVolumeChart(asset, idx+1 === chartList.length)}
                {(asset.get().ressource().get().dataType() === 3 || !!column) && renderPointChart(asset, column, idx+1 === chartList.length)}
              </div>
            )
          })
        }
          <AddAsset
            selectedSet={getSelectedSet()}
            selectedAsset={getSelectedAsset()}
            selectedColumn={selectedColumn}
            onChange={(set, asset, column) => {
                setSelectedSet(set.get().settings().get().idString())
                setSelectedAsset(asset ? asset.get().addressString() : null)
                setSelectedColumn(column || '')
            }}
            timeframe={TIMEFRAME}
            onSubmit={addChart}
            style={{marginTop: chartList.length > 0 ? 40 : 0}}
          />
          <div  style={{height: 120}}></div>
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