// routes/nlpRoutes.js
import express from 'express';
import { parseAndCompleteTask } from '../controllers/nlpController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/parse-complete', protect, parseAndCompleteTask);

export default router;
