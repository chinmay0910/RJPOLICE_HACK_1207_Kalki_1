import { useEffect, useState } from 'react'
import './App.css'
import { Signin, Home } from './modules/index'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";



function App() {
  const [IsSignin, setIsSignin] = useState(false);

  useEffect(()=>{
    
    setIsSignin(window.location.href.includes('signin'))
  },[])


  return (
    <Router>
      {
        IsSignin ?
          <Routes>
            <Route path='/account/signin' element={<Signin />}></Route>
          </Routes>
          :
          <Home />

      }
    </Router>
  )
}

export default App
