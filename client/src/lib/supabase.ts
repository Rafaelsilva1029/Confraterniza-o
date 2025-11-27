import { createClient } from "@supabase/supabase-js";

// As variáveis de ambiente do Vite devem ser acessadas via import.meta.env
// O projeto original usa NEXT_PUBLIC_*, vamos adaptar para VITE_PUBLIC_*
const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("As variáveis de ambiente VITE_PUBLIC_SUPABASE_URL e VITE_PUBLIC_SUPABASE_ANON_KEY são obrigatórias.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
