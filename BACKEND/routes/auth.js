const express = require("express"); //for crud aplication
const User = require("../models/User"); //import model of user
const { body, validationResult } = require("express-validator"); //npm module for validation
const routes = express.Router();
const bcrypt = require("bcryptjs"); //npm module for password hashing
var jwt = require("jsonwebtoken"); //npm module for token
const JWT_SECRET = process.env.JWT_SECRET;
const fatchuser = require("../Middleware/fetchuser");
const generateUniqueToken = require("../service/genrateToken");
const sendEmail = require("../service/sendEmail");
const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});
//making post request for sending data to database
//route:1 creating the user post request on /api/createuser
routes.post(
  //endpoint
  "/createuser",
  //validation for name,email,password
  [
    body("name", "name more then 3 charctor").isLength({ min: 3 }),
    body("email", "enter valid email").isEmail(),
    body("password", "password must be 8 charector long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //if any error acure in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      const errorMessages = errors.array().map((error) => error.msg); // Extract error messages
      console.log(errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }
    try {
      //check the given email is allready exist or note if it is in database the this  throw error
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "this email was already registered." });
      }
      //for password hashing
      //first genrate salt and then hash the password with salt
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      //store data that from request massage
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtDATA = jwt.sign(data, JWT_SECRET);
      res.json(jwtDATA);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: error.message });
    }
  }
);
//Autenticat the user with their email and password
//route:2 login the user post request on /api/login :no login required
routes.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password must be 8 charector long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg); // Extract error messages
      console.log(errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "User not Exist" });
      }
      const matchpassword = await bcrypt.compare(password, user.password);
      if (!matchpassword) {
        return res.status(400).json({ errors: "worng password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtDATA = jwt.sign(data, JWT_SECRET);
      res.json(jwtDATA);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: error.message });
    }
  }
);
// route:1 get data of loged user post request on /api/login :no login required
//get user data
routes.post("/getuser", fatchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: error.message });
  }
});
//route for forgot password
//route for generate reset token end send link through email
routes.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const resetToken = generateUniqueToken(); // Replace with your token generation logic
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    const user = await User.findOne({ email });
    if (user) {
      await User.updateOne({ email }, { resetToken, resetTokenExpiry });
      console.log(user);
      const resetLink = `http://127.0.0.1:5501/FRONTEND/resetpassword/resetPassword.html?token=${resetToken}`;
      await sendEmail.sendResetLinkEmail(email, resetLink);
      console.log(process.env.EMAIL);
      console.log(process.env.PASSWORD);
      res.json({
        message: "Password reset email sent.",
        resettoken: resetToken,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ errors: error.message });
  }
});
// route for reset password
routes.post(
  "/reset-password",
  [
    body("email", "enter valid email").isEmail(),
    body("newPassword", "password must be 8 character long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { email, resetToken, newPassword } = req.body;
    try {
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg); // Extract error messages
        console.log(errorMessages);
        return res.status(400).json({ errors: errorMessages }); // Send error response
      }

      const user = await User.findOne({
        email,
        resetToken,
        resetTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ errors: "Invalid or expired reset token." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const result = await User.updateOne(
        { email },
        { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
      );
      if (result.modifiedCount === 1) {
        await sendEmail.sendConfirmationEmail(email);
      }
      if (result.modifiedCount === 1) {
        return res.status(200).json({ message: "Password reset successfully" });
      } else {
        return res.status(400).json({ errors: "Password reset failed" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: error.message }); // Send error response
    }
  }
);

module.exports = routes;
