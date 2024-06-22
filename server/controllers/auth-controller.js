const User = require("../models/auth-model");
const UserProfile = require('../models/UserProfile');


 // Import the function for sending emails

const signup = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });
    
    // Send confirmation email upon successful signup
    //await sendConfirmationEmail(email);

    res.status(201).json({ 
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      const token = await userExist.generateToken();
      
      // Send welcome back email upon successful login
     // await sendWelcomeBackEmail(email);

      res.status(200).json({
        message: "Login Successful",
        token: token,
        userId: userExist._id.toString(),
        username:userExist.username,
       
        isAdmin:userExist.isAdmin
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


let bcrypt = require('bcryptjs');

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// to send user data
const user = async (req, res) => {
  try {
    const userData = req.user;
    const data = await User.find({});
    console.log(userData);
    return res.status(200).json({ userData, data });
  } catch (error) {
    console.log('error from the user route', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


const uploaddata=async(req,res)=>{
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const { name, address,email,phone } = req.body;
    const userProfile = new UserProfile({
      name,
      address,
      cv: req.file.path,// Send token in the response
      email,
      phone
      // Assuming userId is available in the request
    });
   const cvdata= await userProfile.save();
    res.status(200).json({ message: cvdata });
  
    console.log(cvdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"internal server error in cv backend"});
  }
}

module.exports = { home, signup, login,user,uploaddata};



