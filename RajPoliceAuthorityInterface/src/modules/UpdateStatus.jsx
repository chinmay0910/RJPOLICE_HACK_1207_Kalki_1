import React from 'react'
import { Link } from 'react-router-dom'

export const UpdateStatus = () => {
    return (
        <div className="mt-16 text-lg font-semibold">
            <div className='w-[80%] mx-auto'><Link to="/complaints">back</Link></div>
            <div className='bg-white w-[80%] rounded-lg m-auto pb-12 grid grid-cols-2 shadow-xl'>
                <div className='grid grid-rows-2 gap-2 ms-8 mt-8'>
                    <div className="flex flex-row">
                        <h1 className='text-gray-950'>FIR No / Case No .: </h1>
                        <p className='ms-2'>1245</p>
                    </div>
                    <div className="flex flex-row">
                        <h1 className='text-gray-950'>FIR Description .: </h1>
                        <p className='ms-2'>Dowry Request by Wife</p>
                    </div>
                </div>
                <div className='grid grid-rows-2 gap-2 ms-8 mt-8'>
                    <div className="flex flex-row">
                        <h1 className='text-gray-950'>Complainers Name .: </h1>
                        <p className='ms-2'>Pradip Garhwal</p>
                    </div>
                    <div className="flex flex-row">
                        <h1 className='text-gray-950'>Complainers No .: </h1>
                        <p className='ms-2'>+91 9874563210</p>
                    </div>
                </div>
                <button className='block p-2 bg-blue-600 hover:bg-blue-500 rounded-xl w-1/5 mx-auto mt-8 text-white font-semibold col-start-1 col-end-3'>ADD UPDATE</button>
            </div>

            <div className='bg-white w-[80%] rounded-lg m-auto pb-12 shadow-xl mt-8'>
                <div className="head grid grid-cols-7 bg-gray-400 rounded-t-lg p-2 ">
                    <div>Date</div>
                    <div>Time</div>
                    <div className='col-start-3 col-end-7'>Comments</div>
                    <div>Status</div>
                </div>

                <div className="body grid grid-cols-7 rounded-t-lg p-2 ">
                    <div>22-12-2023</div>
                    <div>5 pm</div>
                    <div className='col-start-3 col-end-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit.  Ratione assumenda similique ipsa perferendis voluptates.</div>
                    <div ><button className='rounded-full bg-red-400 text-center p-2 text-white'>Under Investigation</button></div>
                </div>

            </div>

        </div>
    )
}
