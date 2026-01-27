const { getProfile } = require("../services/user.service");

module.exports.getProfile = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);
    return res
      .status(200)
      .json({ message: "Profile fetched successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.logOut = async (req, res) => {
  try {
    res.clearCookie("user_token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
