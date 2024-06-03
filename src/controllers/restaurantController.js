const Restaurant = require('../model/restaurant');
const createHttpError = require("http-errors");
const { uploadFileToLocalDirectory, deleteFile } = require('../service/fileUploader');
const validateRestaurantData = require("../validator/restaurant")

// Create a new restaurant
exports.createRestaurant = async (req, res, next) => {
  try {
    const { name, address, telephone } = req.body;
    let imagePath = null;

    if ( req.files !=null) {

      const uploadedFile = await uploadFileToLocalDirectory(req.files.image);
      imagePath = uploadedFile.filepath;
    }

    const restaurant = new Restaurant({ name, address, telephone, image: imagePath });
    await restaurant.save();
    res.status(201).json(restaurant); // Ensure the response is sent

  } catch (err) {
    console.error("Error creating restaurant:", err);  // Log the error for debugging
    next(err);
  }
};

// Get all restaurants
exports.getAllRestaurant = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

// Get single restaurant
exports.getSingleRestaurant = async (req, res, next) => {
  const id = req.params.id;
  try {
    const restaurant = await Restaurant.findById(id);
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

// Update restaurant
exports.updateRestaurant = async (req, res, next) => {
  try {
    const isvalidate = validateRestaurantData(req);

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      throw createHttpError(404, "Restaurant not found");
    }

    let imagePath = null;
    if ( req.files !=null) {

      const uploadedFile = await uploadFileToLocalDirectory(req.files.image);
      imagePath = uploadedFile.filepath;
    }

    if (isvalidate) {
      restaurant.name = req.body.name;
      restaurant.address = req.body.address;
      restaurant.telephone = req.body.telephone;
      if (imagePath !== null) {
        restaurant.image = imagePath;
      }
    }
    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (err) {
    console.error("Error updating restaurant:", err); // Enhanced logging
    res.status(500).json({ message: err.message }); 
    next(err);
  }
};

// Delete restaurant
exports.deleteRestaurant = async (req, res, next) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (deletedRestaurant.image !== " ") {
      deleteFile(deletedRestaurant.image);
    }

    res.status(200).json(`${deletedRestaurant.name} Restaurant has been deleted...`);
  } catch (err) {
    next(err);
  }
};
