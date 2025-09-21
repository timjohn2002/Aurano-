import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Aurano',
  description: 'Your voice-powered productivity dashboard',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}
