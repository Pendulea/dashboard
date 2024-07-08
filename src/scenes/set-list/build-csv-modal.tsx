import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal';
import DropdownAlert from '../../components/dropdown-alert';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import _ from 'lodash';
import Button from '../../components/button';
import appStatus from '../../models/status';
import { Format, service } from '../../utils';
import { showAlertMessage } from '../../constants/msg';
import { CSVStatusModel } from '../../models/status/csv-status';
import CSVStatus from './csv-status';
import { GOLD } from '../../constants';
import TimeframeCell from './timeframe-cell';
import SelectAddressCell from './select-asset-cell';
import sets from '../../models/set';

type UnpackedOrder = string[] | null

interface BuildCSVModalProps {
    onClose: () => void;
    show: boolean
    dropdownRef: React.RefObject<DropdownAlert>
}

const BuildCSVModal: React.FC<BuildCSVModalProps> = ({ onClose, dropdownRef, show }) => {
    if (!show) return null

    const [orders, setOrders] = React.useState<UnpackedOrder[]>([null])
    const [selectedTimeframe, setSelectedTimeframe] = React.useState<number>(appStatus.get().minTimeframe())
    const [startDate, setStartDate] = useState(new Date(0))
    const [endDate, setEndDate] = useState(new Date(0))
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const from = minFrom()
        const to = minTo()
        if (!from || !to){
            setStartDate(new Date(0))
            setEndDate(new Date(0))
            return
        }
        const fromUnix = Format.strDateToUnix(from)
        const toUnix = Format.strDateToUnix(to)
        if (fromUnix > startDate){
            setStartDate(fromUnix)
        }
        if (toUnix < endDate || endDate.getTime() == 0){
            setEndDate(toUnix)
        }
    }, [orders])

    const onUpdateOrder = (order: UnpackedOrder, idx: number) => {
        const cpy = _.cloneDeep(orders)
        cpy[idx] = order
        setOrders(cpy)
        console.log(cpy)
    }

    const onSubmit = async () => {
        if (startDate.getTime() == 0 || endDate.getTime() == 0){
            return showAlertMessage(dropdownRef).error('Please select a valid date range')
        }
        setLoading(true)
        const err = await appStatus.buildCSV(
            selectedTimeframe,
            startDate,
            endDate,
            orders.filter((o) => o !== null) as string[][]
        )
        if (err){
            showAlertMessage(dropdownRef).error(err)
        }
        setLoading(false)
    }

    const minFrom = () => {
        const filtered = orders.filter((o) => o !== null) as string[][]
        if (filtered.length == 0)
            return null
        return sets.assetsByAddresses(filtered.map(o => o[0])).findMinHistoricalDate()
    }
    const minTo = () => {
        const filtered = orders.filter((o) => o !== null) as string[][]
        if (filtered.length == 0)
            return null
        return sets.assetsByAddresses(filtered.map(o => o[0])).findLeastMaxConsistency(selectedTimeframe)
    }

    const listSetIDs = () => {
        return _.uniq(orders.map((address) => {
            if (address){
                return address[0].split(';')[0].replace('_', '-')
            }
            return null
        }).filter((id) => id !== null)) as string[]
    }

    const listAvailableTimeframes = () => {
        return sets.filterByIDs(listSetIDs().join(',').replace('-', '').split(',')).commonTimeframes()
    }

    const setIDs = listSetIDs()
    const minDate = minFrom()
    const maxDate = minTo()

    const renderMinDateInput = () => (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 12}}>FROM DATE</span>
            <DatePicker
                className="datePicker"
                selected={startDate}
                onChange={(date) => date && setStartDate(date)}
                includeDateIntervals={[
                { start: minDate ? Format.strDateToUnix(minDate) : new Date(), end: maxDate ? Format.strDateToUnix(maxDate) : new Date()},
                ]}
                closeOnScroll
            />
            {minDate ? <span style={{fontSize: 10.5, textAlign: 'right', marginTop: 2, cursor: 'pointer'}} onClick={() => {
                if (minDate){
                    const unix = Format.strDateToUnix(minDate)
                    if (unix.getTime() > 0){
                        setStartDate(unix)
                    }
                }
            }}>min: <span style={{fontWeight: 900}}>{minDate}</span></span> : <span style={{color: GOLD, fontSize: 10.5, textAlign: 'right', marginTop: 2,}}>not sync</span>}
        </div>
    )

    const renderToDateInput = () => (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20}}>
            <span style={{fontSize: 12}}>TO DATE</span>
            <DatePicker
                className="datePicker"
                selected={endDate}
                onChange={(date) => date && setEndDate(date)}
                includeDateIntervals={[
                { start: minDate ? Format.strDateToUnix(minDate) : new Date(), end: maxDate ? Format.strDateToUnix(maxDate) : new Date()},
                ]}
                closeOnScroll
            />
            {maxDate ? <span style={{fontSize: 10.5, textAlign: 'right', marginTop: 2, cursor: 'pointer'}} onClick={() => {
                if (maxDate){
                    const unix = Format.strDateToUnix(maxDate)
                    if (unix.getTime() > 0){
                        setEndDate(unix)
                    }
                }
            }}>max: <span style={{fontWeight: 900}}>{maxDate}</span></span>: <span style={{color: GOLD, fontSize: 10.5, textAlign: 'right', marginTop: 2,}}>not sync</span>}
        </div>
    )

    const renderSelectCSVTimeframe = () => (
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
            <span style={{fontSize: 12}}>SELECT TIMEFRAME</span>
            <span style={{fontSize: 9.5, marginTop: 3}}>(PICK ONE IN THE {setIDs.length > 1 ? 'COMMON TIMEFRAMES AMONG ' : ''} <span style={{fontWeight: 800}}>{setIDs.join(', ').toUpperCase()}</span> {setIDs.length == 1 ? 'TIMEFRAMES' : ''})</span>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    {listAvailableTimeframes().map((timeframe: number, idx: number) => {
                        return (
                            <TimeframeCell 
                                key={'rereggrg'+ idx}
                                timeframe={timeframe} 
                                big
                                onClick={() => setSelectedTimeframe(timeframe)}
                                selected={selectedTimeframe === timeframe}
                                style={{marginLeft: idx > 0 ? 10 : 0}}
                            /> 
                        )
                    })}
            </div>
        </div>
    )

    const renderBottomMenu = () => {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop: '1px solid white', paddingTop: 20}}>
                {renderSelectCSVTimeframe()}

                <div style={{display: 'flex', flexDirection: 'row', marginRight: 20}}>
                    {renderMinDateInput()}
                    {renderToDateInput()}
                </div>
            </div>
        )
    }

    const renderLeft = () => {
        return (
            <div style={{width: '65%', overflowY: 'scroll', height: '100%'}}>
                {orders.map((order: UnpackedOrder, idx: number) => {
                    return (
                        <div key={'oer' + idx} style={{display: 'flex', flexDirection: 'column', marginTop: idx > 0 ? 30 : 20, marginRight: 20, marginLeft: 20}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}> 
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <span style={{fontSize: 17, fontWeight: 600}}>ASSET {idx + 1}</span>
                                    {idx > 0 &&<img 
                                        onClick={() => setOrders(orders.filter((_, i) => i !== idx))}
                                        style={{width: 14, height: 14, marginLeft: 10, cursor: 'pointer'}} 
                                        src={'/images/cross-red.png'} 
                                    />}
                                </div>
                            </div>
                            <SelectAddressCell onUpdateOrder={(order) => onUpdateOrder(order, idx)} />
                        </div>
                    )
                })}                
                <div style={{display: 'flex', opacity: orders[orders.length-1] != null ? 1 : 0, justifyContent: 'center', marginTop: 50, marginBottom: 100}}>
                    <Button 
                        style={{width: 60, height: 25}}
                        textStyle={{fontSize: 12}}
                        color='black'
                        icon='/images/plus-white.png'
                        title=''
                        disabled={orders[orders.length-1] === null}
                        iconStyle={{width: 14, height: 14}}
                        onClick={() => setOrders([...orders, null])}
                    
                    />
                </div>
                {setIDs.length > 0 && renderBottomMenu()}
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 30, marginBottom: 50}}>
                    <Button 
                        style={{width: 200, height: 35}}
                        textStyle={{fontSize: 13}}
                        color='green'
                        title='Build CSV'
                        loading={loading}
                        iconStyle={{width: 14, height: 14}}
                        onClick={onSubmit}
                    />
                </div>

            </div>

        )
    }


    const renderRight = () => {
        return (
            <div style={{width: '35%', border: '1px solid green', height: '100%', overflow: 'scroll'}}>
                {appStatus.get().csvStatuses().map((status: CSVStatusModel, idx: number) => {
                    return (
                        <CSVStatus 
                            key={'sttt'+ idx}
                            status={status}
                            onClickDownload={(cb) => service.downloadArchive(status.get().buildID(), cb)}
                        />
                    )
                })}
            </div>
        )
    }


  return (
    <Modal onClose={onClose}>
      <ModalWrapper>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
            {renderLeft()}
            {renderRight()}
      </div>
      </ModalWrapper>
    </Modal>
  );
};

export default BuildCSVModal;

const ModalWrapper = styled.div`
  width: ${window.innerWidth * 0.95}px;
  height: calc(100% - 80px);
  background-color: #111111;
  border-radius: 10px;
  margin-top: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;