const connectDB = require('../config/db');
const mongoose = require('mongoose');

connectDB();

const userSchema = new mongoose.Schema({
    username : {type: String, unique: true, required: true},
    password : {type: String, required: true, minLength: 8}
});

module.exports = mongoose.model('User', userSchema);