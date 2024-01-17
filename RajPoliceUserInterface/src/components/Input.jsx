import React from "react";

const Input = ({label, type, placeholder, className}) => {
    return(
        <div className="flex flex-col mt-5">
            <label className="mx-8" htmlFor={label}>{label}</label>
            <input type={type} placeholder={placeholder} name={label} className={`bg-gray-100 p-2 lg:p-4 outline-none ${className}`}/>
        </div>
    )
}

export default Input;