const express = require('express');
const { registerUser, loginUser, uploadAssignment, fetchAllAdmins } = require('../controller/controller.User');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/upload', auth('user'), uploadAssignment);
router.get('/allAdmins', fetchAllAdmins);
module.exports = router;