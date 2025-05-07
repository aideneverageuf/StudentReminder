import express from 'express';
import { getAvatar, completeTask, missedTask, buyShield } from '../controllers/avatarController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAvatar);
router.post('/complete', protect, completeTask);
router.post('/missed', protect, missedTask);
router.post('/buy-shield', protect, buyShield);

export default router;