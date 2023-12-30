import { useState } from 'react'
import './App.css'
import Homepage from './homepage'
import {BrowserRouter} from "react-router-dom";
// import SignUp from './components/signup/SignUp'
// import SignIn from "./components/signup/Signin";
// import Search from './components/Feedback/Search'
// import Sidenav from './components/navigation/Sidenav';
// import MobileHeader from './components/navigation/MobileHeader';
// import MobileFooter from './components/navigation/MobileFooter';
// import Rate from './components/Feedback/Rate';


import {
  Link,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Homepage/>
      </BrowserRouter>

    </>
  )
}

export default App;
