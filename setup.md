# Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenAI API for Whisper (voice transcription)
OPENAI_API_KEY=your_openai_api_key_here
```

## Supabase Setup

1. Create a new Supabase project
2. Go to Settings > API to get your URL and anon key
3. Create a waitlist table:

```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## OpenAI Setup

1. Get an API key from OpenAI
2. Add it to your environment variables
3. The app will use Whisper API for voice transcription
