const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc Register user
// @route POST /api/auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email and password");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const user = await User.create({ name, email, password });

  const token = generateToken(user);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({ id: user._id, name: user.name, email: user.email });
});

// @desc Login user
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ id: user._id, name: user.name, email: user.email });
});

// @desc Logout user
// @route POST /api/auth/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    })
    .json({ message: "Logged out" });
});

// @desc Get current user
// @route GET /api/auth/me
// @access Private
const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

module.exports = { register, login, logout, me };
