import React, { useState } from "react";
import './Home.css'

// React Router imports
import { NavLink } from "react-router-dom";

// Tabler Icons
import { IconHome, IconCalendarTime, IconSettings, Icon24Hours, IconFileDescription, IconCirclePlus } from '@tabler/icons-react';


export const SideNav = () => {
    const [isIncharge, setIsIncharge] = useState(true)

    return (
        <div className="sidenav_buttons mt-8 fixed w-[20%]">
            <NavLink to='/' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <IconHome className='mx-8' /><h1> Home</h1>
            </NavLink>
            {
                isIncharge ?
                    <NavLink to='/Stations' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                        <IconCirclePlus className='mx-8' /><h1>Station Insights </h1>
                    </NavLink>
                    :
                    ""
            }
            <NavLink to='/addStation' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <IconCalendarTime className='mx-8' /><h1>Add Police Station</h1>
            </NavLink>
            <NavLink to='/complaints' role='button' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <Icon24Hours className='mx-8' /> <h1>View Complaints</h1>
            </NavLink>
            {/* <NavLink to='/createpost' role='button' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <IconFileDescription className='mx-8' /> <h1>Daily Anouncements</h1>
            </NavLink> */}
            <NavLink to='settings' role='button' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <IconSettings className='mx-8 ' /> <h1>Settings</h1>
            </NavLink>
        </div>
    )

}