import React from "react";

const Button = ({ className, type, label }) => {
    return(
        <button className={`lg:p-4 bg-blue-700 font-bold text-lg lg:text-xl rounded-full w-2/5 lg:w-1/3 ${className}`} type={type}>{label}</button>
    )
}

export  default Button;