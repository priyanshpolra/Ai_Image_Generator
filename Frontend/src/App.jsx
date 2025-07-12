import React from 'react'
import {Routes, Route } from 'react-router-dom'

import './App.css' 
import { Home } from './pages/Home.jsx'
import Result  from './pages/Result.jsx'
import BuyCredit from './pages/BuyCredit.jsx'
import  Footer  from './components/Footer.jsx'
import Login from './components/Login.jsx'
import { useContext } from 'react'
import { AppContext } from './contexts/AppContext.jsx'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar.jsx'

export const App = () => {
    const{showLogin} = useContext(AppContext)
    return (
        <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-br from-teal-200 to-orange-200'>
                <ToastContainer/>
                <Navbar/>
                {showLogin && <Login/>}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/result' element={<Result />} />
                    <Route path='/buy' element={<BuyCredit />} />
                </Routes>
                <Footer />
        </div>
    )
}