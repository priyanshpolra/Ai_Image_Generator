import React from 'react'
import {Routes, Route } from 'react-router-dom'

import './App.css' 
import { Home } from './pages/Home.jsx'
import Result  from './pages/Result.jsx'
import BuyCredit from './pages/BuyCredit.jsx'
import  Footer  from './components/Footer.jsx'

export const App = () => {
    return (
        <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-br from-teal-200 to-orange-200'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/result' element={<Result />} />
                    <Route path='/buy' element={<BuyCredit />} />
                </Routes>
                <Footer />
        </div>
    )
}