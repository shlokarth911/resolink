const mongoose = require("mongoose");

const OrganisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["government", "private", "ngo", "educational", "other"],
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  issues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],

  description: String,

  verified: {
    type: Boolean,
    default: false,
  },

  contactEmail: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Organisation = mongoose.model("Organisation", OrganisationSchema);
module.exports = Organisation;
