import React, { useRef, useEffect } from 'react';

export const OtpVerification = (props) => {
  // const { handleRegister } = props;
  let { generateOtp, verifyOtp, otp, setOtp, timer, setTimer, timerTimeOut, showInputFields, handleResend } = props;

  const inputRefs = useRef([]); // Refs for all input fields


  // Function to handle OTP input
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move focus to the next input field if a digit is entered
    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  // Function to handle backspace key
  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  // Function to handle timer countdown
  const handleTimer = () => {
    if (timer > 0) {
      timerTimeOut = setTimeout(() => setTimer(timer - 1), 1000);
    }
  };



  // Effect to reset timer when OTP changes
  useEffect(() => {
    handleTimer();
  }, [timer]);

  // Effect to set focus on the first input field once input fields become visible
  useEffect(() => {
    if (showInputFields) {
      inputRefs.current[0].focus();
    }
  }, [showInputFields]);

  return (
    <div className="mt-4 text-center text-black">
      {!showInputFields ? (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={generateOtp}>
          Generate OTP
        </button>
      ) : (
        <>
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-12 h-12 text-2xl border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-center"
                onWheel={(e) => e.preventDefault()} // Disable scrolling for the input
              />
            ))}
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {timer > 0 ? `Resend OTP in ${timer} seconds` : <a onClick={handleResend}>Resend OTP</a>}
            </p>
          </div>
          <div className="mt-4">
            <button className="bg-green-500 text-white px-4 py-2 ml-4 rounded" onClick={verifyOtp}>
              Verify and Register
            </button>
          </div>
        </>
      )}
    </div>
  );
};
