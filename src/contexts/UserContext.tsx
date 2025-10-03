'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  isBetaTester: boolean
  createdAt: string
}

interface UserContextType {
  user: User | null
  login: (email: string, password: string, name?: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Generate unique user ID
  const generateUserId = () => {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aurano_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error loading user data:', error)
        localStorage.removeItem('aurano_user')
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage
  const saveUser = (userData: User) => {
    localStorage.setItem('aurano_user', JSON.stringify(userData))
    setUser(userData)
  }

  // Login function
  const login = async (email: string, password: string, name?: string) => {
    setIsLoading(true)
    try {
      // For beta testing, create a new user session
      const userId = generateUserId()
      const userData: User = {
        id: userId,
        email,
        name: name || email.split('@')[0],
        isBetaTester: true,
        createdAt: new Date().toISOString()
      }
      
      saveUser(userData)
      console.log('User logged in:', userData)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      const userId = generateUserId()
      const userData: User = {
        id: userId,
        email,
        name,
        isBetaTester: true,
        createdAt: new Date().toISOString()
      }
      
      saveUser(userData)
      console.log('User signed up:', userData)
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('aurano_user')
    localStorage.removeItem('aurano_user_data')
    setUser(null)
    console.log('User logged out')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
