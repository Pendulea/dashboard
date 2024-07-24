import { useAcey } from "react-acey"
import { Header } from "../../containers/header"
import appStatus from "../../models/status"
import NoScrollWrapper from "../../components/no-scroll-container"
import Footer from "../../containers/footer"
import DropdownAlert from "../../components/dropdown-alert"
import { useRef, useState } from "react"
import sets, { SetModel } from "../../models/set"
import _ from "lodash"
import SetCell from "./set-cell"
import AddAssetModal from "./add-asset-modal"
import AddSetModal from "./add-set-modal"
import BuildCSVModal from "./build-csv-modal"
import ChartModal from "../charts/chart-modal"


const SetList = (props: {onClickAddAsset: (setID: string)=> void}) => {

  useAcey([
    sets
  ] as any)

  const [selectedTimeframe, setSelectedTimeframe] = useState(Object.assign({}, ...sets.map((set: SetModel) => {
      return {[set.get().settings().get().idString()]: set.get().availableTimeframes()[0]}
  })))

  const onSelectTimeframe = (set: SetModel, timeframe: number) => {
    const cpy = _.cloneDeep(selectedTimeframe)
    cpy[set.get().settings().get().idString()] = timeframe
    setSelectedTimeframe(cpy)
}

  return (
    <div>
        {sets.orderByRank().map((set: SetModel) => {
          const setID = set.get().settings().get().idString()
          const timeframe = selectedTimeframe[setID]
          return <div style={{width: '100%'}} key={'set' + setID}>
              <SetCell 
                  set={set}
                  onSelectTimeframe={(timeframe: number) => onSelectTimeframe(set, timeframe)}
                  timeframe={timeframe}
                  onOpenAddAssetModal={() => props.onClickAddAsset(setID)}
              />
          </div>
      })}
    </div>
  )
}

const Index = () => {

    const dropdownRef = useRef<DropdownAlert>(null);

    const [addAssetModal, setAddAssetModal] = useState<string|null>(null)
    const [addSetModal, setAddSetModal] = useState<boolean>(false)
    const [showBuildCSVModal, setShowBuildCSVModal] = useState<boolean>(false)
    const [showChartModal, setShowChartModal] = useState<boolean>(false)

    return (
        <NoScrollWrapper lock={false} style={{width: '100%'}}>
          <div>
            <Header onClick={(menu) => {
              menu === 'add-pair' && setAddSetModal(true)
              menu === 'build-csv' && setShowBuildCSVModal(true)
              menu === 'view-chart' && setShowChartModal(true)
            }} />
            <SetList 
              onClickAddAsset={(setID) => setAddAssetModal(setID)}
            />
              <div style={{height: 35}}/>
              <Footer />
          </div>

          <AddAssetModal 
            set={addAssetModal ? sets.findByID(addAssetModal) : undefined}
            onClose={() => setAddAssetModal(null)}
            dropdownRef={dropdownRef}
          />
          <AddSetModal 
            onClose={() => setAddSetModal(false)}
            show={addSetModal}
            dropdownRef={dropdownRef}
          />
          <BuildCSVModal 
            show={showBuildCSVModal}
            onClose={() => setShowBuildCSVModal(false)}
            dropdownRef={dropdownRef}
          />
          <ChartModal 
            show={showChartModal}
            onClose={() => setShowChartModal(false)}
            dropdownRef={dropdownRef}
          />
          <DropdownAlert ref={dropdownRef}/> 
      </NoScrollWrapper>
    )

}



export default Index