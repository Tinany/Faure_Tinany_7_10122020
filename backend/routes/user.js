//Technologies used
const express = require('express');
const router = express.Router();

//User controller & middleware
const userController = require('../controllers/user');
const validatePassword = require('../middleware/passwordValidator');
const {checkSignUp} = require('../middleware/emailValidator');
const {checkProfile} = require('../middleware/validator');
const auth = require('../middleware/auth');

//Users routes
router.post('/signup', checkSignUp, validatePassword, checkProfile, userController.signup);
router.post('/login', userController.login);
router.delete('/user/delete/:user_id', auth, userController.deleteUser);
router.patch('/user/update/:user_id', auth, checkProfile, userController.updateUser);

router.get('/usersList/', userController.findAll);

module.exports = router;