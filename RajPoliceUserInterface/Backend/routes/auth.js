const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const JWT_SECRET = process.env.JWT_SECRET;


// Route 1: create the user in the Database using POST on localhost:/api/auth/createuser
router.post('/createuser', [body('firstName', "Name should atleast be of length 2").isLength({ min: 2 }),
body('lastName', "Name should atleast be of length 1").isLength({ min: 1 }),
body('adharNo', "AdharNo should not be null and of length 12").isInt({ min: 12 }),
body('MobileNo', "MobileNo should not be null and of length 10").isInt({ min: 10 }),
body('email', 'Enter valid email id!').isEmail(),
body('password', "Password should atleast be of length 5").isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);

        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }

        const { firstName, lastName, MobileNo, adharNo, email, password } = req.body;

        try {
            const UserEmail = await User.findOne({ email: email });
            if (UserEmail) {
                return res.status(401).json({ error: "Email already Exist" })
            } else {
                // Hashing the password
                let salt = bcrypt.genSaltSync(10);
                let securedPass = bcrypt.hashSync(password, salt);

                // Add the data in the database
                const user = await User.create({
                    firstName, lastName, MobileNo, adharNo, email, password: securedPass
                })
                await user.save();

                // creating a Auth-token using jwtwebtoken
                const data = {
                    user: {
                        id: user.id
                    }
                }

                const authtoken = jwt.sign(data, JWT_SECRET);

                success = true;
                res.json({ success, authtoken })

            }

        } catch (error) {
            res.status(500).send("Internal Server Error occured while Authenticating")
        }

    })

// Route 2: Login the user in the Database using POST on localhost:/api/auth/login
router.post('/login', [
    body('email', "Enter valid Email Id").isEmail(),
    body('password', "Enter valid Password").isLength({ min: 5 })
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const { email, password } = req.body;
            // check if email exists in Database
            const user = await User.findOne({ email })
            if (user) {
                // compare the password to be matching or not
                const comparePass = bcrypt.compareSync(password, user.password);
                if (comparePass) {
                    const data = {
                        user: {
                            id: user.id
                        }
                    }

                    // Generate Auth-token for validation
                    const authtoken = jwt.sign(data, JWT_SECRET);
                    success = true;
                    res.json({ success, authtoken })
                }
                else {
                    return res.status(400).json({ error: "User does not Exists / Invalid Credentials" })
                }
            } else {
                return res.status(400).json({ error: "User does not Exists / Invalid Credentials" })
            }

        }
        catch (error) {
            return res.status(400).json({ error: "Internal Error occured while login" })
        }
    }
)

// Route 3: Get the user info from the Database to be used in frontend using POST on localhost:/api/auth/getuser with a MIDDLEWARE
router.get('/getuser', fetchuser, async (req, res) => {

    try {
        // console.log(req.user.id);
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password -MobileNo -adharNo");
        res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "User cant be access get valid authentication token" });
    }

})

// Route 4: Send the OTP to the user for verification to be used in frontend using POST on localhost:/api/auth/sendotp
router.post('/sendotp', (req, res) => {
    let success = false;
    try {
        const { MobileNo, otpToSend } = req.body;

        client.messages
            .create({
                body: `Dear Customer, your OTP for registration is ${otpToSend}. Use this OTP to validate your Registration`,
                from: '+19293234779',
                to: '+91' + MobileNo
            })
            .then(message => {
                // console.log(message.sid)
                success = true;
                res.json({ success, msg: "OTP has been sent on " + MobileNo + "ans the OTP is " + otpToSend })

            });


    } catch (error) {
        return res.status(500).json({ error: "User cant access use valid OTP to register" })
    }

})




module.exports = router