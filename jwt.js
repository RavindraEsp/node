
const jwt = require('jsonwebtoken');
require('dotenv').config();   // env file import and config


const jwtAuthMiddleware = (req, res, next) => {

    //Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({
     error: "Unauthorized"
    });

    try {

        //Verify the jwt token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object

        req.user = decoded;  // Added new key req key name user 
        next();


    } catch (err) {
        console.error(err);
        res.status(401).json({
            error: "Invalid token"
        });

    }
}

//Function  tp generate JWT token 


const generateToken = (userData) => {
    //Generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET);
}

//module.export = jwtAuthMiddleware;  // return 1 method 

module.export = { jwtAuthMiddleware, generateToken };  // return multiple method 