import React, { useEffect, useState } from "react";
import Timeline from './modules/timeline/Timeline'
import Search from './modules/Feedback/Search';
import Rate from './modules/Feedback/Rate';
import Sidenav from './modules/navigation/Sidenav';
import MobileFooter from './modules/navigation/MobileFooter'
import MobileHeader from './modules/navigation/MobileHeader'
import './Homepage.css'
import Complaint from "./modules/Feedback/Complaint";
import AIBot from './modules/aibot/AIBot';
import { CreatePost } from "./modules/timeline/createpost/CreatePost";
import { ViewComplaints } from './modules/Feedback/ViewComplaints';
import { UpdateStatus } from "./modules/Feedback/UpdateStatus";

import LoadingBar from 'react-top-loading-bar'
import './App.css';
import Feed from "./modules/timeline/Feed";

import {
  Route,
  Routes,
  useNavigate, 
  useParams 
} from "react-router-dom";


const App = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()
  useEffect(() => {
    const isUserLogin = localStorage.getItem('token')
    if (!isUserLogin) {
      navigate('/account/signin')
    }

  }, [])


  return (
    <>
      <div className="homepage" style={{ opacity: "1" }}>
        <div className="homepage__navWraper">
          <Sidenav />
        </div>
        <div className="footer__navWraper">
          <MobileHeader />
          <MobileFooter />
        </div>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />

        <div className="homepage__timeline mx-auto">
          <Routes>
            <Route exact path="/" element={<Timeline setProgress={setProgress} />} />
            <Route exact path="/search" element={<Search />} />
            <Route path='/createpost' element={<CreatePost setProgress={setProgress} />} />
            <Route path='/feed' element={<Feed />} />
            <Route exact path="/system/rate/:id" element={<Rate />} />
            <Route exact path="/system/Complaint/:id" element={<Complaint />} />
            <Route exact path="/talkto/ai" element={<AIBot />} />
            <Route exact path="/message" element={<ViewComplaints />} />
            <Route exact path='/update/status/:id' element={<UpdateStatus />} />
            {id && <Route exact path={`/update/status/${id}`} element={<UpdateStatus />} />}
          </Routes>
        </div>
      </div>


    </>

  );
}

export default App;
