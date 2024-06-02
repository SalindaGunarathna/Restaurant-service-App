const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/create', restaurantController.createRestaurant);  
router.get('/retrieveall', restaurantController.getAllRestaurant);
router.get('/retrieve/:id', restaurantController.getSingleRestaurant);  
router.put('/update/:id', restaurantController.updateRestaurant);
router.delete('/delete/:id', restaurantController.deleteRestaurant);

module.exports = router