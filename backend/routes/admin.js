import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { getUsers, getOrders, getProducts } from '../controller/admin.js';  // Updated: Correct path to controller/admin.js (singular)

const router = express.Router();

router.get('/users', protect, admin, getUsers);
router.get('/orders', protect, admin, getOrders);
router.get('/products', protect, admin, getProducts);

export default router;
