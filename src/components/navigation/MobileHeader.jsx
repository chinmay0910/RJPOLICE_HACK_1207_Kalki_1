import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import logo from '../../assets/FinalLOGO.png';

const MobileHeader = () => {
    return (
        <div className="bg-black p-4 flex flex-row text-center z-10 w-full fixed top-0 rounded-b-lg" style={{boxShadow:"0 1px 8px white"}}>
            {/* style={{boxShadow:"0 1px 20px white"}} */}
            <div className="text-3xl font-medium"><img className="w-48 h-8" src={logo} alt="" /></div>
            <div className="flex flex-row ms-auto w-1/4">
                <button className="w-1/2">
                    <ChatIcon className="mobIcons"/>
                </button>
                <button className="w-1/2">
                    <AddCircleOutlineIcon className="mobIcons"/>
                </button>

            </div>
        </div>
    )
}

export default MobileHeader;