// import React from 'react'

// // Components Import
// import { Input } from '../components/Input'

// export const RegisterPage = () => {
//     return (
//         <div className="mt-16 text-lg font-semibold">
//             <h1 className='w-[80%] m-auto mb-4'>Add Police Station:</h1>
//             <form className='bg-white w-[80%] rounded-lg m-auto pb-16 flex flex-col'>
//                 <div>
//                     <div className="flex flex-row">
//                         <Input type="number" name="PS_NO" placeholder="eg. RAJ-4123" label="Police Station Number:" className="" />
//                         <Input type="text" name="PS_Name" placeholder="eg. Ajmer Police Station" label="Police Station Name:" className="" />
//                     </div>
//                     <div className="flex flex-row">
//                         <Input type="text" name="PS_location" placeholder="eg. Oppoite SBI bank,midc road jaipur" label="Location:" className="" />
//                         <Input type="text" name="PS_head" placeholder="eg. mr. chinmay mhatre" label="Station Head Name:" className="" />
//                     </div>
//                 </div>
//                 <button className='block p-2 bg-blue-600 rounded-lg w-1/5 mx-auto mt-8 text-white font-semibold'>ADD</button>
//             </form>

//         </div>

//     )
// }

import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../components/Input';

export const RegisterPage = () => {
  const [stationData, setStationData] = useState({
    PS_NO: '',
    PS_Name: '',
    PS_location: '',
    PS_head: '',
  });

  // const handleInputChange = () => {
  //   setStationData({ ...stationData, [e.target.name]: e.target.value });
  //   console.log(stationData);
  // };

  const handleChange = (fieldName, value) => {
    setStationData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }));
    console.log(stationData);
  };


  const handleAddStation = async () => {
    try {
      // Assuming your backend server is running on http://localhost:3001
      //   const response = await axios.post('http://localhost:3001/api/police-stations', stationData);
      //   console.log('Police station added:', response.data);
      // console.log('Sending data:', stationData);
      // const response = await axios.post('http://localhost:3001/api/police-stations', stationData);

      const response = await fetch('http://localhost:3001/api/police-stations', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PS_NO: stationData.PS_NO,
          PS_Name: stationData.PS_Name,
          PS_location: stationData.PS_location,
          PS_head: stationData.PS_head,
        }),
      });
      const json = await response.json();
      // console.log(json);
      // You may choose to fetch the updated list of stations here and update the UI accordingly
    } catch (error) {
      console.error('Error adding police station:', error);
    }
  };

  return (
    <div className="mt-16 text-lg font-semibold">
      <h1 className="w-[80%] m-auto mb-4">Add Police Station:</h1>
      <form className="bg-white w-[80%] rounded-lg m-auto pb-16 flex flex-col">
        <div>
          <div className="flex flex-row">
            <Input
              type="number"
              name="PS_NO"
              placeholder="eg. RAJ-4123"
              label="Police Station Number:"
              className=""
              onChange={handleChange}
            />
            <Input
              type="text"
              name="PS_Name"
              placeholder="eg. Ajmer Police Station"
              label="Police Station Name:"
              className=""
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row">
            <Input
              type="text"
              name="PS_location"
              placeholder="eg. Opposite SBI bank, midc road jaipur"
              label="Location:"
              className=""
              onChange={handleChange}
            />
            <Input
              type="text"
              name="PS_head"
              placeholder="eg. Mr. Chinmay Mhatre"
              label="Station Head Name:"
              className=""
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddStation}
          className="block p-2 bg-blue-600 rounded-lg w-1/5 mx-auto mt-8 text-white font-semibold"
        >
          ADD
        </button>
      </form>
    </div>
  );
};




