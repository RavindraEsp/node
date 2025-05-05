//import express from 'express'
const express = require('express');
const app = express()

const db = require('./db');  // export db file from db.js to run it and start the mongo db server 

const Person = require('./models/Person');  // export person file from modules directory 

//menu




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


// Import the router file 
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');


// use the person router
app.use('/person',personRoutes);
app.use('/menuItem',menuRoutes);

app.listen(3000, () => console.log("listining on port 3000"))