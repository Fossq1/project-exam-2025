import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { VenueProvider } from './contexts/VenueContext.tsx'
import { FinanceProvider } from './contexts/FinanceContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FinanceProvider>
    <VenueProvider>
      <App/>
    </VenueProvider>
    </FinanceProvider>
  </StrictMode>,
)
