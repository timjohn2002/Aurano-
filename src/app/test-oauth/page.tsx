'use client'

import { useState } from 'react'

export default function TestOAuth() {
  const [clientId, setClientId] = useState('')
  const [testResult, setTestResult] = useState('')

  const testGoogleOAuth = () => {
    if (!clientId) {
      setTestResult('❌ Please enter your Google Client ID first')
      return
    }

    // Create Google OAuth URL
    const redirectUri = `${window.location.origin}/auth/google/callback`
    const scope = 'openid email profile'
    const responseType = 'code'
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `response_type=${responseType}&` +
      `access_type=offline&` +
      `prompt=consent`
    
    setTestResult('✅ OAuth URL generated successfully! Redirecting to Google...')
    
    // Redirect to Google OAuth
    setTimeout(() => {
      window.location.href = googleAuthUrl
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Test Google OAuth</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Google Client ID:</label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter your Google Client ID"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-beige"
            />
          </div>
          
          <button
            onClick={testGoogleOAuth}
            className="w-full bg-beige text-black py-3 rounded-lg font-medium hover:bg-beige/80 transition-colors"
          >
            Test Google OAuth
          </button>
          
          {testResult && (
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-white text-sm">{testResult}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-xs text-white/60">
          <p><strong>Steps to get your Client ID:</strong></p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Go to Google Cloud Console</li>
            <li>Create/select a project</li>
            <li>Enable Google+ API</li>
            <li>Create OAuth 2.0 credentials</li>
            <li>Add redirect URI: <code className="bg-white/10 px-1 rounded">http://localhost:3000/auth/google/callback</code></li>
          </ol>
        </div>
      </div>
    </div>
  )
}
