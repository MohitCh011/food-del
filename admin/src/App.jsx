import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css' // Importing the CSS file

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <hr />
      
      <div className="main-content">
        <Sidebar />
        
        <div className="content-area">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>

          <div className="app-content">
            <div className="parent">
              <div className="div4">4</div>
              <div className="div5">5</div>
              <div className="div6">6</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
