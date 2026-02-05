const Organisation = require("../models/Organisation");
const Issue = require("../models/Issue");

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

    const organisationResponse = organisation.toObject();
    delete organisationResponse.password;

    const token = jwt.sign({ id: organisation._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("organisation_token", token);

    return res.status(201).json({
      success: true,
      message: "Organisation created successfully",
      organisation: organisationResponse,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create organisation",
      error: error.message,
    });
  }
};

module.exports.loginOrganisation = async (req, res) => {
  try {
    const { email, password } = req.body;

    const organisation = await Organisation.findOne({ email });
    if (!organisation) {
      return res.status(400).json({ message: "Organisation not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      organisation.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: organisation._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("organisation_token", token);

    const organisationResponse = organisation.toObject();
    delete organisationResponse.password;

    return res.status(200).json({
      success: true,
      message: "Organisation logged in successfully",
      organisation: organisationResponse,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login organisation",
      error: error.message,
    });
  }
};

module.exports.logoutOrganisation = async (req, res) => {
  try {
    res.clearCookie("organisation_token");
    return res.status(200).json({
      success: true,
      message: "Organisation logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to logout organisation",
      error: error.message,
    });
  }
};

module.exports.getOrganisationProfile = async (req, res) => {
  try {
    const organisation = await Organisation.findById(
      req.organisation.id,
    ).select("-password");
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Organisation fetched successfully",
      organisation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch organisation",
      error: error.message,
    });
  }
};

module.exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.find().select("-password");
    return res.status(200).json({
      success: true,
      message: "Organisations fetched successfully",
      organisations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch organisations",
      error: error.message,
    });
  }
};
