//Express
const express = require('express');
const router = express.Router();

//User controllers
const userController = require('../controllers/user');
const validatePassword = require('../middleware/validator');

//Route Users :
router.post('/signup', validatePassword, userController.signup);
router.post('/login', userController.login);

module.exports = router;