import { protect } from '../middleware/authMiddleware.js';

router.route('/profile').put(protect, updateUserProfile);