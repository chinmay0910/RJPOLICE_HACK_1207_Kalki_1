import React, { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {

    const [user, setUser] = useState(true)

    const getUser = async () => {
        // API call
        const response = await fetch('http://localhost:5001/api/auth/getuser', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        setUser(json)
        // console.log(user);

    }
    

    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;