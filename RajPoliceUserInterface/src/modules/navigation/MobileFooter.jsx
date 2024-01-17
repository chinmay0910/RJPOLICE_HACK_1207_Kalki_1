import React from "react";
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import { Avatar } from "@mui/material";
import "./MobileFooter.css"
import { Link } from "react-router-dom";

const MobileFooter = () => {
   return(
    <div className="bg-white p-4 flex flex-row text-center z-10 w-full fixed bottom-0 rounded-t-lg" style={{boxShadow:"0 -1px 20px white"}}>
        <Link to='/' className="sidenav__button flex flex-row justify-center w-1/5">
          <HomeIcon className="mobIcons"/>
        </Link>
        <Link to='/search' className="sidenav__button flex flex-row justify-center w-1/5">
          <SearchIcon className="mobIcons"/>
        </Link>
        <Link to='/talkto/ai' className="sidenav__button flex flex-row justify-center w-1/5">
            <svg className="h-12 text-black w-12"  viewBox="0 0 26 26" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.3125 12.6875H23.1375C22.4188 9.475 19.55 7.0625 16.125 7.0625H13.9375V6.2625C15.025 5.875 15.8125 4.84375 15.8125 3.625C15.8125 2.075 14.55 0.812497 13 0.812497C11.45 0.812497 10.1875 2.075 10.1875 3.625C10.1875 4.84375 10.975 5.875 12.0625 6.2625V7.0625H9.875C6.45 7.0625 3.58125 9.475 2.8625 12.6875H2.6875C1.65625 12.6875 0.8125 13.5312 0.8125 14.5625V16.4375C0.8125 17.4687 1.65625 18.3125 2.6875 18.3125H3.03125C3.76875 20.6125 5.63125 22.4 7.96875 23.05C7.79375 23.4187 7.6875 23.8187 7.6875 24.25C7.6875 24.7687 8.10625 25.1875 8.625 25.1875H17.375C17.8938 25.1875 18.3125 24.7687 18.3125 24.25C18.3125 23.8187 18.2063 23.4125 18.0313 23.05C20.3688 22.4062 22.2313 20.6125 22.9688 18.3125H23.3125C24.3438 18.3125 25.1875 17.4687 25.1875 16.4375V14.5625C25.1875 13.5312 24.3438 12.6875 23.3125 12.6875ZM13 2.6875C13.5188 2.6875 13.9375 3.10625 13.9375 3.625C13.9375 4.14375 13.5188 4.5625 13 4.5625C12.4813 4.5625 12.0625 4.14375 12.0625 3.625C12.0625 3.10625 12.4813 2.6875 13 2.6875ZM16.125 21.4375H9.875C6.94375 21.4375 4.5625 19.0562 4.5625 16.125V14.25C4.5625 11.3187 6.94375 8.9375 9.875 8.9375H16.125C19.0563 8.9375 21.4375 11.3187 21.4375 14.25V16.125C21.4375 19.0562 19.0563 21.4375 16.125 21.4375Z" fill="black"/>
              <path d="M9.5625 11.4375C8.53125 11.4375 7.6875 12.2812 7.6875 13.3125V15.1875C7.6875 16.2187 8.53125 17.0625 9.5625 17.0625C10.5938 17.0625 11.4375 16.2187 11.4375 15.1875V13.3125C11.4375 12.2812 10.5938 11.4375 9.5625 11.4375Z" fill="black"/></svg>
        </Link>
        <Link to='/search' className="sidenav__button flex flex-row justify-center w-1/5">
          <ExploreIcon className="mobIcons"/>
        </Link>
        <Link className="sidenav__button flex flex-row justify-center w-1/5" >
            <Avatar style={{transform: "scale(1.5)"}}>R</Avatar>
        </Link>
         
    </div>
   )
}


export default MobileFooter;