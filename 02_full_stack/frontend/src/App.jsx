import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [jokes,setJOkes] = useState([]);

  return (
    <>
      <h1>Govind Kr Yadav</h1>
      <p>JOKES : {(jokes.length)}</p>

      {
        jokes.map((joke,index) => {
          <div key= {joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        })
      }
    </>
  )
}

export default App
