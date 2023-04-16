import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="https://media.licdn.com/dms/image/C5603AQFRL2cfFgWIwQ/profile-displayphoto-shrink_400_400/0/1611950572140?e=1687392000&v=beta&t=mK1CIuWLfDYbaCu1bbZoJyLqnHYAeTgq8ZoLDyJkxpo" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src="https://media.licdn.com/dms/image/C5603AQEITZd4bcTIgg/profile-displayphoto-shrink_400_400/0/1661297854195?e=1687392000&v=beta&t=u74MHB-D-SPVHryzoQupAhwxs5nV3Xw3A4vyEbjI1xw" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>KANM Dashboard</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
