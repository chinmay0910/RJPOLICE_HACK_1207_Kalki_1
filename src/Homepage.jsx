import React, { useState } from "react";
import Homepage from './homepage';
import Timeline from './components/timeline/Timeline'
import SignUp from './components/signup/SignUp';
import SignIn from "./components/signup/Signin";
import Search from './components/Feedback/Search';
import Rate from './components/Feedback/Rate';
import Sidenav from './components/navigation/Sidenav';
import MobileFooter from './components/navigation/MobileFooter'
import MobileHeader from './components/navigation/MobileHeader'
import './Homepage.css'
import Complaint from "./components/Feedback/Complaint";
import AIBot from './components/aibot/AIBot'
import LoadingBar from 'react-top-loading-bar'
import './App.css';


import {
  Route,
  Routes,
  BrowserRouter,
  useParams,
} from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0)
  return (
    <>
    <div className="homepage" style={{opacity: "1"}}>
      <div className="homepage__navWraper">
        <Sidenav />
      </div>
      <div className="footer__navWraper">
          <MobileHeader/>
          <MobileFooter/>
        {/* Include MobileHeader and MobileFooter here if they are meant to be on every page */}
      </div>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />

      <div className="homepage__timeline mx-auto">
        <Routes>
          <Route path="/" element={ <Timeline setProgress={setProgress}/>   } />
          <Route path="/search" element={<Search />} />
          <Route path="/system/rate/:id" element={<Rate />} />
          <Route path="/system/Complaint/:id" element={<Complaint />} />
          <Route path="/talkto/ai" element={<AIBot />} />
        </Routes>
      </div>
      </div>
      <div className="absolute-routes">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      
    </>

  );
}

export default App;
