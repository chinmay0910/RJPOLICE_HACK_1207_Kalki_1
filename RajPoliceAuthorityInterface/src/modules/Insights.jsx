// import React from 'react';
// import { Station } from '../components/station';
// import { IconSearch } from '@tabler/icons-react';

// export const Insights = () => {
//   return (
//     <div className="mt-16 text-lg font-semibold">
//       <div className="flex flex-col">
//         <div className="flex flex-row bg-white border-black border-2 mx-[14%] rounded-xl shadow-lg">
//           <input type="text" className='p-4 rounded-xl outline-none w-[96%]' placeholder='Search with Station No./Name ' />
//           <IconSearch className='my-auto' />
//         </div>

//         <div className="flex flex-col mx-[14%] mt-12">
//           <div className="flex flex-row bg-gray-200 p-4 font-bold rounded-xl">
//             <div className="mx-4 flex-1">Station No.</div>
//             <div className="mx-16 flex-1">Station Name</div>
//             <div className="mx-8 flex-1">Monthly Report</div>
//             <div className="mx-8 flex-1">Download Report</div>
//             <div className="mx-8 flex-1">Send Notice</div>
//           </div>
          
//           <Station stationNo="RAJ-1245" stationName="Jaipur Police Station" />
//           <Station stationNo="RAJ-1246" stationName="Ajmer Police Station" />
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import { Station } from '../components/station';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';

export const Insights = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // Assuming your backend server is running on http://localhost:3001
    const fetchStations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/police-stations');
        setStations(response.data);
      } catch (error) {
        console.error('Error fetching police stations:', error);
      }
    };

    fetchStations();
  }, []);

  return (
    <div className="mt-16 text-lg font-semibold">
      <div className="flex flex-col">
        <div className="flex flex-row bg-white border-black border-2 mx-[14%] rounded-xl shadow-lg">
          <input type="text" className="p-4 rounded-xl outline-none w-[96%]" placeholder="Search with Station No./Name " />
          <IconSearch className="my-auto" />
        </div>

        <div className="flex flex-col mx-[14%] mt-12">
          <div className="flex flex-row bg-gray-200 p-4 font-bold rounded-xl">
            <div className="mx-4 flex-1">Station No.</div>
            <div className="mx-16 flex-1">Station Name</div>
            <div className="mx-8 flex-1">Monthly Report</div>
            <div className="mx-8 flex-1">Download Report</div>
            <div className="mx-8 flex-1">Send Notice</div>
          </div>

          {/* Display the list of police stations */}
          {stations.map((station) => (
            <Station key={station._id} stationNo={station.PS_NO} stationName={station.PS_Name} />
          ))}
        </div>
      </div>
    </div>
  );
};
