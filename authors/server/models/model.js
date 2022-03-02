const mongoose = require('mongoose'); //import mongoose

const AuthorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [3, 'Full name must be at least 3 characters']
    }
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;