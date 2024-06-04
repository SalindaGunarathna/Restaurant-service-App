const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')

require('dotenv').config(); 

const SECRET_KEY = process.env.SECRET_KEY


function validatePassword(value) {
   
 // validate password strength
  return  validator.isStrongPassword(value, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1, 
    minNumbers: 0,
    minSymbols: 1,
    returnScore: false 
  });
}
 // password validator
const passwordValidator = {
  validator: validatePassword,
  message: 'Password must be at least 8 characters with at least one uppercase and lowercase letter, and one special character (@#$%&).'
};

 

const UserShema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      massage: "please enter your email address"
    }

  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: [passwordValidator]
  },

  tokens: [{
    token: String
  }] 
});


// hashing password
UserShema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12)
  }
  if (!user.tokens || !Array.isArray(user.tokens)) {
    user.tokens = [];
  } 
  next();
})


// find user by credentials
UserShema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login. User not found.');
  }
// compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) { // wrong password
    throw new Error('Unable to login. Incorrect password.');
  }

  return user;
};



// generate web token
UserShema.methods.generateAuthToken = async function () {
  const user = this;
  console.log(user._id)
  // Generate an auth token for the user it will expire in 24 hours (24h)
  // Use SECRET_KEY as the secret key
  const token =  jwt.sign({_id : user._id.toString(),},SECRET_KEY,{ expiresIn: '24h' })
  //  add user token to user
   user.tokens = user.tokens.concat({token})
   // save user
   await user.save()
   return  token;   

}



const User = mongoose.model('User', UserShema);
module.exports = User;
