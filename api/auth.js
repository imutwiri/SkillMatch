import express from 'express';
import supabase from '../supabaseClient.js';

const app = express();
app.use(express.json());

// Health ping (optional, helps testing)
app.get('/', (req, res) => res.json({ ok: true }));

// Register: stores firstName/lastName in user_metadata
app.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName }
      }
    });

    if (error) return res.status(400).json({ error: error.message });

    // NOTE: If email confirmations are ON, data.session can be null until email is confirmed.
    return res.json({ message: 'Registration successful', user: data.user, session: data.session });
  } catch (err) {
    console.error('[register] unexpected', err);
    return res.status(500).json({ error: 'Server error (register)' });
  }
});

// Login: return both user and session (tokens)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: 'Login successful', user: data.user, session: data.session });
  } catch (err) {
    console.error('[login] unexpected', err);
    return res.status(500).json({ error: 'Server error (login)' });
  }
});

// Get current user from access token (for persistence)
app.get('/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) return res.status(400).json({ error: error.message });

    return res.json({ user });
  } catch (err) {
    console.error('[user] unexpected', err);
    return res.status(500).json({ error: 'Server error (user)' });
  }
});

export default app;
