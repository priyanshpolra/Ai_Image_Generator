import { createRoot } from 'react-dom/client'
import './App.css'
import {App} from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './contexts/AppContext.jsx'


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>

)
