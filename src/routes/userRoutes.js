const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');


router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.post('/logout', userController.logout); 


module.exports = router