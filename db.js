const mongoose = require('mongoose')  // export mongodb 

require('dotenv').config();   // env file import and config



// define the mongodb connection url 

 //const mongoURL = 'mongodb://127.0.0.1:27017/hotels'  // Hotels name ke database me data store 
//const mongoURL = 'mongodb+srv://ravindra:test1234@cluster0.s9rmmbf.mongodb.net/'  // Hotels name ke database me data store 


 //local database se conect 

//const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

//online data base cluster name se bana h 

console.log("Db file called");

// set a mongodb connection 
mongoose.connect(mongoURL)


//Get the default connection 
//Mongoose maintains a default connectio object representin g the mongoDB connection

const db = mongoose.connection;


// define event listner for database connection

db.on('connected', () => {
    console.log("connected to Mongodb server");
})

db.on('error', (err) => {
    console.log("Mongodb connection erroe ", err);
})

db.on('disconnected', () => {
    console.log("Mongodb disconnected");
})

//Export the database connection 

module.exports = db;  // export krne ke liye krte h esko server file me 