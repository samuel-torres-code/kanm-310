import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import bootstrap from 'bootstrap'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ShowSchedule from './pages/ShowSchedule'
import UserManager from './pages/UserManager'
import Header from './components/Header'
import UserHeader from './components/UserHeader'
import Shows from './pages/Shows'


function App() {

  return (
    <div className="App">
      <Header/>
      <div style={{margin: "20px"}}>
      <Routes>
        <Route path="/" element={ <p>Im like hey whats up hello</p> } />
        <Route path="userschedule" element={ <ShowSchedule/> } />
        <Route path="schedule" element={ <ShowSchedule/> } />
        <Route path="users" element={ <UserManager/> } />
        <Route path="shows/:id" element={ <Shows/> } />
      </Routes>
      </div>
    </div>
  )
}

export default App
