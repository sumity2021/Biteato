const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// user auth APIs
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get(
  "/user/validate",
  authMiddleware.authUserMiddleware,
  authController.validateUser
);

// food partner auth APIs
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.get(
  "/food-partner/validate",
  authMiddleware.authFoodPartnerMiddleware,
  authController.validateUser
);

router.delete("/logout", authController.logout);

module.exports = router;
