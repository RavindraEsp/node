const express = require('express');
const router = express.Router();

const mongoose = require('mongoose'); // add for id validation


//const Person = require('./models/Person');  // export person file from modules directory 
//→ Means: “look in a folder named models in the current directory.”



const Person = require('./../models/Person');  // export person file from modules directory 
//Means: “go one level up (parent directory), then look for a models folder.”


const { jwtAuthMiddleware, generateToken } = require('./../jwt');  // export person file from modules directory 


// router.post('/', async (req, res) => {

//     try {
//         const data = req.body //Assuming the req body contain he person data 
//         //create a new person documen using the mongodb  model
//         const newPerson = new Person(data);
//         const response = await newPerson.save();
//         console.log("Person Data saved successfully");
//         res.status(200).json(response);
//     } catch (err) {
//         console.log("Error => --  ", err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

router.post('/signup', async (req, res) => {

    try {
        const data = req.body //Assuming the req body contain he person data 
        //create a new person documen using the mongodb  model
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Person Data saved successfully");

        const payload = {
            id: response.id,
            username: response.username
        };

        console.log("Payload  is : ", JSON.stringify(payload));
        const token = generateToken(payload); // ye payload data token me rahta h 

        console.log("Token is : ", token);



        res.status(200).json({
            response, token: token
        });


    } catch (err) {
        console.log("Error => --  ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

)


router.post('/login', async (req, res) => {

    try {
        //Extract username and password from the req body
        const { username, password } = req.body;


        const user = await Person.findOne({ username: username });

        if (!user || !(await user.comparePassword(password))) {

            return res.status(401).json({
                error: "Invalid username and password"
            });

        }


        // generate token 


        const payload = {
            id: user.id,
            username: user.username
        };

        console.log("Payload  is : ", JSON.stringify(payload));
        const token = generateToken(payload); // ye payload data token me rahta h 

        console.log("Token is : ", token);


        // Return token in response 

        res.status(200).json({
            token: token
        });


    } catch (err) {
        console.log("Error => --  ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

)


// router.put('/:id', async (req, res) => {

//     try {
//         const personId = req.params.id; // Extract the person id 
//         const updatedPersonData = req.body // update data for person 

//         // Validate ObjectId format
//         if (!mongoose.Types.ObjectId.isValid(personId)) {
//             return res.status(400).json({ error: "Invalid person ID format" });
//         }

//         const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
//             new: true, // return the updated document
//             runValidators: true, // run mongoes validation
//         });
//         console.log("Response is ");
//         console.log(response);


//         if (!response) {
//             return res.status(404).json({ error: "Person not found" });
//         }

//         console.log("Data updated successfully");
//         res.status(200).json(response);


//     } catch (err) {
//         console.log("Error => --  ", err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// )


router.delete('/:id', async (req, res) => {

    try {

        const personId = req.params.id; // Extract the person id 
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(personId)) {
            return res.status(400).json({ error: "Invalid person ID format" });
        }
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("Data updated successfully");
        res.status(200).json(response);

    } catch (err) {
        console.log("Error => --  ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

)



//Get method to get person data 

router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Person Data Fetched successfully");
        res.status(200).json(data);
    } catch (err) {
        console.log("Error => --  ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
})




//Get method to fetch profile

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {

        const userData = req.user;
        console.log("User data is ", userData);


        //  const userId = userData.id;

        const userId = userData.userData.id;


        console.log("User id is ", userId);


        const user = await Person.findById(userId); // jo name dete h vo response me return hota h abhi user key return hogi 
        console.log("Person Profile Fetched successfully");

        console.log("User data is ", user);

        res.status(200).json({ user });
    } catch (err) {
        console.log("Error => --  ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/profileUpdate', jwtAuthMiddleware, async (req, res) => {
    try {

        const userData = req.user;
        console.log("User data is ", userData);

        const updatedPersonData = req.body // update data for person 

        //  const userId = userData.id;
        const userId = userData.userData.id;

        console.log("User id is ", userId);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid person ID format" });
        }

        const response = await Person.findByIdAndUpdate(userId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true, // run mongoes validation
        });
        console.log("Response is ");
        console.log(response);


        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Data updated successfully");
       return res.status(200).json(response);

    } catch (err) {
        console.log("Error => --  ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
})





router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType });
            console.log("Data Fetched successfully");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });

        }
    } catch (err) {
        console.log("Error => --  ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router; // export router to use it on server.jjs file 

