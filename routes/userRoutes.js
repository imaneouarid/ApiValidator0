const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

router.put('/users/:userId', userController.updateUserInfo);

module.exports = router;
