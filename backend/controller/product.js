import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// @desc    Update user profile (name only)
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("--- updateUserProfile Called ---");
  console.log("Request body:", req.body);

  // Auth check
  if (!req.user || !req.user._id) {
    console.log("Error: No valid user in request");
    res.status(401);
    throw new Error("Authentication failed. Please log in.");
  }

  try {
    // Validate request
    if (!req.body || !req.body.name || typeof req.body.name !== 'string' || req.body.name.trim().length < 3) {
      console.log("Error: Invalid name");
      return res.status(400).json({ message: "Name must be a string of at least 3 characters" });
    }

    const newName = req.body.name.trim();
    console.log("Validated name:", newName);

    // Fetch and update the authenticated user
    const user = await User.findById(req.user._id);
    if (!user) {
      console.log("Error: User not found");
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found. Current name:", user.name);

    // Update and save
    user.name = newName;
    const updatedUser = await user.save();
    console.log("User saved successfully. New name:", updatedUser.name);

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: req.user.token,  // Preserve token
    });
  } catch (error) {
    console.log("Error in updateUserProfile:", error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// @desc    Get all users
// @route   GET /api/users/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  console.log("Fetching all users");
  try {
    const users = await User.find({});
    console.log("Users fetched:", users.length);
    res.json(users);
  } catch (error) {
    console.log("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});
