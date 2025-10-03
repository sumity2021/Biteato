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

/* DELETE /api/food/:foodId [protected] */
router.delete(
  "/:foodId",
  authMiddleware.authFoodPartnerMiddleware,
  foodController.deleteFood
);

/* GET /api/food/ [protected] */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

/* POST /api/food/like [protected] */
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

/* POST /api/food/save [protected] */
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

/* comment routes [protected] */
router.delete(
  "/comment/:commentId",
  authMiddleware.authUserMiddleware,
  foodController.deleteComment
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

module.exports = router;
