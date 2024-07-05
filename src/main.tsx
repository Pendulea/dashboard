
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { config } from 'acey'

import { BrowserRouter } from "react-router-dom";

config.done().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )  
})