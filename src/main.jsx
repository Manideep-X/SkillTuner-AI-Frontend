import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { AnalysisListReloadProvider } from './contexts/AnalysisListReloadContext.jsx'
import { HomeListReloadProvider } from './contexts/HomeListReloadContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AnalysisListReloadProvider>
          <HomeListReloadProvider>
            <App />
          </HomeListReloadProvider>
        </AnalysisListReloadProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
