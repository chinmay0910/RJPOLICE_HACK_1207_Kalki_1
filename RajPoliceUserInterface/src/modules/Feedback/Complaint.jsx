import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ComplaintRatingForm = () => {
  const [comments, setComments] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const history = useNavigate();
  const { id } = useParams();
  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleAnonymousChange = () => {
    setAnonymous(!anonymous);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log('Comments:', comments);
    console.log('Anonymous:', anonymous);

    // Redirect or perform additional actions as needed
    history.push('/');
  };

  return (
    <div className="rating-container h-fit mt-16 w-full mx-auto lg:w-2/5 bg-white shadow-none">
      <Link onClick={()=> history(-1)}>back</Link>
      <p className=' block' style={{ marginTop: '20px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
        Write your complaint...
        
      </p>
      <p className="text-center font-bold my-4">Complaint Against: {id}</p>

      <form onSubmit={handleSubmit}>
        <textarea
            className="text-black p-6  resize-none"
          placeholder="Add your comments..."
          rows="10"
          value={comments}
          onChange={handleCommentsChange}
        ></textarea>

        <label className='block'>
          <input className='mx-2' type="checkbox" checked={anonymous} onChange={handleAnonymousChange} />
          <span style={{ display: 'inline' }}>Send as anonymous</span>
        </label>

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default ComplaintRatingForm;
