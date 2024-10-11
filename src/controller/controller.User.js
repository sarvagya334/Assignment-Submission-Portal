const User = require('../model/model.user');
const Admin = require('../model/model.admin');
const Assignment = require('../model/model.assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

//User Registration
const registerUser = async(req, res) => {
    try{

        const {username, password} = req.body;
        if(password.length < 8) throw new Error("Password less than 8 characters");
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

//User Login
const loginUser = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({ token });
};

//To see all the Admins
const fetchAllAdmins = async(req, res) => {
    const allAdmins = await Admin.find();
    res.status(201).json(allAdmins);
};

//to Upload an Assignment
const uploadAssignment = async(req, res) => {
    const { task, adminId, userId } = req.body;
    const newAssignment = await new Assignment({ userId : userId, task: task, adminId: adminId });
    res.status(201).json(newAssignment);
};

module.exports = {
    registerUser,
    loginUser,
    uploadAssignment, 
    fetchAllAdmins
};

