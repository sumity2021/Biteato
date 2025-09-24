const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");
const { v4: uuid } = require("uuid");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const commentModel = require("../models/comment.model");

async function getFoodPartnerById(req, res) {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId);
  if (!foodPartner) {
    return res.status(404).json({ message: "Food partner not found" });
  }
  try {
    const foodItemsByFoodPartner = await foodModel.find({
      foodPartner: foodPartnerId,
    });
    const result = await Promise.all(
      foodItemsByFoodPartner.map(async (food) => {
        const [likeCount, saveCount, commentCount] = await Promise.all([
          likeModel.countDocuments({ food: food._id }),
          saveModel.countDocuments({ food: food._id }),
          commentModel.countDocuments({ food: food._id }),
        ]);

        return {
          ...food.toObject(),
          likeCount,
          saveCount,
          commentCount,
        };
      })
    );
    const { password, ...foodPartnerWithoutPassword } = foodPartner.toObject();
    res.status(200).json({
      message: "Food partner retrieved successfully",
      foodPartner: {
        ...foodPartnerWithoutPassword,
        foodItems: result,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
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
