import React, { useEffect } from 'react'


// Component Imports
import { TopNavigation, SideNav, RegisterPage, Update, UpdateStatus, CreatePost, AddStaff } from './index'
import './Home.css'

// React-Router Imports
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'


export const Home = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        const isUserLogin = localStorage.getItem('token')
        if (!isUserLogin) {
            navigate('/account/signin')
        }

    }, [])

    return (
        <>
            <div className="h-screen w-full">
                <TopNavigation />
                <div className="flex flex-row h-full mt-1">
                    <div className="left_Home w-[12%] lg:w-[20%] bg-white rounded-none z-0">
                        <SideNav />
                    </div>
                    <div className="right_Home lg:w-[80%]">
                        <Routes>
                            <Route exact path='/' element={<iframe src="https://charts.mongodb.com/charts-rajpolicefeedsystem-glrwf/public/dashboards/659fc7a7-b2eb-4716-80e3-740f996b271a" width="100%" height="800"></iframe>} />
                            <Route exact path='/addstaff' element={<AddStaff />} />
                            <Route exact path='/register' element={<RegisterPage />} />
                            <Route exact path='/update' element={<Update />} />
                            <Route exact path='/update/status/:id' element={<UpdateStatus />} />
                            {id && <Route exact path={`/update/status/${id}`} element={<UpdateStatus />} />}
                            <Route exact path='/createpost' element={<CreatePost />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}
