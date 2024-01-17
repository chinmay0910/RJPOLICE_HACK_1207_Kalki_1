const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next ) => {

    const token = req.header('auth-token') // this is being send along with headers

    if(!token){
        res.status(400).json({error: "Please Authenticate using Valid Token"})
    }
    else{

        try {
            const infoFromToken = jwt.verify(token, JWT_SECRET);
            req.user = infoFromToken.user;
            next();
        } catch (error) {
            res.status(400).json({error: error+"While Fetching info/ Authenticating"})
        }
    }
}


module.exports = fetchuser;