import React, { useState } from "react";
import ComplaintContext from "./ComplaintContext";

const ComplaintState = (props) => {

    const [Complaints, setComplaints ] = useState([]);
    const [Complaint, setComplaint] = useState({})
    
    // Fetch all notes
    const getComplaints = async()=>{
        // API call
        const response = await fetch('http://localhost:5001/api/complaint/fetchallcomplaints', {
            method: "GET",  
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          const json = await response.json();

          setComplaints(json)
    }

    // Get complaint by id
    const getComplaintbyId = async (id)=>{
        const response = await fetch(`http://localhost:5001/api/complaint/status/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json()
        setComplaint(json)
    }

    // Post updateComplaintStatus
    const updateComplaintStatus = async (id, updateDescription, updateTag)=>{
        const response = await fetch(`http://localhost:5001/api/complaint/status/${id}/updates`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({updateDescription, updateTag}), 
        })
        const json = await response.json()
        setComplaint(json)
    }

    

    return (
        <ComplaintContext.Provider value={{ Complaints, Complaint, setComplaints, setComplaint, getComplaints, getComplaintbyId, updateComplaintStatus }}>
            {props.children}
        </ComplaintContext.Provider>
    )
}

export default ComplaintState;