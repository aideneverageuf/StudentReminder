// controllers/nlpController.js
import axios from 'axios';
import Task from '../models/taskModel.js';

export const parseAndCompleteTask = async (req, res) => {
  const { text } = req.body;
  const avatar = req.user.avatar;
  const username = req.user.username;

  if (!text) {
    return res.status(400).json({ error: 'Missing text input' });
  }

  try {
    // Call Wit.ai
    const witResponse = await axios.get(`https://api.wit.ai/message?v=20230528&q=${encodeURIComponent(text)}`, {
      headers: {
        Authorization: `Bearer ${process.env.WIT_TOKEN}`
      }
    });

    const entities = witResponse.data.entities;
    const taskTitleKey = Object.keys(entities).find(k => k.startsWith('task_title'));
    const datetimeKey = Object.keys(entities).find(k => k.startsWith('wit$datetime'));

    const course_code = /([A-Z]{3,4}[0-9]{4})/.exec(text)?.[0] || '';
    const task_title = entities[taskTitleKey]?.[0]?.value || '';
    const due_date = entities[datetimeKey]?.[0]?.values?.[0]?.to?.value ||
                     entities[datetimeKey]?.[0]?.values?.[0]?.value || null;

    // Reward avatar
    const baseXP = 10;
    const bonusXP = avatar.streak * 2;

    avatar.xp += baseXP + bonusXP;
    avatar.streak += 1;
    avatar.mood = Math.min(avatar.mood + 5, 100);
    avatar.currency += 20;

    if (avatar.xp >= 100) {
      avatar.level += 1;
      avatar.xp = 0;
    }

    // Save task in MongoDB
    const newTask = await Task.create({
      username,
      task_title,
      course_code,
      due_date
    });

    // Respond with task + updated avatar
    res.status(200).json({
      task: {
        task_title,
        course_code,
        due_date
      },
      avatar
    });

  } catch (error) {
    console.error('Wit.ai error or NLP parse failure:', error.message);
    res.status(500).json({ error: 'Failed to parse task or update avatar' });
  }
};
