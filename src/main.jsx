import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookContextProvider } from './context/bookContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookContextProvider>
      <App />
    </BookContextProvider>
  </StrictMode>,
)
