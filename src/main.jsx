import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalProvider } from './contexts/GlobalContext.jsx'
import { ApiProvider } from './contexts/ApiContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
    <GlobalProvider>
      <ApiProvider>

        <App />
      </ApiProvider>
    </GlobalProvider>,
  {/* </React.StrictMode> */}
)
