const mongoose = require('mongoose'); //import mongoose

const NinjaSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    numBelts: {
        type: Number,
        required: [true, 'Number of belts is required'],
        min: [0, 'Number of belts must be at least 0']
    },
    isVeteran: {
        type: Boolean
    }
});

const Ninja = mongoose.model('Ninja', NinjaSchema);

module.exports = Ninja;