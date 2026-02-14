import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("--- Protect Middleware ---");
  console.log("Authorization header:", req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log("Token extracted:", token ? "Present" : "Missing");

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("Token decoded. User ID:", decoded.id);
      console.log("Token expiration:", new Date(decoded.exp * 1000));

      req.user = await User.findById(decoded.id).select('-password');
      console.log("User found in DB:", !!req.user);
      if (req.user) console.log("User isAdmin:", req.user.isAdmin);

      if (!req.user) {
        console.log("User not found in DB");
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.log("Token verification error:", error.message);
      res.status(401);
      throw new Error(`Not authorized: ${error.message}`);
    }
  } else {
    console.log("No Bearer token in header");
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  console.log("--- Admin Middleware ---");
  console.log("req.user exists:", !!req.user);
  if (req.user) {
    console.log("req.user.isAdmin:", req.user.isAdmin);
    console.log("User ID:", req.user._id);
  }
  if (req.user && req.user.isAdmin) {
    console.log("Admin check passed");
    next();
  } else {
    console.log("Admin check failed - user is not admin");
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
