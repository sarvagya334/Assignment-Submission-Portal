const connectDB = require('../config/db');
const mongoose = require('mongoose');

connectDB();

const assignmentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    task: {type: String, required: true},
    adminId: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin',required: true},
    status: {type: String, enum: ['pending', 'rejected', 'accepted'], default: 'pending'},
    createdAt: {type: Date, required: true, immutable: true, default: Date.now()}
});

module.exports = mongoose.model('Assignment', assignmentSchemaSchema);