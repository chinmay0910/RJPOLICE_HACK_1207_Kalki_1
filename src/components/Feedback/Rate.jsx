import React, { useState } from "react";
import './Rate.css';
import { useParams } from "react-router-dom";

const Rate = () => {
    const [rating, setRating] = useState(3);
    const [comments, setComments] = useState('');
    const { id } = useParams();
    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value, 10));
    };

    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Add your logic to handle form submission, e.g., sending data to the server
        console.log('Rating:', rating);
        console.log('Comments:', comments);

        // Clear the form after submission
        setRating(3);
        setComments('');
    };

    return (
        
        <div className="rating-container h-fit mt-16">
            <a href="/">back</a>
            <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Share your experience in scaling</p>
            <p className="text-center">{id}</p>
            
            <div className="emojis">
                <span>😞</span>
                <span>🙁</span>
                <span>😐</span>
                <span>😁</span>
                <span>😍</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="range" min="1" max="5" value={rating} onChange={handleRatingChange} id="slider" />

                <textarea className="text-black" placeholder="Add your comments..." value={comments} onChange={handleCommentsChange} rows="8"></textarea>

                <button type="submit">SUBMIT</button>
            </form>
        </div>
    );
}

export default Rate;
