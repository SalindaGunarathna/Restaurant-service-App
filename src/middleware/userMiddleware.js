const jwt = require("jsonwebtoken")
const createHttpError = require('http-errors');
const User = require("../model/user");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY

const userAuth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', "")
        const decode = jwt.verify(token, SECRET_KEY)
        const user = await User.findOne({
                _id:decode._id,
                 "tokens.token": token
                })

        if (!user) {       
            throw createHttpError("this user have no permission")
        }
        req.token = token
        req.user = user
        next()

    } catch (error) {
        next(error)

    }
}


module.exports = customerAuth
