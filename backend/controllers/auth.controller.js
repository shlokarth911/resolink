const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { register, login } = require("../services/auth.service");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, isAnonymousByDefault } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await register({
      name,
      email,
      password: hashedPassword,
      isAnonymousByDefault,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("user_token", token);

    res.status(200).json({ message: "Register Successful", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    const user = await login({ email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("user_token", token);

    res.status(200).json({ message: "Login Successful", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.registerAnonymousUser = async (req, res) => {
  try {
    const anonymousUser = await User.create({
      isAnonymousByDefault: true,
    });

    const token = jwt.sign(
      { id: anonymousUser._id, anonymous: true },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      token,
      user: {
        id: anonymousUser._id,
        anonymous: true,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.upgradeToUser = async (req, res) => {
  try {
    const { userId, name, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.isAnonymousByDefault = false;

    await user.save();

    res.json({ message: "Account upgraded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
