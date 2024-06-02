const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:60
      },
    address: {
        type: String,
        required: true,
        maxlength:60
      },
    telephone: {
        type: String,
        required: true,
        maxlength:15
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema)