import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function addToWaitlist(email: string) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([
      { email, created_at: new Date().toISOString() }
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
