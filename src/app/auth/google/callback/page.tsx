'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function GoogleCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      setStatus('error')
      setMessage('Google authentication was cancelled or failed.')
      return
    }

    if (code) {
      // In a real implementation, you would:
      // 1. Send the code to your backend
      // 2. Exchange it for an access token
      // 3. Get user information from Google
      // 4. Create or update user in your database
      // 5. Set up user session
      
      console.log('Google OAuth code received:', code)
      setStatus('success')
      setMessage('Google authentication successful! You would be logged in here.')
      
      // For demo purposes, redirect back to home after 3 seconds
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beige mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Authenticating...</h2>
            <p className="text-white/60">Please wait while we verify your Google account.</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-white/60 mb-4">{message}</p>
            <p className="text-white/40 text-sm">Redirecting you back to the homepage...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-red-400 text-6xl mb-4">✗</div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Failed</h2>
            <p className="text-white/60 mb-4">{message}</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-beige text-black px-6 py-2 rounded-lg hover:bg-beige/80 transition-colors"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function GoogleCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beige mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-white/60">Please wait while we process your request.</p>
        </div>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  )
}
