import { createClient } from '@supabase/supabase-js'

// Values come from the .env file (see .env.example). Vite only exposes variables that start with VITE_.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null when the keys aren't set yet, so the site still works with the local data
export const supabase = url && key ? createClient(url, key) : null
