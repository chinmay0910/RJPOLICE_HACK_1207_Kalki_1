import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Search.css'
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Button, Tooltip } from '@mui/material';

// const data = [
//     "Kalyan Khadakpada St.",
//     "Kalyan Adharwadi St.",
//     "Shahad St.",
//     "jaipur police st.",
//     "chirawa police st.",
//   ];

  
  const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedStation, setSelectedStation] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState([
      // "Kalyan Khadakpada St.",
      // "Kalyan Adharwadi St.",
      // "Shahad St.",
      // "jaipur police st.",
      // "chirawa police st.",
    ]);

   // Get all policestations...
   const getComplaintbyId = async ()=>{
    const response = await fetch(`http://localhost:5000/api/complaint/policeStationNames`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const json = await response.json()
    setData(json)
}
   
    useEffect(() => {
        const filteredResults = data.filter(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setResults(filteredResults);
        getComplaintbyId();
        setShowOptions(false);
      }, [data]);
    
      const selectLocation = (stationName) => {
        setSelectedStation(stationName);
        const route = `/system/rate/${stationName}`;
        navigate(route);
        setShowOptions(true);
      };
      const selectComplaint = (stationName) => {
        setSelectedStation(stationName);
        const route = `/system/complaint/${stationName}`;
        navigate(route);
        setShowOptions(true);
      };

      const handleCall = () => {
        // Implement your logic for handling the Feedback button
        console.log('Feedback button clicked');
      };
  
    return (

      <div className="search-container text-black">
        <input
          type="text"
          id="searchBox"
          placeholder="Search Police Station (Feedback)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        
        {results.length > 0 && (
          <div id="results bg-white text-black" style={{width: "100%"}}>
            {results.map((item, index) => (
              <div
                key={index}
                className=' bg-white text-black p-4 hover:bg-gray-100 flex flex-row'
                // onClick={() => selectLocation(item)}
              >
                {item}  
                <div className=" w-1/6 ms-auto text-end">
                <Tooltip title="Rate">
                <Button className='m-2' onClick={() => selectLocation(item)}>
                  <ReviewsIcon/>
                </Button>
                </Tooltip>
                <Tooltip title="Complaint">
                <Button className='m-2' onClick={() => selectComplaint(item)}>
                  <ThumbDownAltIcon/>
                </Button>
                </Tooltip>
                </div>
              </div>
              
            ))}
          </div>
        )}

        {selectedStation && (
          <div id="selectedStation bg-white text-black">Selected Station: {selectedStation}</div>
        )}

        {showOptions && (
          <div id=" bg-white text-black ">
            <a href="#" className="option">
              Call
            </a>
            <a href="#" className="option">
              Feedback
            </a>
          </div>
        )}
      </div>

    );
  };
  
  export default SearchPage;
