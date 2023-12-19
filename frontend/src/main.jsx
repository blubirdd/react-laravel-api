import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '../node_modules/preline/dist/preline.js'
import {ContextProvider} from './context/ContextProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
