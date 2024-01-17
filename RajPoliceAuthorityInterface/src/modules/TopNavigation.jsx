import React from 'react'
import BrandLogo from '../assets/Rajasthan_Police_Logo.png'
import Admin from '../assets/Admin.png'
import NotificationIcon from '../assets/Notification.svg'

export const TopNavigation = () => {
    return (
        <div className="flex flex-row bg-white shadow-lg shadow-gray-500/50 p-2 justify-between z-10 sticky top-0">
            <div className="flex flex-row">
                <img className="w-[50px] h-[50px] mx-4 my-2" src={BrandLogo} alt="Logo" />
                <h1 className="font-bold text-2xl p-4">RajPolice DashBoard</h1>
            </div>
            <div className="flex flex-row items-center justify-center">
                <img src={NotificationIcon} alt="icon" />
                <h1 className='px-4'>Admin</h1>
                <img className="w-[50px] h-[50px]" src={Admin} alt="admin" />
            </div>
        </div>
    )
}
