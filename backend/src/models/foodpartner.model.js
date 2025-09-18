const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  avatarUrl: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  storeUrl: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
});

const foodPartnerModel = mongoose.model("foodpartner", foodPartnerSchema);

module.exports = foodPartnerModel;
