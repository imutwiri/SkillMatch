import express from 'express';
import supabase from '../supabaseClient.js';

const app = express();
app.use(express.json());

// Create skill
app.post('/', async (req, res) => {
  const { title, description, lookingFor, user_id } = req.body;
  const { data, error } = await supabase
    .from('skills')
    .insert([{ title, description, looking_for: lookingFor, user_id }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get skills
app.get('/', async (req, res) => {
  const { data, error } = await supabase.from('skills').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default app;
