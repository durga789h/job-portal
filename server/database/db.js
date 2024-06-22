const mongoose=require("mongoose");

const dbConnection = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL);
  
      console.log("connected successfully");
    } catch (error) {
      console.log("DB Error: " + error);
    }
  };
  module.exports=dbConnection;