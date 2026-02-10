import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import AuthRoute from './AuthRoute'
// import '../assets/App.css'

function App() {
  return (
    <>
      <div className="font-main">
        <Routes>
          {/*<Route path="/" element={<AuthLayout />} />*/}
          <Route path="/*" element={ <AuthRoute /> } />
          <Route path="/play-test" element={ <MainLayout /> } ></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
