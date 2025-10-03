# Aurano - Voice-Powered Accountability App

Aurano is a voice-powered productivity app that transforms your spoken intentions into organized action. Built with Next.js, Tailwind CSS, and Framer Motion.

## Features

### Landing Page
- **Hero Section**: Bold wordmark with animated background
- **Features Section**: Three-step process explanation
- **Demo Section**: Interactive mockup of the app
- **Creator Message**: Video placeholder for founder message
- **Testimonials**: User feedback and stats
- **Waitlist CTA**: Email capture form

### Web App MVP
- **Dashboard**: Task overview with productivity score
- **Voice Input Modal**: Record and transcribe tasks
- **Overview Page**: List/calendar view with filters
- **Focus Mode**: Full-screen Pomodoro timer

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Backend**: Supabase (for waitlist and auth)
- **Voice**: Whisper API integration (placeholder)

## Design System

### Colors
- **Black**: #000000 (primary text, buttons)
- **White**: #FFFFFF (background)
- **Beige**: #F5F0E6 (accent, cards)

### Typography
- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing
- Organic, airy layouts with large section breaks
- Consistent padding and margins using Tailwind scale

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aurano
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── app/               # Web app pages
│   │   ├── focus/         # Focus mode page
│   │   └── overview/      # Task overview page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── app/               # Web app components
│   │   ├── Dashboard.tsx
│   │   ├── FocusMode.tsx
│   │   ├── Overview.tsx
│   │   ├── TaskItem.tsx
│   │   ├── CategoryWidget.tsx
│   │   └── VoiceInputModal.tsx
│   └── landing/           # Landing page components
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       ├── DemoSection.tsx
│       ├── CreatorMessageSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── CTASection.tsx
│       └── Navigation.tsx
└── lib/
    ├── utils.ts           # Utility functions
    └── supabase.ts        # Supabase client
```

## Features in Detail

### Voice Input Modal
- Real-time voice recording
- Audio playback and re-recording
- Simulated AI transcription
- Task categorization and priority setting

### Dashboard
- Upcoming tasks with priority indicators
- Category widgets with task counts
- Productivity score calculation
- Quick action buttons

### Focus Mode
- Full-screen Pomodoro timer
- Customizable work/break durations
- Session tracking
- Sound controls and emergency exit

### Overview Page
- List and calendar view toggle
- Advanced filtering by category and priority
- Search functionality
- Task completion tracking

## Responsive Design

The app is fully responsive with:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## Supabase Integration

### Waitlist Table
```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Authentication (Future)
- User registration and login
- Task data persistence
- User preferences and settings

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the Aurano team.

---

Built with ❤️ by the Aurano team# Updated Sat 27 Sep 2025 11:04:47 PDT
# Deployment trigger Fri Oct  3 15:15:02 PDT 2025
