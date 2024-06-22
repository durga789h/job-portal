const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const {signupSchema,loginSchema}= require('../validators/auth-validator');
const validate =require('../middlewares/validate-middleware');
const authMiddleware=require('../middlewares/auth-middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

router.route("/").get(authControllers.home);
router.route('/signup').post(validate(signupSchema), authControllers.signup);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route('/user').get(authMiddleware, authControllers.user);
 //user is react state user name and here we are storing their data
 
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

  router.post("/upload", upload.single('cv'),authControllers.uploaddata,(req,res)=>{
    console.log(req.file);
  });
module.exports = router;
