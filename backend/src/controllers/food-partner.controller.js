const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");
const { v4: uuid } = require("uuid");
const storageService = require("../services/storage.service");

async function getFoodPartnerById(req, res) {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId);
  const foodItemsByFoodPartner = await foodModel.find({
    foodPartner: foodPartnerId,
  });

  if (!foodPartner) {
    return res.status(404).json({ message: "Food partner not found" });
  }

  const { password, ...foodPartnerWithoutPassword } = foodPartner.toObject();
  res.status(200).json({
    message: "Food partner retrieved successfully",
    foodPartner: {
      ...foodPartnerWithoutPassword,
      foodItems: foodItemsByFoodPartner,
    },
  });
}

async function updateFoodPartner(req, res) {
  const foodPartner = req.foodPartner;
  const { name, contactName, phone, email, address, storeUrl } = req.body;

  let avatarUrl;
  if (req.file) {
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );
    avatarUrl = fileUploadResult.url;
  }

  const updatedFoodPartner = await foodPartnerModel.findByIdAndUpdate(
    foodPartner._id,
    {
      name,
      contactName,
      phone,
      email,
      address,
      storeUrl,
      ...(avatarUrl && { avatarUrl }),
    },
    { new: true }
  );
  const { password, ...updatedFoodPartnerWithoutPassword } =
    updatedFoodPartner.toObject();

  res.status(200).json({
    message: "Food partner updated successfully",
    updated: {
      ...updatedFoodPartnerWithoutPassword,
    },
  });
}

module.exports = {
  getFoodPartnerById,
  updateFoodPartner,
};
