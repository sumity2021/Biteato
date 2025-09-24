const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

/* POST /api/food/ [protected]*/
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("mama"),
  foodController.createFood
);

/* GET /api/food/ [protected] */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood
);

router.post(
  "/comment/:foodId",
  authMiddleware.authUserMiddleware,
  foodController.postComment
);

router.get(
  "/comment/:foodId",
  authMiddleware.authUserMiddleware,
  foodController.getComments
);
router.delete(
  "/:foodId",
  authMiddleware.authFoodPartnerMiddleware,
  foodController.deleteFood
);

module.exports = router;
