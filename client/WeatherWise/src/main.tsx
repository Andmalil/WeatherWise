import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/pages/index.scss'
import { App } from './App.tsx'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
