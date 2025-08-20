const express = require('express');
const router = express.Router();

const mongoose = require('mongoose'); // add for id validation


//const Person = require('./models/Person');  // export person file from modules directory 
//→ Means: “look in a folder named models in the current directory.”



const Person = require('../models/Person');  // export person file from modules directory 
//Means: “go one level up (parent directory), then look for a models folder.”

const personController = require('../controllers/personController');



const { jwtAuthMiddleware, generateToken } = require('../middleware/jwt');  // export person file from modules directory 


//If we not create controller and add here then this type add 

// router.post('/signup', async (req, res) => {

//     try {
//         const data = req.body //Assuming the req body contain he person data 
//         //create a new person documen using the mongodb  model
//         const newPerson = new Person(data);
//         const response = await newPerson.save();
//         console.log("Person Data saved successfully");

//         const payload = {
//             id: response.id,
//             username: response.username
//         };

//         console.log("Payload  is : ", JSON.stringify(payload));
//         const token = generateToken(payload); // ye payload data token me rahta h 

//         console.log("Token is : ", token);



//         res.status(200).json({
//             response, token: token
//         });


//     } catch (err) {
//         console.log("Error => --  ", err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// )

router.post('/signup', personController.signup);
router.post('/login',personController.login);
router.delete('/:id', personController.delete);

router.get('/', jwtAuthMiddleware, personController.getAllPersons);
router.get('/profile', jwtAuthMiddleware, personController.getProfile);
router.put('/profileUpdate', jwtAuthMiddleware, personController.updateProfile);
router.get('/:workType', personController.getByWorkType);



module.exports = router; // export router to use it on server.jjs file 

