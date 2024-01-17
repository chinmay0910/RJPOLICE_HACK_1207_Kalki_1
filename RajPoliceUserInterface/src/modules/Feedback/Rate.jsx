import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
    const { id } = useParams();

    const questions = [
        `Selected Station is: ${id}`,
        "How comfortable and heard did you feel during your interaction with the officers?",
        "How would you rate the clarity and effectiveness of communication during the interaction?",
        "How satisfied are you with the response time of the police personnel?",
        "To what extent did you find the officers professional in their conduct?",
        "How well did the officers understand the nature of the issue you were reporting?",
        "To what extent do you feel the actions taken by the police ensured your safety?",
        "How satisfied are you with the accessibility of police services in your area?",
        "How would you rate the cleanliness and hygiene of the police station premises?",
        "How would you rate your overall experience with the Rajasthan Police?"
    ];

    const options = [
        ["START"],
        ["Very comfortable and heard", "Somewhat comfortable and heard", "Neutral", "Somewhat uncomfortable and unheard", "Very uncomfortable and unheard"],
        ["Excellent", "Good", "Average", "Poor", "Very poor"],
        ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
        ["Very professional", "Professional", "Neutral", "Unprofessional", "Very unprofessional"],
        ["Very well", "Well", "Adequately", "Poorly", "Very poorly"],
        ["Completely ensured", "Partially ensured", "Neutral", "Not ensured", "Endangered my safety"],
        ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
        ["Very clean and well-maintained", "Clean but could be improved", "Neutral", "Not very clean", "Poor cleanliness and maintenance"],
        ["Excellent", "Good", "Satisfactory", "Poor"]
    ];

    const [questionIndex, setQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState(Array(questions.length).fill(''));
    const [selectedOption, setSelectedOption] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const history = useNavigate();

    const handleOptionSelect = (option) => {
        setSelectedOption(option);

        // Move to the next question after 1 second
        setTimeout(() => {
            const newResponses = [...userResponses];
            newResponses[questionIndex] = option;
            setUserResponses(newResponses);

            // Move to the next question
            if (questionIndex < questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
                setSelectedOption('');
            } else {
                // Submit the feedback (you can implement this function)
                submitFeedback();
            }
        }, 1000);
    };

    const submitFeedback = async () => {
        // Add the id to userResponses
        const feedbackData = {
            policeStation: id,
            responses: userResponses.slice(1), // Exclude the first "START" response
        };
    
        // Implement the logic to submit userResponses to your backend
        console.log('User Responses:', feedbackData);
        const response = await fetch('http://localhost:5000/api/feedback/submitFeedback', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
        });
    
        if (response.ok) {
            const json = await response.json();
            console.log(json.message);
            setSubmitted(true);
        } else {
            const data = await response.json();
            console.error('Feedback submission failed:', data.error);
        }
    };
    

    return (
        <>
            {
                submitted ? (
                    <div className="text-center mt-16">
                        <h2 className='font-bold text-2xl underline'>Thank you for your feedback!</h2>
                        <img src="" alt="" />
                    </div>
                ) : (
                    <div className="w-1/2 mx-auto mt-8 p-4 bg-white rounded shadow shadow-2xl mt-16">
                        <h2 className="text-xl font-bold mb-4">{questions[questionIndex]}</h2>
                        <div className="space-y-4">
                            {options[questionIndex].map((option, index) => (
                                <button
                                    key={index}
                                    className={`w-full py-2 px-4 bg-gray-200 rounded transition duration-500 ${selectedOption === option ? 'bg-blue-500 hover:bg-blue-400 text-white' : ''
                                        }`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }
        </>


    );
};

export default FeedbackForm;
