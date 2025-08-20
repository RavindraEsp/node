const mongoose = require('mongoose');
const Person = require('../models/Person');
const { generateToken } = require('../middleware/jwt'); // export person file from modules directory 

// Signup
exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    const payload = { id: response.id, username: response.username };
    const token = generateToken(payload);

    return res.status(201).json({ response, token });
  } catch (err) {
    console.error("Signup Error: ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// login
exports.login = async (req, res) => {

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
};


// login
exports.delete = async (req, res) => {

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
};

// Get all persons
exports.getAllPersons = async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    console.error("Fetch Error: ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userData.id;
    const user = await Person.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Profile Error: ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userData.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const updated = await Person.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ error: "Person not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Error: ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get by work type
exports.getByWorkType = async (req, res) => {
  try {
    const { workType } = req.params;
    if (!["chef", "manager", "waiter"].includes(workType)) {
      return res.status(400).json({ error: "Invalid work type" });
    }

    const response = await Person.find({ work: workType });
    res.status(200).json(response);
  } catch (err) {
    console.error("WorkType Error: ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

