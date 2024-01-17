import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ComplaintContext from '../context/ComplaintContext'

import UpdateModal from '../components/UpdateModal'

export const UpdateStatus = () => {

    const context = useContext(ComplaintContext)
    const { Complaint, getComplaintbyId } = context;
    const { id } = useParams()

    useEffect(() => {
        getComplaintbyId(id)
    }, [])

    const [isModalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
        // console.log(Complaint.updates)
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back one step in the history
    };

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    return (
        <div className="mt-16 text-lg font-semibold">
            <div className='w-[80%] mx-auto cursor-pointer' onClick={handleGoBack}>back</div>
            <div className='bg-white w-[80%] rounded-lg m-auto pb-12 grid grid-cols-2 shadow-xl'>
                <div className='grid grid-rows-2 gap-2 ms-8 mt-8'>
                    <div className="flex flex-row">
                        <h1 className='text-gray-950'>FIR No / Case No .: </h1>
                        <p className='ms-2'>{Complaint.FIRNO}</p>
                    </div>
                    <div className="flex flex-row">
                        <h1 className='text-gray-950'>FIR Description .: </h1>
                        <p className='ms-2'>{Complaint.FIR_DESC}</p>
                    </div>
                </div>
                <div className='grid grid-rows-2 gap-2 ms-8 mt-8'>
                    <div className="flex flex-row">
                        <h1 className='text-gray-950'>Complainers Name .: </h1>
                        <p className='ms-2'>{Complaint.name}</p>
                    </div>
                    <div className="flex flex-row">
                        <h1 className='text-gray-950'>Complainers No .: </h1>
                        <p className='ms-2'>+91 {Complaint.phone}</p>
                    </div>
                </div>
                <button onClick={showModal} className="p-2 bg-blue-600 text-white rounded-lg col-span-2 w-1/4 mt-12 mx-auto">
                    Add Status
                </button>

                {/* Render the modal */}
                <UpdateModal showModal={isModalVisible} hideModal={hideModal} complaintId={Complaint._id} />

            </div>


            <div className='bg-white w-[80%] rounded-lg m-auto pb-12 shadow-xl mt-8'>
                <div className="head grid grid-cols-7 bg-gray-400 rounded-t-lg p-2 ">
                    <div>Date</div>
                    <div>Time</div>
                    <div className='col-span-4'>Comments</div>
                    <div>Status</div>
                </div>

                {
                    Complaint.updates && Complaint.updates.length !== 0 ?
                    Complaint.updates.map((ele, i) => {
                        return <div className="body grid grid-cols-7 rounded-t-lg p-2 " key={i}>
                            <div>{new Date(ele.updatedAt).toLocaleDateString('de-DE', options)}</div>
                            <div>{new Date(ele.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                            <div className='col-span-4'>{ele.updateDescription}</div>
                            <div className='w-full'><button className={`rounded-full w-full ${ele.updateTag == 'UnderInvestigation' ? "bg-red-400" : "bg-green-300"} px-3 py-2 text-sm text-center text-white`}>{ele.updateTag == 'UnderInvestigation' ? "Under Investigation" : ele.updateTag}</button></div>
                        </div>

                    })
                    :
                    <h1 className='text-center mt-8'>No Updates Available</h1>
                }

            </div>

        </div>
    )
}
