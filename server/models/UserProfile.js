// models/UserProfile.js

const mongoose = require('mongoose');
const { number } = require('zod');

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cv: {
    type: String,
    required: true
  },
  email:{
    type:String,
    require:true
  },
  phone:{
    type:Number,
    required:true
  }
  
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
