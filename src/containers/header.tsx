import React from "react";
import { StatusModel } from "../models/status";
import { Format } from "../utils";
import Button from "../components/button";
import { GOLD, GREEN, RED } from "../constants";

export type T_MENU = 'add-pair' | 'build-csv'

export interface IProps {
    status: StatusModel
    onClick: (menu: T_MENU) => void
}

export const Header = (props: IProps) => {

    const { status } = props

    if (status.get().cpuCount() === 0){
      return null
    }
    const memory = status.get().availableMemory()
    const disk = status.get().availableDiskSpace()

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
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', color: 'white', width: '100%', backgroundColor: '#353535', height: 40, borderBottom :'1px solid white'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
              <span style={{fontSize: 11, fontWeight: 500}}>FREE CPUs: <span style={{fontWeight: 800, fontSize: 13}}>{status.get().freeCpuCount()}</span></span>
              <span style={{fontSize: 11, fontWeight: 500, marginLeft: 10, marginRight: 10}}> | </span>
              <span style={{fontSize: 11, fontWeight: 500}}>FREE MEMORY: <span style={{fontWeight: 800, fontSize: 13, color: memoryColor}}>{Format.largeBytesToShortString(memory).toUpperCase()}</span></span>
              {disk > 0 && <span style={{fontSize: 11, fontWeight: 500, marginLeft: 10, marginRight: 10}}> | </span>}
              {disk > 0 && <span style={{fontSize: 11, fontWeight: 500}}>FREE DISK: <span style={{fontWeight: 800, fontSize: 13, color: diskColor}}>{Format.largeBytesToShortString(disk).toUpperCase()}</span></span>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Button
                    style={{height: 26, width: 100, marginRight: 15}}
                    textStyle={{fontSize: 12}}
                    title={'Add pair'}
                    color={'white'}
                    onClick={() => props.onClick('add-pair')}
                />
                <Button
                    style={{height:26, width: 100, marginRight: 15}}
                    textStyle={{fontSize: 12}}
                    title={'Build CSV'}
                    color={'blue'}
                    onClick={() => props.onClick('build-csv')}
                />
            </div>
      </div>
    )
}