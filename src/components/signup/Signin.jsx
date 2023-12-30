import React, { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import "./Signup.css";

const SignIn = () =>{
    const [isUser, setIsUser] = useState(true)

    if(isUser) return(
        <>
        
        <div className="w-full h-full absolute top-0 left-0 bg-gray-900 z-10"></div>

                <div className="signupBox bg-black shadow-[0_-2px_8px_2px_rgba(255,255,255,0.1)] lg:shadow-2xl shadow-white h-fit w-full m-0 absolute top-[auto] bottom-[0] lg:w-1/2  p-4 lg:top-[20%] lg:left-[20%] rounded-t-lg lg:rounded-3xl z-10"  >
                    <div className="flex flex-row ">
                        <div className="ms-4 mt-4 left_top w-5/6">
                            <h2 className="text-lg lg:text-4xl font-bold">Welcome Back</h2>
                        </div>
                        <div className="right_top w-1/6 flex flex-row items-center justify-end mt-4 me-4">
                            <CancelIcon className="lg:scale-[2]" />
                        </div>
                    </div>

                    <div className="flex flex-col mx-6 my-10 p-0 rounded-lg text-xs lg:text-2xl">
                        <div>
                            <input type="email" placeholder="Email" className="bg-zinc-900 w-full p-2 lg:p-4 border border-white "/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" className="bg-zinc-900 w-full p-2 lg:p-4 border border-white "/>
                        </div>
                        
                        <div className="flex flex-row items-center  mt-10">
                        <button className="lg:p-4 bg-blue-700 font-bold text-lg lg:text-xl rounded-full w-2/5 lg:w-1/3">Sign In</button>
                            <a href="" className="ms-auto w-2/5 underline ">or, Create Account</a>
                        </div>
                        <button className="bg-zinc-900 p-2 mt-4 lg:p-4 lg:mt-6 border border-white "><FacebookRoundedIcon color="primary" className="lg:scale-150 me-4"/> Sign up with Facebook</button>
                        <button className="bg-zinc-900 p-2 mt-4 lg:p-4 lg:mt-6 border border-white "><GoogleIcon className="lg:scale-150 me-4"/>Sign up with Google</button>
                    </div>

                    <a className="text-md lg:text-2xl mx-auto block text-center mb-20" href="#">Forget Password</a>

                </div>
        </>
    )
    else{
        return <></>
    }


}

export default SignIn;