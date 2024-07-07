import { useAcey } from "react-acey"
import { Header } from "../../containers/header"
import appStatus from "../../models/status"
import NoScrollWrapper from "../../components/no-scroll-container"
import Footer from "../../containers/footer"
import DropdownAlert from "../../components/dropdown-alert"
import { useRef, useState } from "react"
import sets, { SetCollection, SetModel } from "../../models/set"
import _ from "lodash"
import SetCell from "./set-cell"
import AddAssetModal from "./add-asset-modal"
import AddSetModal from "./add-set-modal"
import BuildCSVModal from "./build-csv-modal"


const Index = () => {

    const dropdownRef = useRef<DropdownAlert>(null);

    const [selectedTimeframe, setSelectedTimeframe] = useState(Object.assign({}, ...sets.map((set: SetModel) => {
        return {[set.get().settings().get().idString()]: set.get().availableTimeframes()[0]}
    })))

    const [addAssetModal, setAddAssetModal] = useState<string|null>(null)
    const [addSetModal, setAddSetModal] = useState<boolean>(false)
    const [showBuildCSVModal, setShowBuildCSVModal] = useState<boolean>(false)

    useAcey([
        appStatus,
        sets
    ] as any)

    const onSelectTimeframe = (set: SetModel, timeframe: number) => {
        const cpy = _.cloneDeep(selectedTimeframe)
        cpy[set.get().settings().get().idString()] = timeframe
        setSelectedTimeframe(cpy)
    }


    return (
        <NoScrollWrapper lock={false} style={{width: '100%'}}>
          <div>
            <Header status={appStatus} onClick={(menu) => {
              menu === 'add-pair' && setAddSetModal(true)
              menu === 'build-csv' && setShowBuildCSVModal(true)
            }} />
            {sets.map((set: SetModel) => {
                const setID = set.get().settings().get().idString()
                const timeframe = selectedTimeframe[setID]
                return <div style={{width: '100%'}} key={set.get().size()}>
                    <SetCell 
                        set={set}
                        onSelectTimeframe={(timeframe: number) => onSelectTimeframe(set, timeframe)}
                        timeframe={timeframe}
                        onOpenAddAssetModal={() => setAddAssetModal(setID)}
                    />
                </div>
            })}
              <div style={{height: 35}}/>
              <Footer status={appStatus}/>
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
          {/* <AddPairModal
            show={showAddPairModal}
            onClose={() => setShowAddPairModal(false)}
            onSubmit={addPair}
          />
          {selectedSet && <BuildCSVModal 
            appStatus={appStatus}
            set={selectedSet}
            show={true}
            onClose={() => setSelectedSet(null)}
            dropdownRef={dropdownRef}
            onClick={onBuildCSV}
          />} */}
          <DropdownAlert ref={dropdownRef}/> 
      </NoScrollWrapper>
    )

}



export default Index