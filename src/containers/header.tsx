import React from "react";
import appStatus, { StatusModel } from "../models/status";
import { Format } from "../utils";
import Button from "../components/button";
import { CLEAR_BLACK, GOLD, GREEN, RED } from "../constants";
import { useAcey } from "react-acey";
import ActionButton from "../components/action-button";

export type T_MENU = 'add-pair' | 'build-csv' | 'view-chart'

export interface IProps {
    onClick: (menu: T_MENU) => void
}

export const Header = (props: IProps) => {

    useAcey([
      appStatus
    ] as any)

    if (appStatus.get().cpuCount() === 0){
      return null
    }
    const memory = appStatus.get().availableMemory()
    const disk = appStatus.get().availableDiskSpace()

    let memoryColor = GREEN
    if (memory < 800_000_000){
      memoryColor = RED
    } else if (memory < 2_000_000_000){
      memoryColor = GOLD
    }
    let diskColor = GREEN
    if (disk < 20_000_000_000){
      diskColor = RED
    } else if (disk < 100_000_000_000){
      diskColor = GOLD
    } 
    return (
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', color: 'white', width: '100%', backgroundColor: CLEAR_BLACK, height: 60, borderBottom :'1px solid white'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 5}}>
              <span style={{fontSize: 11, fontWeight: 500}}>FREE CPUs: <span style={{fontWeight: 800, fontSize: 13}}>{appStatus.get().freeCpuCount()}</span></span>
              <span style={{fontSize: 11, fontWeight: 500, marginLeft: 10, marginRight: 10}}> | </span>
              <span style={{fontSize: 11, fontWeight: 500}}>FREE MEMORY: <span style={{fontWeight: 800, fontSize: 13, color: memoryColor}}>{Format.largeBytesToShortString(memory).toUpperCase()}</span></span>
              {disk > 0 && <span style={{fontSize: 11, fontWeight: 500, marginLeft: 10, marginRight: 10}}> | </span>}
              {disk > 0 && <span style={{fontSize: 11, fontWeight: 500}}>FREE DISK: <span style={{fontWeight: 800, fontSize: 13, color: diskColor}}>{Format.largeBytesToShortString(disk).toUpperCase()}</span></span>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                <ActionButton 
                  size={'small'}
                  icon={'plus-white.png'}
                  title={'Add pair'}
                  onClick={() => props.onClick('add-pair')}
                />
                <div style={{marginLeft: 20}}/>
                <ActionButton 
                  size={'small'}
                  icon={'csv-white.png'}
                  title={'Export'}
                  onClick={() => props.onClick('build-csv')}
                />
                <div style={{marginLeft: 20}}/>
                <ActionButton 
                  size={'small'}
                  icon={'candle-white.png'}
                  title={'View'}
                  onClick={() => props.onClick('view-chart')}
                />
                <div style={{width: 20}}/>
              </div>
      </div>
    )
}