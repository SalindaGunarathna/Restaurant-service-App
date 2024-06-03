const jwt = require("jsonwebtoken")
const createHttpError = require('http-errors');
const User = require("../model/user");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY

const userAuth = async (req, res, next) => {
    try {

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.replace('Bearer ', '');
        } else if (req.body.token) {
            token = req.body.token;
        } else {
            throw createHttpError(400, 'Token not found in headers or body');
        }
        
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


module.exports = userAuth