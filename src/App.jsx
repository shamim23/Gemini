import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import './App.css'
import Main from './components/Main/Main'
import runChat from './config/gemini'

function App() {
  const [count, setCount] = useState(0);


  return (
    <>
     <Sidebar/>
     <Main/>
    </>
  )
}

export default App
