//import express from 'express'

const express = require('express');
const app = express()

const db = require('./db');  // export db file from db.js to run it 

const Person = require('./models/Person');  // export person file from modules directory 

//menu

const MenuItem = require('./models/MenuItem');  // export person file from modules directory 



const bodyParser = require('body-parser') //npm package user for parse api request
app.use(bodyParser.json()); //req.body



app.get('/', (req, res) => {
  res.send('Welcome to hotel how can i help you Hello World')
})


app.get('/message', (req, res) => {
  res.send('Welcome to hotel yadav ji How can we help You ravi.')
})



app.get('/idli', (req, res) => {
  var customized_idli = {
    name: "rava itli",
    size: "10 cm diameter",
    is_samber: true,
    is_chutny: false
  }
  res.send(customized_idli)
})


app.post('/person', async (req, res) => {

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


//Get method to get person data 

app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error => --  ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
})


app.post('/menuItem', async (req, res) => {

  try {
    const data = req.body //Assuming the req body contain he person data 
    //create a new person documen using the mongodb  model
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Data saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error => --  ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
)


app.get('/menuItem', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error => --  ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
})






app.listen(3000, () => console.log("listining on port 3000"))