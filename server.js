//import express from 'express'
const express = require('express');
const app = express()
require('dotenv').config();   // env file import and config

const db = require('./db');  // export db file from db.js to run it and start the mongo db server 
const Person = require('./models/Person');  // export person file from modules directory 

//menu




const bodyParser = require('body-parser') //npm package user for parse api request
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000 // itmeans ennv me PORT me kuchh number h to vo use karenngfa othher vise 3000 use hoga



//Midleware function 
const logRequest = (req, res, next) => {
  console.log("TEST MIDDLEWARE - This should print");
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
  next();
}

app.use(logRequest);


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


// Import the router file 
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');


// use the person router
app.use('/person',personRoutes);
app.use('/menuItem',menuRoutes);




app.listen(PORT, () => console.log("listining on port 3000"))

// Local Server URl => http://localhost:3000
// Live server url => https://hotels-prnj.onrender.com