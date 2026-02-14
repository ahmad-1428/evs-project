import express from 'express';
import {
  updateUserProfile,
  getAllUsers,
} from '../controller/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User profile routes
router.route('/profile').put(protect, updateUserProfile);  // Re-enabled protect
router.route('/test-profile').put(updateUserProfile);  // Keep test route for debugging if needed

// Admin routes
router.route('/admin/users').get(protect, admin, getAllUsers);

export default router;
