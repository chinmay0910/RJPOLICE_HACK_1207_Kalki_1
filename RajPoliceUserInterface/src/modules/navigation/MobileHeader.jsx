import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import logo from '../../assets/rajPoliceLogo.jpg';
import { Link } from "react-router-dom";

const MobileHeader = () => {
    return (
        <div className="bg-white p-4 flex flex-row text-center z-10 w-full fixed top-0 rounded-b-md lg:w-[90%]" style={{boxShadow:"0 1px 8px white"}}>
            {/* style={{boxShadow:"0 1px 20px white"}} */}
            <div className="text-3xl font-medium"><img className="w-48 h-16 md:hidden" src={logo} alt="" /></div>
            <div className="grid grid-cols-2  ms-auto  lg:me-16 w-1/4">
                <Link to='/message' className="text-right">
                    <ChatIcon className="mobIcons "/>
                </Link>
                <Link to='/createpost' className="">
                    <AddCircleOutlineIcon className="mobIcons "/>
                </Link>

            </div>
        </div>
    )
}

export default MobileHeader;