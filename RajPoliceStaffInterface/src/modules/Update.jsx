import React, { useContext, useEffect, useState } from 'react'

// Components Import
import { UpdateFeild } from '../components/UpdateFeild'
import ComplaintContext from '../context/ComplaintContext'

// Tabler Icons import
import { IconSearch } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export const Update = () => {
    const navigate = useNavigate();
    const context = useContext(ComplaintContext)
    const { Complaints, getComplaints } = context;

    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getComplaints()
        }
        else {
            navigate('/account/signin');

        }
    }, [])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredComplaints = Complaints.filter((ele) =>
        ele.FIRNO.includes(searchTerm)
    );

    return (
        <div className="mt-16 text-lg font-semibold">
          <div className="flex flex-col">
            <div className="flex flex-row bg-white border-black border-2 mx-[14%] rounded-xl shadow-lg">
              <input
                type="text"
                className="p-4 rounded-xl outline-none w-[96%]"
                placeholder="Search with FIR No."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <IconSearch className="my-auto" />
            </div>
            <div className="flex flex-col mx-[14%] mt-12">
              {filteredComplaints.map((ele, i) => (
                <UpdateFeild key={i} firno={ele.FIRNO} name={ele.name} reason={ele.FIR_DESC} complaintId={ele._id} />
              ))}
            </div>
          </div>
        </div>
      );
}
