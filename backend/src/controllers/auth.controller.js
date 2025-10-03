const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendResetEmail } = require("../services/mail.service");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // required for cross-site
    sameSite: "None", // required for cross-site
    path: "/",
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password, phone, address, contactName } = req.body;

  const isAccountAlreadyExists = await foodPartnerModel.findOne({
    email,
  });

  if (isAccountAlreadyExists) {
    return res.status(400).json({
      message: "Food partner account already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(201).json({
    message: "Food partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
      address: foodPartner.address,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(200).json({
    message: "Food partner logged in successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

function validateUser(req, res) {
  res.status(200).json({
    valid: true,
  });
}

function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "logged out successfully",
  });
}

async function forgetPassword(req, res) {
  const { email } = req.body;
  const { userType } = req.params;
  try {
    let user;
    if (userType == "user") {
      user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
    } else if (userType == "foodpartner") {
      user = await foodPartnerModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "Food partner not found" });
      }
    }
    const resetToken = jwt.sign(
      { userId: user._id, type: userType },
      process.env.JWT_RESET_PASSWORD_SECRET,
      { expiresIn: "10m" }
    );
    await sendResetEmail(email, resetToken);
    return res.status(200).json({ message: "Reset email sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function changePassword(req, res) {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const { userId, type } = decoded;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    if (type == "user") {
      await userModel.findByIdAndUpdate(userId, { password: hashedPassword });
    } else if (type == "foodpartner") {
      await foodPartnerModel.findByIdAndUpdate(userId, {
        password: hashedPassword,
      });
    }
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("There was an error!", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  registerUser,
  loginUser,
  logout,
  registerFoodPartner,
  loginFoodPartner,
  validateUser,
  forgetPassword,
  changePassword,
};
