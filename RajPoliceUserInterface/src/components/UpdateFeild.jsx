import React from 'react'

// All React Router Imports...
import { useNavigate } from 'react-router-dom'

// Tabler Icons import
import { IconUserFilled, IconEye } from '@tabler/icons-react'

export const UpdateFeild = ({firno, name, reason, complaintId}) => {
    const navigate = useNavigate()
    const updateStatus = (complaintId) => {
        // e.preventDefault()
        navigate(`/update/status/${complaintId}`)
        // getComplaintbyId(complaintId)
    }

    return (
        <div className="grid grid-cols-9 bg-white mt-4 rounded-xl p-4">
            <IconUserFilled />
            <h1 className='col-span-1' id='firno'>{firno}</h1>
            <h1 className='col-span-2' id='name'>{name}</h1>
            <h1 className='col-span-4' id='reason'>{reason}</h1>
            <IconEye className='ms-auto me-2 cursor-pointer' onClick={()=>updateStatus(complaintId)} />
        </div>
    )
}
