const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const userAuth = require('../middleware/userMiddleware');

router.post('/create',userAuth, restaurantController.createRestaurant);  
router.get('/retrieveall', restaurantController.getAllRestaurant);
router.get('/retrieve/:id', restaurantController.getSingleRestaurant);  
router.put('/update/:id',userAuth, restaurantController.updateRestaurant);
router.delete('/delete/:id',userAuth, restaurantController.deleteRestaurant);

module.exports = router