import moment from "moment";
import { CSVStatusModel } from "../../models/status/csv-status";
import { Format } from "../../utils";
import React from "react";
import { DARK_GREEN, FLASHY_GREEN, GOLD, GREEN, RED } from "../../constants";
import Button from "../../components/button";

interface IProps {
    status: CSVStatusModel;
    onClickDownload: (cb: (percent: number) => void) => void;
}


const CSVStatus = (props: IProps) => {
    const { status, onClickDownload } = props;
    
    const [dlPercent, setDLPercent] = React.useState(-1);

    const [mouseIn, setMouseIn] = React.useState(false);
  
    const statusString = status.get().status();
    let percentColor = 'white';
  
    if (statusString.toLowerCase() === 'scheduled') {
      percentColor = GOLD;
    } else if (statusString.toLowerCase() === 'done') {
      percentColor = 'white';
    } else if (statusString.toLowerCase() === 'zipping') {
      percentColor = DARK_GREEN;
    } else {
      percentColor = GREEN;
    }
  
    const percent = status.get().percent();
  
    const onClickWDownloadWrapper = () => {
        onClickDownload((percent: number) => {
          setDLPercent(percent);
          console.log(percent)
        });
      }

      let requestTimeColor = 'white'
      const diff = Date.now() - status.get().requestTime().getTime()
      if (diff > 21 * 1000 * 3600) { // 21 hours
        requestTimeColor = RED
      } else if (diff > 1000 * 3600 * 12) { // 12 hours
        requestTimeColor = GOLD
      } 
    

    const renderDlBtn = () => {
        if (dlPercent < 100 && dlPercent >= 0) {
          return (
            <span style={{color: FLASHY_GREEN, fontSize:16, fontWeight: 800}} >{dlPercent}%</span>
          )
        }
        if (!mouseIn) {
          return null
        }
    
        return (
            <Button
              icon='/images/download-white.png'
              iconStyle={{ width: 14, height: 14 }}
              title={''}
              color={'green'}
              style={{ width: 42, height: 24 }}
              textStyle={{ fontSize: 13 }}
              onClick={onClickWDownloadWrapper} // service.downloadArchive(status.get().buildID())}
            />
        )
      }
    


    const diffTime = status.get().to() - status.get().from()
    const reqTime = moment(status.get().requestTime()).fromNow().toUpperCase()
    
    return (
        <div style={{padding: 12, borderBottom: '1px solid white'}}
            onMouseEnter={() => setMouseIn(true)}  
            onMouseLeave={() => setMouseIn(false)}
        >
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                {status.get().requestTime() && <span style={{color: requestTimeColor, fontSize: 11, fontWeight: 500, fontStyle: 'italic'}}>{reqTime.startsWith('A FEW') ? 'NOW' : reqTime}</span>}
                <span style={{fontSize: 8.5, fontWeight: 600, marginRight: 20}}>hash: {status.get().buildID().split('-')[3]}</span>
            </div>


            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 15}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span style={{fontSize: 10}}>TIMEFRAME:</span>
                        <span style={{fontSize: 18, fontWeight: 700}}>{status.get().timeframeLabel()}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 15}}>
                        <span style={{fontSize: 10, marginBottom: 3}}>DATE RANGE:</span>
                        <span style={{fontSize: 12}}>{moment(status.get().from()).format('L')} - {moment(status.get().to()).format('L')} <span style={{fontWeight: 700}}>(~ {moment.duration(diffTime).humanize()})</span></span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 15}}>
                        <span style={{fontSize: 10}}>SIZE:</span>
                        <span style={{fontSize: 14, fontWeight: 700}}>{Format.largeBytesToShortString(status.get().size())}</span>
                    </div>
                </div>
                {percent >= 100 && status.get().requestTime().getTime() > 0 ? 
                    renderDlBtn()
                    : (
                    <span style={{fontSize: 15, fontWeight: 800, color: percentColor}}>
                        <span style={{fontSize:12, fontWeight: 600}}>{statusString + ': '}</span> {percent.toFixed(2)}% <span style={{fontSize: 13, fontWeight: 700}}>({Format.largeBytesToShortString(status.get().size())})</span>
                    </span>
                    )
                }
            </div>


        </div>
    )
}

export default CSVStatus;