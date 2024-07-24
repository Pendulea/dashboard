import React from "react";
import appStatus, { StatusModel } from "../models/status";
import { Format } from "../utils";
import Button from "../components/button";
import { GOLD, GREEN, RED } from "../constants";
import { useAcey } from "react-acey";

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
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', color: 'white', width: '100%', backgroundColor: '#353535', height: 40, borderBottom :'1px solid white'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
              <span style={{fontSize: 11, fontWeight: 500}}>FREE CPUs: <span style={{fontWeight: 800, fontSize: 13}}>{appStatus.get().freeCpuCount()}</span></span>
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
                  <Button
                    style={{height:26, width: 100, marginRight: 15}}
                    textStyle={{fontSize: 12}}
                    title={'Chart'}
                    color={'red'}
                    onClick={() => props.onClick('view-chart')}
                />
            </div>
      </div>
    )
}