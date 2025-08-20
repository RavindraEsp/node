//import express from 'express'
const express = require('express');
const app = express()
require('dotenv').config();   // env file import and config

//const db = require('./db');  // export db file from db.js to run it and start the mongo db server 

const db = require('./config/db');
//const client = require('./db_postgresql');


const Person = require('./models/Person');  // export person file from modules directory 

const userRoutes = require('./routes/userRoutes');


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





//Postgress sql 
// Get all users

// Routes
app.use('/users', userRoutes);


// app.get('/users', async (req, res) => {
//   try {
//     const result = await client.query('SELECT * FROM users');
//     res.json({users : result.rows});
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Insert a new user
// app.post('/users', async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const result = await client.query(
//       'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
//       [name, email]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update user by ID
// app.put('/users/:id', async (req, res) => {
//   const userId = req.params.id;
//   const { name, email } = req.body;

//   try {
//     const result = await client.query(
//       'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
//       [name, email, userId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // Delete user by ID
// app.delete('/users/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const result = await client.query(
//       'DELETE FROM users WHERE id = $1 RETURNING *',
//       [userId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully', user: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });





// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});




//app.listen(PORT, () => console.log("listining on port 3000"))

// Local Server URl => http://localhost:3000
// Live server url => https://hotels-prnj.onrender.com
