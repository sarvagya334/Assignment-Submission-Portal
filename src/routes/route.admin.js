const express = require('express');
const { registerAdmin, loginAdmin, viewAssignments, acceptAssignment, rejectAssignment } = require('../controller/controller.Admin');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', auth('admin'), viewAssignments);
router.post('/assignments/:id/accept', auth('admin'), acceptAssignment);
router.post('/assignments/:id/reject', auth('admin'), rejectAssignment);

module.exports = router;