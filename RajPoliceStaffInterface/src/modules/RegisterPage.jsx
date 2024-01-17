import React, { useEffect, useState } from 'react'

// Components Import
import { Input } from '../components/Input'
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ FIRNO: "", FIR_DESC: "", name: "", phone: "" });

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Api Call
    const response = await fetch('http://localhost:5001/api/complaint/registerfir', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        "FIRNO": formData.FIRNO,
        "FIR_DESC": formData.FIR_DESC,
        "name": formData.name,
        "phone": formData.phone
      }),
    });
    const json = await response.json();
    // console.log(json);
    // alert("Complaint Added");
    setFormData({ FIRNO: "", FIR_DESC: "", name: "", phone: "" })
    navigate('/update')

  }

  return (
    <div className="mt-16 text-lg font-semibold">
      <h1 className='w-[80%] m-auto mb-4'>Register Complaint:</h1>
      <form className='bg-white w-[80%] rounded-lg m-auto pb-16 flex flex-col' onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-row">
            <Input type="number" name="FIRNO" placeholder="eg 1245" label="FIR NO:" className="" onChange={handleChange} />
            <Input type="text" name="FIR_DESC" placeholder="Atleast 5 - 6 words of Description" label="FIR Description:" className="" onChange={handleChange} />
          </div>
          <div className="flex flex-row">
            <Input type="text" name="name" placeholder="eg. Pradip Garhwal" label="Complainer Name:" className="" onChange={handleChange} />
            <Input type="tel" name="phone" placeholder="eg 9547863210" label="Mobile No:" className="" onChange={handleChange} />
          </div>
        </div>
        <button className='block p-2 bg-blue-600 rounded-lg w-1/5 mx-auto mt-8 text-white font-semibold'>Register</button>
      </form>

    </div>

  )
}
