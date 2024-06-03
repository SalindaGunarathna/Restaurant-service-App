const createHttpError = require("http-errors");

const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../model/user")

const { config } = require("dotenv");



exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      throw createHttpError(400, "missing email or password");
    }
    try {
      var user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
    } catch (error) {
      throw createHttpError(400, "user not found ");
    }
 
    // generate token for user 
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
};

// sign up
exports.signUp = async (req, res, next) => {

    // get user data from req.body
  const {  email, password} = req.body;

  try {
    if ( !email || !password) {
      throw createHttpError(400, "please provide all required information");
    }
    
    // create new user
    const user = new User({
      email,
      password  
    });

    const result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

// logout user
exports.logout = async (req, res, next) => {
  try {
    req.user.tokens = []; // Clearing all tokens
    const user = await req.user.save();

    res.send("Successfully logged out");
  } catch (error) {
    next(error);
  }
};



