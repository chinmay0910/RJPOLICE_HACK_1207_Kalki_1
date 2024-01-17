const express = require('express');
const fetchuser = require('../middleware/fetchuser.js')

// Router Configurations
const router = express.Router();

// MongoDb Database Routes
const Complaint = require('../models/complaint.js');
const User = require('../models/User.js');
const Incharge = require('../models/Incharge.js')


// Route 1: Get All the Complaints using: GET route of "localhost/api/complaint/fetchallcomplaints" with a MIDDLEWARE but with MobileNo of user
router.get('/fetchallcomplaints', fetchuser,async(req, res)=>{

    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      const userMobileNo = user.MobileNo;

      const complaint = await Complaint.find({phone: userMobileNo});
      res.json(complaint);
    } catch (err) {
      res.status(500).json("Internal Server Error || fetchallnotes")
    }  
  })

  // Route 2: Get All the Complaints using: GET route of "localhost/api/complaint/status/:id"
  router.get('/status/:id', async (req, res)=>{
    try {
      
      const id = req.params.id;
      const complaint = await Complaint.findById(id);
      res.json(complaint);
  
  
    } catch (error) {
      console.error("Error >> "+ error);
    }
  })

  // fetch all the policestations names http://localhost:5000/api/complaint/policeStationNames
  router.get('/policeStationNames', async (req, res) => {
    try {
      const policeStationNames = await Incharge.find().distinct('policeStationName');
      res.json(policeStationNames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
