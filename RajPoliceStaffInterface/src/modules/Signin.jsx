import React, { useState } from "react";
import BrandLogo from '../assets/Rajasthan_Police_Logo.png'
import LeftSideLogo from '../assets/logoRajPolice1.png'
import star from '../assets/star.svg'
import { Link, useNavigate } from "react-router-dom";


export const Signin = (props) => {

    const navigate = useNavigate()
   
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: "POST",  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password, role: credentials.role }),
          });
          const json = await response.json();
        //   console.log(json.success);

          if(json.success){
            // redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully", "success")
        } 
          else{
            props.showAlert("Invalid Credentials", "danger")
          }
    };

    return (
        <>

        <div className="h-screen w-full z-40">
            
            <div className="flex flex-row">
                <img className="w-[50px] h-[50px] mx-4 my-2" src={BrandLogo} alt="Logo" />
                <h1 className="font-bold text-2xl p-4">RajPolice DashBoard</h1>
            </div>
            <div className="flex flex-row h-[90%]">
                <div className="w-1/2 flex flex-row items-center justify-center">

                    <img className="w-3/5 mix-blend-normal" src={LeftSideLogo} alt="RajasthanPolice Signin_Logo" />
                </div>
                <div className="w-1/2 flex flex-col h-[100%]">
                    <div className="flex flex-row py-12 pb-8">
                        <img className="me-4" src={star} alt="" />
                        <h1 className="text-xl font-semibold">Rajasthan Police DashBoard</h1>
                    </div>
                    <form className="flex flex-col w-1/2 my-auto " onSubmit={handleSubmit}>
                        <h1 className="text-4xl font-bold drop-shadow-2xl">Welcome back!!</h1>
                        <h1 className="text-xl font-bold pb-12 pt-4 drop-shadow-lg">Please enter your credentials...</h1>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="bg-transparent border-b-2 border-gray-500 pb-2 placeholder:text-black placeholder:font-semibold outline-none"
                            required
                            value={credentials.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="bg-transparent border-b-2 border-gray-500 pb-2 my-4 placeholder:text-black placeholder:font-semibold outline-none"
                            required
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <select
                            name="role"
                            id="role"
                            className="bg-transparent py-2 outline-none"
                            required
                            value={credentials.role}
                            onChange={handleChange}
                        >
                            <option name="role" value="">Select your Role</option>
                            <option name="role" value="Incharge">Incharge</option>
                            <option name="role" value="Staff">Staff</option>
                        </select>
                        <Link className="underline text-right" to="/">Forget Password</Link>
                        <button className="w-full bg-black text-white rounded-lg p-4 my-12">Log in</button>
                    </form>
                </div>
            </div>
        </div>
                
        </>
    )

}