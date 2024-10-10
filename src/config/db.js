const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try{
        mongoose.connect(process.env.MONGO).then(() => {
            console.log('Databse connected');
        })
    }catch(err){
        console.log(`Error ${err}`);
    }
}

module.exports = connectDB;