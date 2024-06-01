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
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema)