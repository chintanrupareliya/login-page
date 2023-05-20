//A function for connect to database
require("dotenv").config();
const mongoose = require("mongoose"); //package that makes mongodb easy
const mongoURL = process.env.MONGO_URL; //mongodb database url
const connectToMongo = () => {
  //hear we use then syntex for callback function
  mongoose.connect(mongoURL).then(() => {
    console.log("mongodb conected...");
  });
};
module.exports = connectToMongo; //export the function
