const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const userAuth = require('../middleware/userMiddleware');


router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.get('/logout',userAuth, userController.logout); 


module.exports = router