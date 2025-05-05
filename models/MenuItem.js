

const mongoose = require('mongoose')



const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    taste: {
        type: String,
        required: true,
        enum: ['sweet', 'spices', 'sauce']

    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: String,
        default: 0
    },

});

//Create person model 

const Menu = mongoose.model('MenuItem',menuItemSchema);

module.exports = Menu; // export krne ke liye ab esko export karenge 


