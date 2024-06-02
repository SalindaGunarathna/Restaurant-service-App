const Restaurant = require('../model/restaurant');
const validateRestaurantData = require('../validator/restaurant')
const createHttpError = require("http-errors");
const {  uploadFileToLocalDirectory,deleteFile,} = require('../service/fileUploader')

// Create a new restaurant
exports.createRestaurant = async (req, res,next) => {
    try {
    
      const {name, address, telephone} = req.body;
      
      //if image is there in request body upload it
      if (req.files !== null) {
        const { image } = req.files;
       var { filepath} = await uploadFileToLocalDirectory(image); 
      }else{
        var filepath = " ";
      }

      // create new restaurant
      const restaurant = new Restaurant({
        name,
        address,
        telephone,
        image: filepath
        });

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
    const filepath = " ";
    // validate basic details before updating existing restaurant
    const isvalidate = validateRestaurantData(req);

    try {
      // check if restaurant exists
      const restaurant = await Restaurant.findById(req.params.id);

      // if restaurant not found then throw error
      if (restaurant === null) {
        throw createHttpError(404, "Restaurant not found");
      }

      // if image is available in request body, upload it
      if (req.files !== null) {
        filepath = await uploadFileToLocalDirectory(req.files.image);
      }
      // if isvalidate is true then update
      if(isvalidate){
        restaurant.name = req.body.name;
        restaurant.address = req.body.address;
        restaurant.telephone = req.body.telephone;
        if(filepath !== " "){
          restaurant.image = filepath
        }  
      }  
      restaurant.save();
      return res.status(200).json(restaurant);
      
    } catch (err) {
      next(err)
    }
  }

  // delete restaurant
  exports.deleteRestaurant = async (req, res,next) => {
    try {
     const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
      // delete image
      deleteFile(deletedRestaurant.image);

      res.status(200).json(` ${deletedRestaurant.name} Restaurant has been deleted...`);
    } catch (err) {
      next(err)
    }
  }
