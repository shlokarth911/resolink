const userModel = require("../models/User");

module.exports.getProfile = async (userId) => {
  try {
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
