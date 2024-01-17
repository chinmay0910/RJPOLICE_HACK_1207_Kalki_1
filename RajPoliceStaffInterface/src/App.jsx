import { useEffect, useState } from 'react'
import './App.css'
import { Signin, Home, Alert } from './modules/index'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import UserState from './context/UserState';
import ComplaintState from './context/ComplaintState';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <UserState >
      <ComplaintState>
        <Router>
          <Routes>
            <Route path='/account/signin' element={<Signin showAlert={showAlert} />}></Route>
            <Route path='/*' element={<Home />}></Route>
          </Routes>
        </Router>
      </ComplaintState>
    </UserState>
  )
}

export default App
