import React from 'react'


// Component Imports
import { TopNavigation, SideNav, RegisterPage, Update, UpdateStatus, CreatePost, Insights } from './index'
import './Home.css'

// React-Router Imports
import { Routes, Route } from 'react-router-dom'


export const Home = () => {
    return (
        <div className="h-screen w-full">
            <TopNavigation />
            <div className="flex flex-row h-full mt-1">
                <div className="left_Home lg:w-[20%] bg-white rounded-none z-0">
                    <SideNav />
                </div>
                <div className="right_Home lg:w-[80%]">
                    <Routes>
                        <Route exact path='/' element={<iframe src="https://charts.mongodb.com/charts-rajpolicefeedsystem-glrwf/public/dashboards/659fc7a7-b2eb-4716-80e3-740f996b271a" width="100%" height="800"></iframe>}/>
                        <Route exact path='/addStation' element={<RegisterPage/>}/>
                        <Route exact path='/complaints' element={<Update/>}/>
                        <Route exact path='/complaint/view' element={<UpdateStatus/>}/>
                        <Route exact path='/createpost' element={<CreatePost/>}/>
                        <Route exact path='/Stations' element={<iframe src="https://charts.mongodb.com/charts-rajpolicefeedsystem-glrwf/public/dashboards/caaf58a7-760e-4ec0-b39d-e05d6251249b" width="100%" height="800"></iframe>}/>
                        {/* <Route exact path='/Stations' element={<Insights/>}/> */}

                    </Routes>
                </div>

            </div>
        </div>
    )
}
