const express = require('express');
const router = express.Router();

const mongoose = require('mongoose'); // add for id validation


//const Person = require('./models/Person');  // export person file from modules directory 
//→ Means: “look in a folder named models in the current directory.”



const Person = require('./../models/Person');  // export person file from modules directory 
//Means: “go one level up (parent directory), then look for a models folder.”


router.post('/', async (req, res) => {

    try {
        const data = req.body //Assuming the req body contain he person data 
        //create a new person documen using the mongodb  model
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved successfully");
        res.status(200).json(response);
    } catch (err) {
        console.log("Error => --  ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

)


router.put('/:id', async (req, res) => {

    try {
        const personId = req.params.id; // Extract the person id 
        const updatedPersonData = req.body // update data for person 

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(personId)) {
            return res.status(400).json({ error: "Invalid person ID format" });
        }

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true, // run mongoes validation
        });
        console.log("Response is ");
        console.log(response);


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

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data Fetched successfully");
        res.status(200).json(data);
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

