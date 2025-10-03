'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, ArrowRight } from 'lucide-react'
import GlowingButton from './GlowingButton'
import { useUser } from '@/contexts/UserContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const { login, signup, isLoading } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      onClose()
      window.location.href = '/app'
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please try again.')
    }
  }

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log('Google sign-in attempt')
    
    // Create Google OAuth URL
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id'
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
    
    // Redirect to Google OAuth
    window.location.href = googleAuthUrl
  }


  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long!')
      return
    }
    
    try {
      await signup(email, password, name)
      alert(`Account creation successful!\n\nWelcome ${name}!\n\nEmail: ${email}\n\nYou are now a beta tester with your own personal data space.`)
      
      // Reset form and close modal
      setIsSignUp(false)
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      onClose()
      window.location.href = '/app'
    } catch (error) {
      console.error('Signup failed:', error)
      alert('Signup failed. Please try again.')
    }
  }

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password attempt')
    alert('Forgot password functionality would be implemented here')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background overlay with hero section background */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero section background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated background blobs */}
              <motion.div
                className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-beige/20 to-transparent rounded-full blur-3xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-beige/20 to-transparent rounded-full blur-3xl"
                animate={{
                  x: [0, -50, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-beige/10 to-transparent rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Modal content */}
          <motion.div
            className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? 'Create Your Account' : 'Welcome Beta User'}
              </h2>
              <p className="text-white/80 text-lg mb-4">
                {isSignUp ? 'Join Aurano and start being more productive' : 'Try Aurano for free as a beta user now'}
              </p>
              <p className="text-white/60 text-sm">
                {isSignUp ? 'Fill in your details to get started' : 'This is a beta version of Aurano, please report any bugs, features or questions you would like us to address'}
              </p>
            </div>

            {/* Form */}
            {isSignUp ? (
              <form onSubmit={handleSignUpSubmit} className="space-y-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:border-beige focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:border-beige focus:outline-none transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:border-beige focus:outline-none transition-colors"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password field */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:border-beige focus:outline-none transition-colors"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <GlowingButton
                  type="submit"
                  className="w-full justify-center py-4 text-lg font-medium"
                >
                  Create Account
                </GlowingButton>

                {/* Back to login */}
                <div className="text-center">
                  <span className="text-white/60 text-sm">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setIsSignUp(false)}
                      className="text-beige hover:text-beige/80 transition-colors cursor-pointer"
                    >
                      Sign In
                    </button>
                  </span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:border-beige focus:outline-none transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:border-beige focus:outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <button 
                  onClick={handleForgotPassword}
                  className="text-white/60 hover:text-white/80 text-sm transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit button */}
              <GlowingButton
                type="submit"
                className="w-full justify-center py-4 text-lg font-medium"
              >
                Test Now
              </GlowingButton>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-black text-white/40 text-sm font-medium">OR CONTINUE WITH</span>
                </div>
              </div>

              {/* Google login */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>

              {/* Sign up link */}
              <div className="text-center mt-4">
                <button 
                  onClick={() => {
                    setIsSignUp(true)
                  }}
                  className="bg-transparent border-none p-2 cursor-pointer hover:bg-white/5 rounded transition-colors"
                  style={{ 
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span className="text-white/60 text-sm">
                    Don't have an account?{' '}
                  </span>
                  <span className="text-beige hover:text-beige/80 transition-colors underline text-sm">
                    Sign Up
                  </span>
                </button>
              </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
