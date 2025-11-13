import express from 'express';
const router = express.Router();
import { updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // <== Add this

router.put('/profile', protect, updateUserProfile); // <== Protect the route

export default router;
