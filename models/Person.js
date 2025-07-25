const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


// Define the person schema 


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

personSchema.pre('save', async function (next) {

    const person = this;

    //Hash the password only if has been modified (or is new)

    if (!person.isModified('password')) return next();


    try {
        // hash password generation

        //  const salt = "this is salt";
        const salt = await bcrypt.genSalt(10);

        // hash passowrd

        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Override the plain password with the hashed one 

        person.password = hashedPassword;

        next();

    } catch (err) {

        return next(err);
    }
});


//create method in person schema
personSchema.methods.comparePassword = async function (candidatePassword) {
    try{
        
        // Use bcrypt to compatre the provided password with the hashed password

        const isMatch = await bcrypt.compare(candidatePassword,this.password);

        return isMatch;
    }
    catch(err){
        throw err;

    }
    
}
//Create person model 

const Person = mongoose.model('user', personSchema);

module.exports = Person; // export krne ke liye ab esko export karenge 