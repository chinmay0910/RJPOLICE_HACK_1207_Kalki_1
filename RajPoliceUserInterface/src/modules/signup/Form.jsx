import React, { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import LoginSvg from '../../assets/LoginSvg.svg'
import RegisterSvg from '../../assets/registerSvg.svg'
import { useNavigate } from 'react-router-dom'
import Alert from '../Alert'
import { OtpVerification } from './OtpVerification'

export const Form = (props) => {

    const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits
    const [timer, setTimer] = useState(30); // Initial timer value
    const [generatedOtp, setGeneratedOtp] = useState('');
    let timerTimeOut;
    const [showInputFields, setShowInputFields] = useState(false);


    const { isSignInPage = true } = props;
    const [alert, setAlert] = useState(null);


    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", adharNo: "", mobileNo: "", password: "", cpassword: "" })



    // Opt generation logic
    // Function to handle OTP resend
    const handleResend = () => {
        // Add logic to generate and send OTP
        // For now, we'll just reset the state and timer
        setOtp(['', '', '', '']);
        generateOtp()
        setTimer(30);
        setShowInputFields(true);
    };

    // Function to generate a random OTP
    const generateOtp = async () => {
        const newOtp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10).toString());
        const otpToSave = newOtp.join('');
        console.log(otpToSave);
        setGeneratedOtp(otpToSave);

        const response = await fetch('http://localhost:5000/api/auth/sendotp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ MobileNo: credentials.mobileNo, otpToSend: otpToSave }),
        });
        const json = await response.json();

        if (json.success) {
            console.log(json);
            setShowInputFields(true);
            setTimer(30);
        }
    };

    // Function to verify the entered OTP (for demonstration purposes)
    let enteredOtp;
    const verifyOtp = () => {
        enteredOtp = otp.join('');

        if (enteredOtp === generatedOtp) {
            console.log('Verified:', enteredOtp);
            clearTimeout(timerTimeOut);
            return true
        } else {
            console.log('Enter Valid Otp');
            handleResend();
            return false
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSignInPage && (enteredOtp === generatedOtp)) {
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName: credentials.firstName, lastName: credentials.lastName, email: credentials.email, adharNo: credentials.adharNo, MobileNo: credentials.mobileNo, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json);

            if (json.success) {
                // redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                showAlert("Account Created Succesfully", "success")
            }
            else {
                // alert(json.error)
                showAlert("User Already Exists", "danger")
            }
        }
        else if (isSignInPage) {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json.success);

            if (json.success) {
                // redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                showAlert("Logged in Successfully", "success")
            }
            else {
                showAlert("Invalid Credentials", "danger")
            }

        }
        else {
            showAlert("Enter valid OTP", "danger")
        }

    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }


    return (
        <>
            <Alert alert={alert} />
            <div className='bg-[#d2cfdf] h-screen w-full flex justify-center items-center '>
                <div className='lg:py-12 lg:w-[80%] lg:h-[95%] w-[1000px] h-[700px] bg-white flex justify-center items-center text-black'>
                    <div className={`h-full w-full flex flex-col justify-center items-center ${!isSignInPage && 'order-2'} `}>
                        <div className="text-4xl font-extrabold">WELCOME {isSignInPage && 'BACK'}</div>
                        <div className='mb-[50px] font-light'>PLEASE {isSignInPage ? 'LOGIN' : 'REGISTER'} TO CONTINUE</div>
                        <form className='w-[380px]' onSubmit={handleSubmit}>
                            <div className="flex flex-col p-0 rounded-lg text-xs lg:text-2xl">
                                {
                                    !isSignInPage &&
                                    <>
                                        <div className="flex flex-row rounded-t-lg">
                                            <input type="text" placeholder="First Name" id='firstName' name='firstName' className="bg-gray-100 w-1/2 p-1 lg:p-2  border border-white rounded-tl-md" value={credentials.firstName} onChange={handleChange} />
                                            <input type="text" placeholder="Last Name" id='lastName' name='lastName' className="bg-gray-100 w-1/2 p-1 lg:p-2  border border-white rounded-tr-md" value={credentials.lastName} onChange={handleChange} />
                                        </div>
                                        <input type="text" placeholder="Adhar No." id='adharNo' name='adharNo' className="bg-gray-100 w-full p-1 lg:p-2 border border-white " value={credentials.adharNo} onChange={handleChange} />
                                        <input type="text" placeholder="Mobile No." id='mobileNo' name='mobileNo' className="bg-gray-100 w-full p-1 lg:p-2 border border-white " value={credentials.mobileNo} onChange={handleChange} />
                                    </>
                                }

                                <div>
                                    <input type="email" placeholder="Email" id='email' name='email' className="bg-gray-100 w-full p-1 lg:p-2 border border-white " value={credentials.email} onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="password" placeholder="Password" id='password' name='password' className="bg-gray-100 w-full p-1 lg:p-2 border border-white " value={credentials.password} onChange={handleChange} />
                                </div>
                                {
                                    !isSignInPage &&
                                    <>
                                        <input type="password" placeholder="Confirm Password" id='cpassword' name='cpassword' className="bg-gray-100 w-full p-1 lg:p-2 border border-white rounded-b-md" value={credentials.cpassword} onChange={handleChange} />
                                        <OtpVerification
                                            generateOtp={generateOtp}
                                            verifyOtp={verifyOtp}
                                            otp={otp}
                                            setOtp={setOtp}
                                            timer={timer}
                                            setTimer={setTimer}
                                            timerTimeOut={timerTimeOut}
                                            showInputFields={showInputFields}
                                            handleResend={handleResend}
                                        />
                                    </>

                                }

                                {
                                    isSignInPage &&
                                    <Button type={'submit'} label={'Sign in'} />
                                }
                            </div>
                            <div className="cursor-pointer text-md mt-5 text-center hover:text-blue-700 underline" onClick={() => { navigate(isSignInPage ? '/account/signup' : '/account/signin') }}>
                                {isSignInPage ? 'Create new Account' : 'Sign in'}
                            </div>

                        </form>
                    </div>
                    <div className={`flex justify-center items-center h-full w-full bg-[#F2F5F8] ${isSignInPage && 'order-1'}`}>
                        {
                            isSignInPage ?
                                <img src={LoginSvg} alt="login" style={{ width: '300px', height: '300px' }} />
                                :
                                <img src={RegisterSvg} alt="login" style={{ width: '300px', height: '300px' }} />

                        }

                    </div>
                </div>
            </div>
        </>




    )
}