import { createClient } from "@supabase/supabase-js"

// Credenciais fixas (a chave anon e publica por design)
const SUPABASE_URL = "https://llixurqpryffptdjwvxo.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaXh1cnFwcnlmZnB0ZGp3dnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NTEzNzUsImV4cCI6MjEwNDMyNzM3NX0.K3c6YtT07A-hoewiSxVwG9-429ipChBUR2FAUpvEQe8"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Linha unica que guarda todo o estado do app como JSON
export const APP_STATE_ID = "main"
export const APP_STATE_TABLE = "app_state"
