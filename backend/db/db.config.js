const mongoose = require("mongoose");

const MONOGO_URI = process.env.MONOGO_URI;

const connectToDB = (req, res) => {
  try {
    mongoose.connect(MONOGO_URI).then(() => {
      console.log(`Connected to Database`);
    });
  } catch (error) {
    console.log(`Error connecting Database ${error}`);
  }
};

module.exports = connectToDB;
