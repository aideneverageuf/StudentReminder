import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Link to user
  task_title: { type: String, required: true },
  course_code: { type: String },
  due_date: { type: Date },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
