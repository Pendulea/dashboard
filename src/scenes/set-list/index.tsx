import { useAcey } from "react-acey"
import { Header } from "../../containers/header"
import NoScrollWrapper from "../../components/no-scroll-container"
import Footer from "../../containers/footer"
import DropdownAlert from "../../components/dropdown-alert"
import { useMemo, useRef, useState } from "react"
import sets, { SetModel } from "../../models/set"
import _ from "lodash"
import SetCell from "./set-cell/index"
import AddAssetModal from "./add-asset-modal"
import AddSetModal from "./add-set-modal/index"
import BuildCSVModal from "./build-csv-modal"
import ChartModal from "../charts/chart-modal"


const SetList = (props: {
  onClickAddAsset: (setID: string)=> void
  dropdownRef: React.RefObject<DropdownAlert>
}) => {

  useAcey([
    sets
  ] as any)

  return (
    <div>
        {sets.orderByRank().map((set: SetModel) => {
          const setID = set.get().settings().get().idString()
          return <div style={{width: '100%'}} key={'set' + setID}>
              <SetCell 
                  set={set}
                  dropdownRef={props.dropdownRef}
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
              dropdownRef={dropdownRef}
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