const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.register = async ({
  name,
  email,
  password,
  isAnonymousByDefault,
}) => {
  try {
    const user = await User.create({
      name,
      email,
      password,
      isAnonymousByDefault,
    });

    return { user };
  } catch (error) {
    throw error;
  }
};

module.exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
