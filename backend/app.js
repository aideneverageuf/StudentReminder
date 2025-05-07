// app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import nlpRoutes from './routes/nlpRoutes.js';
import userRoutes from './routes/userRoutes.js';
import avatarRoutes from './routes/avatarRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error("MongoDB connection error: ", err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes); //signup and login
app.use('/api/nlp', nlpRoutes); //nlp and task completion
app.use('/api/avatar', avatarRoutes); //xp, streak, shield
app.use('api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Student Reminder App Backend is running');
});

//start of server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
