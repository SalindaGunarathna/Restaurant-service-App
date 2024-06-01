const Restaurant = require('../model/restaurant');

// Create a new restaurant
exports.createRestaurant = async (req, res,next) => {
    try {
      const restaurant = new Restaurant(req.body);
     const savedRestaurant = await restaurant.save(); 
      res.status(201).json(savedRestaurant);  
    } catch (err) {
     next(err)
    }
  };


  // get all restaurant
  exports.getAllRestaurant = async (req, res,next) => {

    try {
      const restaurants = await Restaurant.find({});
      res.status(200).json(restaurants);  
    } catch (err) {
     next(err)
    }
  }

  // get single restaurant
  exports.getSingleRestaurant = async (req, res,next) => {
    const id = req.params.id;
    try {   
      const restaurant = await Restaurant.findById(id);  
      res.status(200).json(restaurant); 
    } catch (err) {
     next(err)
    }
  }