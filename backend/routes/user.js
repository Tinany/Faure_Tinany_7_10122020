//Technologies used
const express = require('express');
const router = express.Router();

//User controller & middleware
const userController = require('../controllers/user');
const validatePassword = require('../middleware/validator');
const auth = require('../middleware/auth');

//Users routes
router.post('/signup', validatePassword, userController.signup);
router.post('/login', userController.login);

router.delete('/user/delete/:user_id', auth, userController.deleteUser);
router.patch('/user/update/:user_id', auth, userController.updateUser);

module.exports = router;