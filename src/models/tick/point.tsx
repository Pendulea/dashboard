import { tickStep } from "d3"

export interface IPointData {
    v: number
    time: number
}

// export class PointModel {

//     constructor(public state: IPointData) {}

//     get = () => {
//         return {
//             value: (): number => this.state.v,
//             time: (): number => this.state.time
//         }
//     }
// }


// export class PointCollection {
    
//     private _map: Map<number, PointModel> = new Map()
//     constructor(public state: PointModel[]){}

//     get = (time: number) => {
//         return this._map.get(time)
//     }

//     averageTimeGap = () => {
//         if (this.state.length < 2){
//             return 0
//         }

//         const first = this.first() as PointModel
//         const last = this.state[this.state.length - 1]
//         return (last.get().time() - first.get().time()) / this.state.length

//     }

//     first = () => this.state[0] as PointModel | undefined

//     orderByTimeAsc = () => {
//         return this.state.sort((a: PointModel, b: PointModel) => {
//             return a.get().time() - b.get().time()
//         })
//     }

//     count = () => this.state.length

//     earliestTime = () => {
//         return this.state.reduce((acc: number, m: PointModel) => {
//             return Math.min(acc, m.get().time())
//         }, Number.MAX_SAFE_INTEGER)
//     }

//     latestTime = () => {
//         return this.state.reduce((acc: number, m: PointModel) => {
//             return Math.max(acc, m.get().time())
//         }, 0)
//     }

//     add = (batch: IPointData[]) => {
//         const keep: PointModel[] = []
//         for (const tick of batch){
//             if (!this.get(tick.time)){
//                 const u = new PointModel(tick)
//                 keep.push(u)
//                 this._map.set(tick.time, u)
//             }
//         }
//         if (keep.length == 0){
//             return
//         }
//         this.state = [...keep, ...this.state]
//     }
// }