import React, { useState } from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";



function Sidenav() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [user, setUser] = useState("chinmay")
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const route = `${option}`
    navigate(route);
    setShowDropdown(false);
  }


  return (
    <div className="sidenav">
      <img
        className="sidenav__logo mb-5 pb-5"
        src="..\..\src\assets\FinalLOGO.png"
        alt="Logo"
      />

      <div className="sidenav__buttons">
        <Link className="sidenav__button" to="/">
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link className="sidenav__button" to="/search">
          <SearchIcon />
          <span>Search</span>
        </Link>
        <Link className="sidenav__button" to={"/talkto/ai"}>
        <svg className="h-6 text-black w-6"  viewBox="0 0 26 26" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M23.3125 12.6875H23.1375C22.4188 9.475 19.55 7.0625 16.125 7.0625H13.9375V6.2625C15.025 5.875 15.8125 4.84375 15.8125 3.625C15.8125 2.075 14.55 0.812497 13 0.812497C11.45 0.812497 10.1875 2.075 10.1875 3.625C10.1875 4.84375 10.975 5.875 12.0625 6.2625V7.0625H9.875C6.45 7.0625 3.58125 9.475 2.8625 12.6875H2.6875C1.65625 12.6875 0.8125 13.5312 0.8125 14.5625V16.4375C0.8125 17.4687 1.65625 18.3125 2.6875 18.3125H3.03125C3.76875 20.6125 5.63125 22.4 7.96875 23.05C7.79375 23.4187 7.6875 23.8187 7.6875 24.25C7.6875 24.7687 8.10625 25.1875 8.625 25.1875H17.375C17.8938 25.1875 18.3125 24.7687 18.3125 24.25C18.3125 23.8187 18.2063 23.4125 18.0313 23.05C20.3688 22.4062 22.2313 20.6125 22.9688 18.3125H23.3125C24.3438 18.3125 25.1875 17.4687 25.1875 16.4375V14.5625C25.1875 13.5312 24.3438 12.6875 23.3125 12.6875ZM13 2.6875C13.5188 2.6875 13.9375 3.10625 13.9375 3.625C13.9375 4.14375 13.5188 4.5625 13 4.5625C12.4813 4.5625 12.0625 4.14375 12.0625 3.625C12.0625 3.10625 12.4813 2.6875 13 2.6875ZM16.125 21.4375H9.875C6.94375 21.4375 4.5625 19.0562 4.5625 16.125V14.25C4.5625 11.3187 6.94375 8.9375 9.875 8.9375H16.125C19.0563 8.9375 21.4375 11.3187 21.4375 14.25V16.125C21.4375 19.0562 19.0563 21.4375 16.125 21.4375Z" fill="white"/><path d="M9.5625 11.4375C8.53125 11.4375 7.6875 12.2812 7.6875 13.3125V15.1875C7.6875 16.2187 8.53125 17.0625 9.5625 17.0625C10.5938 17.0625 11.4375 16.2187 11.4375 15.1875V13.3125C11.4375 12.2812 10.5938 11.4375 9.5625 11.4375Z" fill="white"/></svg>
          <span>AI Assitance</span>
        </Link>
        <Link className="sidenav__button" to="/search">
          <ExploreIcon />
          <span className="">Feedback</span>
        </Link>
        <button className="sidenav__button">
          <ChatIcon />
          <span>Messages</span>
        </button>
        <button className="sidenav__button">
          <AddCircleOutlineIcon />
          <span>QR Feedback</span>
        </button>
        <button className="sidenav__button m-0">
          <Avatar className="scale-75">
            {user ? user.charAt(0).toUpperCase() : "A"}
          </Avatar> <p className="ms-2 inline">{user}</p>
          <span>
            {/* {user.username}{" "}
            <button onClick={handelLogout} className="logout__button">
              Logout
            </button> */}
          </span>
        </button>
      </div>
      <div className="sidenav__more dropdown-container">
        <button className="sidenav__button dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
          <MenuIcon />
          <span className="sidenav__buttonText">More</span>
        </button>
        {showDropdown && (
          <div className="dropdown-options absolute bottom-12 left-24 bg-gray-900 text-center">
            <button className="w-24 border rounded hover:bg-gray-600" onClick={() => handleOptionSelect('/signup')}>New SignUp</button>
            <button className="w-24 border rounded hover:bg-gray-600" onClick={() => handleOptionSelect('/signin')}>New SignIn</button>
            <button className="w-24 border rounded hover:bg-gray-600" onClick={() => handleOptionSelect('Option 3')}>Logout</button>
            {/* Add more options as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidenav;