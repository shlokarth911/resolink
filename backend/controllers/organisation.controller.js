const Organisation = require("../models/Organisation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.createOrganisation = async (req, res) => {
  try {
    const { name, type, description, verified, email, contactEmail, password } =
      req.body;

    const existingOrganisation = await Organisation.findOne({ email });
    if (existingOrganisation) {
      return res.status(400).json({ message: "Organisation already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organisation = await Organisation.create({
      name,
      type,
      description,
      verified,
      email,
      contactEmail,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: organisation._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("organisation_token", token);

    return res.status(201).json({
      success: true,
      message: "Organisation created successfully",
      organisation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create organisation",
      error: error.message,
    });
  }
};
