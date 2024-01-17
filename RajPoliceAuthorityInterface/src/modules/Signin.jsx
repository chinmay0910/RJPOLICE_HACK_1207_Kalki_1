import React from "react";
import BrandLogo from '../assets/Rajasthan_Police_Logo.png'
import LeftSideLogo from '../assets/logoRajPolice1.png'
import star from '../assets/star.svg'


export const Signin = () => {

    return (
        <div className="h-screen w-full">
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
                    <form className="flex flex-col w-1/2 my-auto ">
                        <h1 className="text-4xl font-bold drop-shadow-2xl">Welcome back!!</h1>
                        <h1 className="text-xl font-bold pb-12 pt-4 drop-shadow-lg">Please enter your credentials...</h1>
                        <input type="text" placeholder="Username" className=" bg-transparent border-b-2 border-gray-500 pb-2 placeholder:text-black placeholder:font-semibold outline-none" />
                        <input type="password" placeholder="Password" className="bg-transparent border-b-2 border-gray-500 pb-2 my-4 placeholder:text-black placeholder:font-semibold outline-none" />
                        <select className="bg-transparent py-2 outline-none" name="role" id="role">
                            <option name="role" value="">Select your Role</option>
                            <option name="role" value="Incharge">Incharge</option>
                            <option name="role" value="Inspector">Inspector</option>
                        </select>
                        <a className="underline text-right" href="/">Forget Password</a>
                        <button className="w-full bg-black text-white rounded-lg p-4 my-12">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    )

}