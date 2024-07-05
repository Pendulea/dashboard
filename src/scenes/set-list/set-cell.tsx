import styled from "styled-components"
import { SetModel } from "../../models/set"
import { Format } from "../../utils"
import TimeframeSelect from "./timeframe-select"
import AddAsset from "./add-asset"
import { AssetCollection, AssetModel } from "../../models/asset"
import AssetCell from "./asset-cell"
import Button from "../../components/button"


interface IProps {
    set: SetModel
    onSelectTimeframe: (timeframe: number) => void
    timeframe: number
    onOpenAddAssetModal?: () => void
}

const SetCell = (props:IProps) => {
    const { onSelectTimeframe, timeframe, set } = props

    const id = set.get().settings().get().id()
    const symbol0 = id[0]
    const symbol1 = id[1]

    return (
        <div style={{border: `1px solid white`, paddingBottom: 30}}>
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

                    <div style={{width: 250, marginTop: 0, display: 'flex', flexDirection: 'row'}}>
                        <span style={{ textAlign: 'center', marginRight: 10}} className="sectitle">TIMEFRAME:</span>
                        <TimeframeSelect 
                            onSelect={(timeframe: number) => onSelectTimeframe(timeframe)}
                            set={set}
                            onAdd={(resp) => alert(resp)}
                            defaultValue={timeframe}
                        />
                    </div>
                    <Button 
                        style={{width: 90, height: 25, marginLeft: 40, marginTop: 5}}
                        title="Add Asset"
                        color={'white'}
                        textStyle={{fontSize: 12}}
                        onClick={props.onOpenAddAssetModal}
                    />
                </div>

                <div style={{marginTop: 30, marginLeft: '2%', marginRight: '2%', marginBottom: 50}}>
                    {set.get().assets().orderByAddressAsc().chunk(5).map((assetList: any, idx: number) => {
                        return (
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 20}} key={'assetlist'+idx}>
                                {assetList.map((cas: AssetModel, idx: number) => {
                                  return (
                                        <div style={{width: '19%'}} key={cas.get().addressString()}>
                                            <AssetCell 
                                                asset={cas}
                                                set={set}
                                                timeframe={timeframe}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )                        
                    })}
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