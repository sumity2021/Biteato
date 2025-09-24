const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const commentModel = require("../models/comment.model");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "food created successfully",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({});
    const result = await Promise.all(
      foodItems.map(async (food) => {
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

    res.status(200).json({
      message: "Food items fetched successfully",
      foodItems: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });
  } else {
    await likeModel.create({
      user: user._id,
      food: foodId,
    });
  }
  const likeCount = await likeModel.countDocuments({ food: foodId });

  res.status(201).json({
    message: "successful",
    likeCount,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });
  } else {
    await saveModel.create({
      user: user._id,
      food: foodId,
    });
  }

  const saveCount = await saveModel.countDocuments({ food: foodId });
  res.status(201).json({
    message: "successful",
    saveCount,
  });
}

async function getSaveFood(req, res) {
  const user = req.user;

  const savedFoods = await saveModel.find({ user: user._id }).populate("food");

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({ message: "No saved foods found" });
  }

  const result = await Promise.all(
    savedFoods.map(async (entry) => {
      const foodId = entry.food._id;
      const [likeCount, saveCount, commentCount] = await Promise.all([
        likeModel.countDocuments({ food: foodId }),
        saveModel.countDocuments({ food: foodId }),
        commentModel.countDocuments({ food: foodId }),
      ]);

      return {
        _id: foodId,
        video: entry.food.video,
        description: entry.food.description,
        likeCount,
        saveCount,
        commentCount,
        foodPartner: entry.food.foodPartner,
      };
    })
  );

  res.status(200).json({
    message: "Saved foods retrieved successfully",
    savedFoods: result,
  });
}

async function getComments(req, res) {
  const { foodId } = req.params;

  const comments = await commentModel
    .find({ food: foodId })
    .populate("user", "fullName");

  res.status(200).json({
    message: "Comments retrieved successfully",
    comments,
  });
}

async function postComment(req, res) {
  const user = req.user;
  const { foodId } = req.params;
  const { text } = req.body;
  const comment = await commentModel.create({
    user: user._id,
    food: foodId,
    text,
  });
  res.status(201).json({
    message: "Comment posted successfully",
    comment,
  });
}

async function deleteFood(req, res) {
  const { foodId } = req.params;
  const foodPartnerId = req.foodPartner._id;

  const foodItem = await foodModel.findOne({
    _id: foodId,
    foodPartner: foodPartnerId,
  });

  if (!foodItem) {
    return res.status(404).json({ message: "Food item not found" });
  }

  try {
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood,
  postComment,
  getComments,
  deleteFood,
};
