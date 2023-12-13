import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from'./pages/NotFount'
import ForgotPassword from './components/ForgotPassword'

function App() {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<Login />}
            />
            <Route path='forgot-password' element={<ForgotPassword/>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
  
  ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />);