// postgress setup 

// db.js
const { Client } = require('pg');

// Create client instance
const client = new Client({
  user: 'postgres',               // your PostgreSQL username
  host: 'localhost',              // local database
  database: 'demo',           // database name (create this in pgAdmin or terminal)
  password: '1234', // your PostgreSQL password
  port: 5432,                     // default port
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;