// app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nlpRoutes from './routes/nlpRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/nlp', nlpRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
