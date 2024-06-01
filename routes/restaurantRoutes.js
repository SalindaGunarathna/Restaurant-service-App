const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/', restaurantController.createRestaurant);  
router.get('/', restaurantController.getAllRestaurant);
router.get('/:id', restaurantController.getSingleRestaurant);  

module.exports = router