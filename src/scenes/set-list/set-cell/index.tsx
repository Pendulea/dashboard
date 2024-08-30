import styled from "styled-components"
import { SetModel } from "../../../models/set"
import { Format } from "../../../utils"
import TimeframeSelect from "../../../components/timeframe-select"
import { AssetCollection, AssetModel } from "../../../models/asset"
import AssetCell from "./asset-cell"
import Button from "../../../components/button"
import { showAlertMessage } from "../../../constants/msg"
import DropdownAlert from "../../../components/dropdown-alert"
import { useState } from "react"
import { MIN_TIME_FRAME } from "../../../constants"


interface IProps {
    set: SetModel
    dropdownRef: React.RefObject<DropdownAlert>
    onOpenAddAssetModal?: () => void
}

const SetCell = (props:IProps) => {
    const { set } = props

    const [timeframe, setTimeframe] = useState(MIN_TIME_FRAME)

    const id = set.get().settings().get().id()
    const symbol0 = id[0]
    const symbol1 = id[1]


    const onAddTimeframe = async (value: number) => {
        const err = await set.addTimeframe(value)
        if (err){
            showAlertMessage(props.dropdownRef).error(err)
        } else {
            showAlertMessage(props.dropdownRef).success()
        }
    }

    const renderAssetList = () => {
        const CHUNK = 5
        const width = 100 / CHUNK - 1 + '%'
        
        const ret = (set.get().assets().orderByAddressAsc().chunk(CHUNK) as AssetCollection[]).map((assetList: AssetCollection, idx: number) => {
            return assetList.map((cas: AssetModel, idx: number) => {
                return (
                      <div style={{width}} key={cas.get().addressString()}>
                          <AssetCell 
                              asset={cas}
                              set={set}
                              timeframe={timeframe}
                          />
                      </div>
                  )
              }) as any[]
        }) as any[][]
        
        if (ret.length !== 0){
            const lastLine = ret[ret.length - 1]
            if (lastLine.length == CHUNK) {
                ret.push([])
            }
        } else {
            ret.push([])
        }
        ret[ret.length - 1].push(<div key={'add asset btn'} style={{width, display: 'flex', justifyContent: 'center'}}>
            <Button 
                style={{width: '50%', height: 25}}
                textStyle={{fontSize: 12}}
                color='black'
                icon='/images/plus-white.png'
                title=''
                iconStyle={{width: 14, height: 14}}
                onClick={props.onOpenAddAssetModal}
            />
        </div>)

        return ret.map((line, idx) => {
            return (
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 20}} key={'assetlist'+idx}>
                    {line}
                </div>
            )
        })

    }

    return (
        <div style={{borderBottom: `1px solid white`, paddingBottom: 30}}>
            <SetCellContainer>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {set.get().icon() && <img style={{width: 42, height: 42, marginRight: 10}} src={set.get().icon()} />}
                        
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span className="sectitle">SET ID:</span>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{color: 'white', margin: 0, padding: 0}}>
                                    <span style={{ fontWeight: 900 }}>{symbol0}</span>-<span style={{ fontWeight: 500 }}>{symbol1}</span>
                                </h3>
                            </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 20}}>
                            <span className="sectitle">SET SIZE:</span>
                            <span style={{ fontWeight: 800, fontSize: 13}}>{Format.largeBytesToShortString(set.get().size())}</span>
                        </div>
                    </div>

                    <div style={{width: 200, marginTop: 0, display: 'flex', flexDirection: 'column', marginRight: 10}}>
                        <span style={{ marginRight: 10}} className="sectitle">TIMEFRAME:</span>
                        <TimeframeSelect 
                            onSelect={(timeframe: number) => setTimeframe(timeframe)}
                            onAdd={onAddTimeframe}
                            selectedTimeframe={timeframe}
                            timeframes={set.get().availableTimeframes()}
                            // set={set}
                        />
                    </div>
                </div>

                <div style={{marginTop: 30, marginLeft: '2%', marginRight: '2%', marginBottom: 50}}>
                    {renderAssetList()}
                </div>

            </SetCellContainer>
        </div>
    )
}


const SetCellContainer = styled.div`
  padding-top: 7px;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
  display: flex;
  flex-direction: column;

  .datePicker {
    height: 38.5px;
    width: 120px;
    background-color: #353535;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 0 10px;
    font-size: 15px;
  }

  .sectitle {
    font-size: 11.5px;
    text-transform: uppercase;
    font-weight: 200;
  }
  
  .date {
    font-size: 11.5px;
    text-transform: uppercase;
    font-weight: 300;
  }

  h3 {
    font-size: 16px;
    margin: 0;
    padding: 0;
    font-weight: 300;
  }
  .datasetsize {
    font-size: 12px;
    margin-right: 5px;
  }
`;

export default SetCell