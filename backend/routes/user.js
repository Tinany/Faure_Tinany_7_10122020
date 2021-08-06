//Technologies used
const express = require('express');
const router = express.Router();

//User controller & middleware
const userController = require('../controllers/user');
const validatePassword = require('../middleware/validator');

//Users routes
router.post('/signup', validatePassword, userController.signup);
router.post('/login', userController.login);
router.delete('/user/delete/:user_id', userController.deleteUser);
router.put('/user/update/:user_id', userController.updateUser);
router.get('/userDatas', userController.getUserDatas);

module.exports = router;