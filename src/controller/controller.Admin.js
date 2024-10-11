const Admin = require('../model/model.admin');
const Assignment = require('../model/model.assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerAdmin = async(req, res) => {
    try{

        const {username, password} = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin(
            {
                username: username,
                password: hashedPassword
            }
        )
        const saveUser = await admin.save();
        res.status(201).json(admin);

    }catch(err){
        res.status(400).json({message: err.message});
    }
};

const loginAdmin = async(req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: admin._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({ token });
};

const viewAssignments = async(req, res) => {
    console.log(req.user.id);
    const admin = await Admin.find({_id: req.user.id});
    const assignments = await Assignment.find({adminId: admin[0]["username"]});
    res.json(assignments);
};

const rejectAssignment = async(req, res) => {
    const { id } = req.params;
    const makeChanges = await Assignment.updateOne({_id: id}, {$set:{status: 'reject'}});// find the assignment by _id then change its staus to accept
    const assignment = await Assignment.findOne({_id: id});
    res.json(assignment);
};

const acceptAssignment = async(req, res) => {
    const { id } = req.params;
    const makeChanges = await Assignment.updateOne({_id: id}, {$set:{status: 'accept'}});// find the assignment by _id then change its staus to accept
    const assignment = await Assignment.findOne({_id: id});
    res.json(assignment);
};

module.exports = {
    registerAdmin, 
    loginAdmin,
    viewAssignments,
    rejectAssignment,
    acceptAssignment
};

