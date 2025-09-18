const express = require("express");
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const uploadFile = multer({
  storage: multer.memoryStorage(),
});
/* /api/food-partner/:id */
router.get(
  "/:id",
  authMiddleware.authUserMiddleware,
  foodPartnerController.getFoodPartnerById
);

router.put(
  "/update",
  authMiddleware.authFoodPartnerMiddleware,
  uploadFile.single("avatar"),
  foodPartnerController.updateFoodPartner
);

module.exports = router;
