const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/', restaurantController.createRestaurant);  
router.get('/', restaurantController.getAllRestaurant);
router.get('/:id', restaurantController.getSingleRestaurant);  
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router