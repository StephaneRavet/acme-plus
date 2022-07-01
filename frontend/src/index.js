import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ContextProvider } from './context'

// configure axios
import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
// auto redirect to /login if backend response is 401
axios.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    window.location.assign('/login')
  } else {
    return Promise.reject(error);
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
