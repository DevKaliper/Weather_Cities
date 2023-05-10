import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {CssBaseline} from '@mui/material'
// importa snackprovider 
import { SnackbarProvider } from 'notistack';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Agrega el provider */}
    <SnackbarProvider maxSnack={3}>
    <CssBaseline />


    <App />
    </SnackbarProvider>
  </React.StrictMode>,
)
