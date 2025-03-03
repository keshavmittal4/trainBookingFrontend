import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SeatBooking from './components/SeatBooking.jsx'
import LoginForm from './components/LoginForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <SeatBooking /> */}
    <LoginForm />
  </StrictMode>,
)
