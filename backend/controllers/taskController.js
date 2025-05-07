import Task from '../models/taskModel.js';

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ username: req.user.username });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve tasks' });
  }
};
