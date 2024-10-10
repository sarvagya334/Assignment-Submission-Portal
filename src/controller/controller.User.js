const User = require('../model/model.user');
const Admin = require('../model/model.admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 


const registerUser = async(req, res) => {
    try{

        const {username, password} = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await new User(
            {
                username: username,
                password: hashedPassword
            }
        )
        const saveUser = await user.save();
        res.status(201).json(user);

    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const loginUser = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
};

const fetchAllAdmins = async(req, res) => {
    const allAdmins = await Admin.find({});
    res.status(201).json(allAdmins);
};

const uploadAssignment = async(req, res) => {
    const { task, adminId } = req.body;
    const userId = req.user.id;
    const newAssignment = await Assignment.create({ userId, task, adminId });
    res.status(201).json(newAssignment);
};

module.exports = {
    registerUser,
    loginUser,
    uploadAssignment, 
    fetchAllAdmins
};

