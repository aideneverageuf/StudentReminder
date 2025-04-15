// routes/nlpRoutes.js
import express from 'express';
import { parseTask } from '../controllers/nlpController.js';

const router = express.Router();

router.post('/parse-task', parseTask);

export default router;
