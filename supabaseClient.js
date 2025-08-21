import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables: SUPABASE_URL and SUPABASE_KEY");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
