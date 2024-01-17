import React, { useContext, useEffect, useState } from 'react';

import { Input } from './Input';
import ComplaintContext from '../context/ComplaintContext';

const UpdateModal = ({ showModal, hideModal, complaintId }) => {
    const [formData, setFormData] = useState({updateDescription: "", updateTag: ""});

    const context = useContext(ComplaintContext);
    const { updateComplaintStatus } = context;

    const handleChange = (fieldName, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [fieldName]: value
        }));
      };

      const handleSelectChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            updateTag: e.target.value
          }));
      }

    const addUpdates = (e,id) => {
        e.preventDefault();
        console.log(id);
        updateComplaintStatus(id, formData.updateDescription, formData.updateTag)
        hideModal();
    }


    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${showModal ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>

                <form
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                    onSubmit={(e)=>addUpdates(e,complaintId)}
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                Add Updates
                            </h3>
                            <div className="mt-2">
                                {/* Form content goes here */}
                                <Input
                                    type={"text"}
                                    name={"updateDescription"}
                                    placeholder={"Add Comments / Remarks in short if Possible"}
                                    className={"m-0"}
                                    classNameDiv={"w-full ms-0 pt-2"}
                                    onChange={handleChange}
                                />
                                <div className="mt-8 w-full ">
                                    <select name="updateTag" id="status" value={formData.updateTag} className='w-full border-2 p-2 outline-none' onChange={handleSelectChange}>
                                        <option name="updateTag" value="">Select Status Type</option>
                                        <option name="updateTag" value="UnderInvestigation">Under Investigation</option>
                                        <option name="updateTag" value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={hideModal}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
