import express from 'express';
import supabase from '../supabaseClient.js';

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default app;
