const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const sendCredentials = require('../utils/sendMail')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;



// Route 1: create the user in the Database using POST on localhost:/api/auth/createuser
router.post('/createuser', fetchuser, [body('firstName', "Name should atleast be of length 2").isLength({ min: 2 }),
body('lastName', "Name should atleast be of length 1").isLength({ min: 1 }),
body('dateofbirth', "Should be date").isDate(),
body('email', 'Enter valid email id!').isEmail(),
body('MobileNo', "MobileNo should not be null and of length 10").isMobilePhone(),
body('adharNo', "AdharNo should not be null and of length 12").isInt({ min: 12 }),
body('designation', "Position should not be null").notEmpty(),
body('dateofjoining', "Should be date").isDate(),
body('employeeID', "EmployeeID should not be null").notEmpty(),
body('address', "Address should not be null").notEmpty(),
],
    async (req, res) => {
        const errors = validationResult(req);

        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }

        const { firstName, lastName, dateofbirth, email, MobileNo, adharNo, designation, dateofjoining, employeeID, address } = req.body;

        const user = await User.findOne({_id: req.user.id});
        if (user.role == 'Incharge') {
            
            const uniqueUsername = await generateUniqueUsername(firstName, lastName);
            const password = generatePassword();
            // const StaffData = {
            //     firstName, lastName, username: uniqueUsername, dateofbirth, email, MobileNo, adharNo, designation, policeStationName: user.policeStationName, role: "Staff", dateofjoining, employeeID, address
            // }

        try {
            const UserEmail = await User.findOne({ email: email });
            if (UserEmail) {
                return res.status(401).json({ error: "Email already Exist" })
            } else {
                // Hashing the password
                let salt = bcrypt.genSaltSync(10);
                let securedPass = bcrypt.hashSync(password, salt);

                // Add the data in the database
                const newUser = await User.create({
                    firstName, 
                    lastName, 
                    username: uniqueUsername, 
                    dateofbirth, email, 
                    MobileNo, 
                    adharNo, 
                    designation, 
                    policeStationName: user.policeStationName, 
                    role: "Staff", 
                    dateofjoining, 
                    employeeID, 
                    address, 
                    password: securedPass,
                    under: user._id
                })
                await newUser.save();

                // creating a Auth-token using jwtwebtoken
                // const data = {
                //     user: {
                //         id: user.id
                //     }
                // }

                // const authtoken = jwt.sign(data, JWT_SECRET);
                sendCredentials(email, "Login Credentials", `Your login credentials for Rajasthan Police portal are as belows \n Username: ${uniqueUsername} \n Password: ${password}`)
                success = true;
                res.json({ success})

            }

        } catch (error) {
            res.status(500).send("Internal Server Error occured while Authenticating")
        }
    }
    })

// Route 2: Login the user in the Database using POST on localhost:/api/auth/login
router.post('/login', [
    // body('email', "Enter valid Email Id").isEmail(),
    body('password', "Enter valid Password").isLength({ min: 5 }),
    body('role', "Role should not be NULL").notEmpty()
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const { email, password, role } = req.body;
            // check if email exists in Database
            const user = await User.findOne({ username: email, role })
            if (user) {
                // compare the password to be matching or not
                const comparePass = bcrypt.compareSync(password, user.password);
                if (comparePass) {
                    const data = {
                        user: {
                            id: user._id
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
        const user = await User.findById(userID).select("-password -_id -MobileNo -adharNo");
        res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "User cant be access get valid authentication token" });
    }

})

// Route 4: Send the OTP to the user for verification to be used in frontend using POST on localhost:/api/auth/sendotp
// router.post('/sendotp', (req, res) => {
//     let success = false;
//     try {
//         const { MobileNo, otpToSend } = req.body;

//         client.messages
//             .create({
//                 body: `Dear Customer, your OTP for registration is ${otpToSend}. Use this OTP to validate your Registration`,
//                 from: '+19293234779',
//                 to: '+91' + MobileNo
//             })
//             .then(message => {
//                 // console.log(message.sid)
//                 success = true;
//                 res.json({ success, msg: "OTP has been sent on " + MobileNo + "ans the OTP is " + otpToSend })

//             });


//     } catch (error) {
//         return res.status(500).json({ error: "User cant access use valid OTP to register" })
//     }

// })




module.exports = router


// Functions / Methods
async function generateUniqueUsername(firstName, lastName) {
    let username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
  
    // Check if the initial username is unique
    let isUnique = await isUsernameUnique(username);
  
    // If not unique, add a suffix until a unique username is found
    if (!isUnique) {
      let suffix = 1;
      while (!isUnique) {
        username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${suffix}`;
        isUnique = await isUsernameUnique(username);
        suffix++;
      }
    }
  
    return username;
  }

  async function isUsernameUnique(username) {
    // Use your Mongoose User model to check if the username already exists
    const existingUser = await User.findOne({ username });
  
    return !existingUser;
  }

  function generatePassword() {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
  
    let password = '';
  
    // Generate 4 random alphabets
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * alphabets.length);
      password += alphabets[randomIndex];
    }
  
    // Generate 4 random digits
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      password += digits[randomIndex];
    }
  
    // Shuffle the password characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
  }