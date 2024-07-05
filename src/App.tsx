import { useEffect, useRef, useState } from "react"
import appStatus from "./models/status"
import { Route, Routes } from "react-router-dom"
import DropdownAlert from "./components/dropdown-alert";
import { showAlertMessage } from "./constants/msg";
import sets from "./models/set";

import SetListScene from "./scenes/set-list";
import ressources from "./models/ressources";

interface IProps {
  children: React.ReactNode
}



const Wrapper = (props: IProps) => {

  const dropdownRef = useRef<DropdownAlert>(null);
  const [show, setShow] = useState(false)
  const intervalSets = useRef(null as any);
  const intervalStatus = useRef(null as any);
  const isInitialized = useRef(false);

  const fetchAppStatuses = async () => {
    const err = await appStatus.refresh()
    if (err){
      showAlertMessage(dropdownRef).error(err)
    }
    return err
  }

  const fetchSets = async () => {
    const err = await sets.refresh()
    if (err){
      showAlertMessage(dropdownRef).error(err)
    }
    return err
  }

  const runInterval = () => {
    intervalSets.current = setInterval(fetchSets, 7_000)
    intervalStatus.current =  setInterval(fetchAppStatuses, 1_500)
  }

  useEffect(() => {
    if (isInitialized.current) 
      return;
    isInitialized.current = true;
    
    if (sets.count() === 0){
      ressources.refresh().then((err) => {
        if (!err){
          fetchSets().then((err) => {
            if (!err){
              fetchAppStatuses()
              setShow(true)
              runInterval()
            }
          })
        }
      })
    } else {
      setShow(true)
      runInterval()
    }
    
    return () => {
      clearInterval(intervalSets.current)
      clearInterval(intervalStatus.current)
    }
  }, [])


  return (
    <div style={{backgroundColor: '#111111', minHeight: window.innerHeight}}>
      {show && props.children}
      {!show && <div style={{color: 'white'}}>Loading...</div>}
      <DropdownAlert ref={dropdownRef} />
    </div>
  )
}
function App() {
  return (
    <Routes>
       <Route path='/' element={<Wrapper><SetListScene /></Wrapper>} />
       <Route path='/chart' element={<Wrapper><div /></Wrapper>} />
     </Routes>
  )
}
export default App
