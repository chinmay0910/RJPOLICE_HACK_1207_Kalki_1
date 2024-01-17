import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from './routes/Routes';
import { PostState } from './context/PostState';
import { UserState } from './context/UserState';
// import { ViewComplaints } from './modules/Feedback/ViewComplaints';

function App() {

  return (
    <>
      <UserState>
        <PostState>
          <BrowserRouter>
            <AppRoutes />
            {/* <ViewComplaints/>  */}
          </BrowserRouter>
        </PostState>
      </UserState>
    </>
  )
}

export default App;
