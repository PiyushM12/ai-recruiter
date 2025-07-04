import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
)



// 1045641468936-cbl780gk3u7qkcfbir3jpb595utpr2ev.apps.googleusercontent.com cliennt id 
// client ssec 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