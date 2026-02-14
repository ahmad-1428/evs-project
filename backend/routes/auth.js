import express from 'express';
import { loginUser, register } from '../controller/auth.js';  // Updated: login -> loginUser

const router = express.Router();

router.post('/login', loginUser);  // Updated: login -> loginUser
router.post('/register', register);

export default router;
