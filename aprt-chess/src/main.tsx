import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BoardProvider } from './contexts/BoardContext'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <BoardProvider>
    <App />
    </BoardProvider>
  </React.StrictMode>
)
