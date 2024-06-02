
const createHttpError = require("http-errors");

const validateRestaurantData = (req) => {

    // validate basic details
    if (!req.body.name || !req.body.address || !req.body.telephone) {
        throw createHttpError(400, "missing restaurant data");
    } else {
        return true
    }
}
   

module.exports = validateRestaurantData