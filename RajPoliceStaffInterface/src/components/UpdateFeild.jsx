import React, { useContext } from 'react'

// All React Router Imports...
import { useNavigate } from 'react-router-dom'

// Tabler Icons import
import { IconUserFilled, IconEdit } from '@tabler/icons-react'

// Context imports
import ComplaintContext from '../context/ComplaintContext'

export const UpdateFeild = ({firno, name, reason, complaintId}) => {

    const context  = useContext(ComplaintContext)
    const { Complaint, setComplaint, getComplaintbyId } = context;
    const navigate = useNavigate()
    const updateStatus = (complaintId) => {
        // e.preventDefault()
        navigate(`/update/status/${complaintId}`)
        getComplaintbyId(complaintId)
    }

    return (
        <div className="grid grid-cols-9 bg-white mt-4 rounded-xl p-4">
            <IconUserFilled />
            <h1 className='col-span-1' id='firno'>{firno}</h1>
            <h1 className='col-span-2' id='name'>{name}</h1>
            <h1 className='col-span-4' id='reason'>{reason}</h1>
            <IconEdit className='ms-auto me-2 cursor-pointer' onClick={()=>updateStatus(complaintId)} />
        </div>
    )
}
