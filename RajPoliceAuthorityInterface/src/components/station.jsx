import React from 'react'

// All React Router Imports...
import { useNavigate } from 'react-router-dom'

// Tabler Icons import
import { FaEye,FaFilePdf,FaEnvelope , } from 'react-icons/fa';

import fileDownload from 'js-file-download';

export const Station = ({stationNo, stationName}) => {
    const navigate = useNavigate()
    const View = () => {
        navigate('*')
    }
    const Download = () => {
      // Simulating a PDF file download
      const dummyPdfContent = 'Dummy PDF Content'; // Replace with your actual PDF content
      fileDownload(dummyPdfContent, 'monthly_report.pdf');
    };
  const Send = () => {
    navigate('*')
}

    return (
        <div className="flex flex-row bg-white mt-4 rounded-xl p-4">
            <h1 className='mx-4' id='firno'>{stationNo}</h1>
            <h1 className='mx-8' id='name'>{stationName}</h1>
            {/* <h1 className='mx-8' id='reason'>{reason}</h1> */}
            {/* <IconEdit className='ms-auto me-2 cursor-pointer' onClick={updateStatus} /> */}
            <FaEye className='ms-1 cursor-pointer' onClick={View} />
            <FaFilePdf className='ms-24 cursor-pointer' onClick={Download} />
            <FaEnvelope className='ms-32 cursor-pointer' onClick={Send} />
            
        </div>
    )
}
