import React, { useState } from 'react'

// Components Import
import { Input } from '../components/Input'

export const AddStaff = () => {

  const [formData, setFormData] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Api Call
    const response = await fetch('http://localhost:5001/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateofbirth: formData.dateofbirth,
        email: formData.email,
        MobileNo: formData.MobileNo,
        adharNo: formData.adharNo,
        designation: formData.designation,
        dateofjoining: formData.dateofjoining,
        employeeID: formData.employeeID,
        address: formData.address
      }),
    });
    const json = await response.json();
    console.log(json);
    // alert("Staff Added");
    // console.log(formData);

  }

  return (
    <div className="mt-16 text-lg font-semibold">
      <h1 className='w-[80%] m-auto mb-4'>Add Staff:</h1>
      <form className='bg-white w-[80%] rounded-lg m-auto pb-16 grid grid-cols-2' onSubmit={handleSubmit}>
        <Input type="text" name="firstName" placeholder="eg. Pradip" label="First Name:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="text" name="lastName" placeholder="eg. Garhwal" label="Last Name:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="date" name="dateofbirth" placeholder="" label="Date of Birth:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="email" name="email" placeholder="eg. pradipgarhwal@gmail.com" label="Email Address:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="tel" name="MobileNo" placeholder="eg 9547863210" label="Mobile No:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="number" name="adharNo" placeholder="eg 129547863210" label="Adhar No:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="text" name="designation" placeholder="eg. Sub Inspector" label="Position:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="date" name="dateofjoining" placeholder="" label="Date of Joining:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="text" name="employeeID" placeholder="eg A001245" label="Employee ID:" classNameDiv="w-[90%]" onChange={handleChange} />
        <Input type="address" name="address" placeholder="eg. Opp. Jaipur Police Station" label="Address:" classNameDiv="w-[90%]" onChange={handleChange} />

        <button className='block p-2 bg-blue-600 rounded-lg w-1/5 mx-auto mt-8 text-white font-semibold col-start-1 col-end-3'>Add Staff</button>
      </form>

    </div>

  )
}
