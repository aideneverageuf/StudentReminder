// controllers/nlpController.js
import axios from 'axios';

export const parseTask = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text field in request body' });
  }

  try {
    const response = await axios.get(`https://api.wit.ai/message?v=20230528&q=${encodeURIComponent(text)}`, {
      headers: {
        Authorization: `Bearer ${process.env.WIT_TOKEN}`
      }
    });

    const entities = response.data.entities;
    console.log('🔍 Wit.ai entities:', entities);

    // Updated keys to match Wit.ai's role-qualified keys
    const taskTitleKey = Object.keys(entities).find(k => k.startsWith('task_title'));
    const datetimeKey = Object.keys(entities).find(k => k.startsWith('wit$datetime'));
    const courseCodeMatch = /([A-Z]{3,4}[0-9]{4})/.exec(text); // Extracts something like MAC2311

    const task_title = entities[taskTitleKey]?.[0]?.value || '';
    const course_code = courseCodeMatch ? courseCodeMatch[0] : '';
    const due_date = entities[datetimeKey]?.[0]?.values?.[0]?.to?.value || 
                     entities[datetimeKey]?.[0]?.values?.[0]?.value || '';

    return res.json({ task_title, course_code, due_date });

  } catch (error) {
    console.error('❌ Error calling Wit.ai:', error.message);
    return res.status(500).json({ error: 'Failed to parse task' });
  }
};
