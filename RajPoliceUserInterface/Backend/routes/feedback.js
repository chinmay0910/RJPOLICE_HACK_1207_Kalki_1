const express = require('express');
const fetchuser = require('../middleware/fetchuser.js')

// Router Configurations
const router = express.Router();

// MongoDb Database Routes
const Feedback = require('../models/feedback.js')

// fetch all the policestations names http://localhost:5000/api/feedback/submitFeedback
router.post('/submitFeedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully!' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
