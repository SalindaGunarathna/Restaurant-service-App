const Restaurant = require('../model/restaurant');
const validateRestaurantData = require('../validator/restaurant')

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

  // update restaurant
  exports.updateRestaurant = async (req, res,next) => {
    try {
      // validate basic details before updating existing restaurant
      const isvalidate = validateRestaurantData(req);

      // if isvalidate is true then update
      if(isvalidate){
        const restaurant = await Restaurant.findById(req.params.id);

        restaurant.name = req.body.name;
        restaurant.address = req.body.address;
        restaurant.telephone = req.body.telephone;
        restaurant.save();
        return res.status(200).json(restaurant);
      }
      
    } catch (err) {
      next(err)
    }
  }

  // delete restaurant
  exports.deleteRestaurant = async (req, res,next) => {
    try {
     const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
      res.status(200).json(` ${deletedRestaurant.name} Restaurant has been deleted...`);
    } catch (err) {
      next(err)
    }
  }
