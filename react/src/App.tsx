import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import bootstrap from 'bootstrap'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ShowSchedule from './pages/ShowSchedule'
import UserManager from './pages/UserManager'
import Header from './components/Header'


function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={ <p>Im like hey whats up hello</p> } />
        <Route path="schedule" element={ <ShowSchedule/> } />
        <Route path="users" element={ <UserManager/> } />
      </Routes>
      
    </div>
  )
}

export default App
