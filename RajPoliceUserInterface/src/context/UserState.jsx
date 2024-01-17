import React, { useState } from "react";
import UserContext from './UserContext'

export const UserState = (props) => {

    const [User, setUser] = useState({});

    // Get User Info from anywhere
    const getUserInfo = async () => {
        // API call
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        
        setUser(json)
    }


    return (
        <UserContext.Provider value={{User, setUser, getUserInfo}}>
            {props.children}
        </UserContext.Provider>
    )
}