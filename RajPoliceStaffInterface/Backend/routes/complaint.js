const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaints');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


// Twilio Code
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Route 1: Add the FIR registeration using: POST route of "localhost/api/complaint/registerfir" with a MIDDLEWARE
router.post('/registerfir', fetchuser, [
  body('FIRNO', "FIRNO should not be null").notEmpty(),
  body('FIR_DESC', 'FIR_Description should not be null !').notEmpty(),
  body('name', "Tag should atleast be of length 2").isLength({ min: 2 }),
  body('phone', "Should be mobile number").isMobilePhone()
], async (req, res) => {

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() })
  }

  try {
    const userId = req.user.id;
    const { FIRNO, FIR_DESC, name, phone } = req.body

    try {
      let success = false;

      // client.verify.v2.services('AC48603e88d473d4980b7f360a1cbe1b53')
      //   .verifications
      //   .create({ to: phone, channel: 'sms' })
      //   .then(verification => {
      //     console.log(verification.status)

          client.messages
            .create({
              body: `Your FIR has been successfully registered \n And the Details for it are as follows: \n FIRNO: ${FIRNO} \n FIR Description: ${FIR_DESC} \n To get the live updates and to give us valuable Feedback`,
              from: '+19293234779',
              to: '+91' + phone
            })
            .then(message => {
              // console.log(message.sid)
              success = true;
              res.json({ success, msg: "Registeration msg has been sent" })
    
            });
        // });

    } catch (error) {
      return res.status(500).json({ error: "Error occurred while sending registerion message" })
    }



    const complaint = await Complaint.create({ registeredBy: userId, FIRNO, FIR_DESC, name, phone });
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).send("Internal Server Error || Insertion")
  }
})

// Route 2: Get All the Notes using: GET route of "localhost/api/complaint/fetchallcomplaints" with a MIDDLEWARE
router.get('/fetchallcomplaints', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const complaint = await Complaint.find({ registeredBy: userId });
    res.json(complaint);
  } catch (err) {
    res.status(500).json("Internal Server Error || fetchallnotes")
  }


})

router.get('/status/:id', async (req, res) => {
  try {

    const id = req.params.id;
    const complaint = await Complaint.findById(id);
    res.json(complaint);


  } catch (error) {
    console.error("Error >> " + error);
  }
})

// Route to add updates to a complaint
router.post('/status/:id/updates', fetchuser, async (req, res) => {
  const { updateDescription, updateTag } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    // Add the update to the updates array
    complaint.updates.push({
      userId,
      updateDescription,
      updateTag
    });

    // Save the updated complaint
    const updatedComplaint = await complaint.save();

    res.json(updatedComplaint);
  } catch (error) {
    console.error('Error adding update:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;