import { createClient as supabaseCreateClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

export function createClient() {
  return supabaseCreateClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
}
