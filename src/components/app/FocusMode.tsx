'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, X, Settings, Volume2, VolumeX } from 'lucide-react'
import AppNavigation from './AppNavigation'

type TimerState = 'idle' | 'running' | 'paused' | 'completed'

const WORK_DURATION = 25 * 60 // 25 minutes in seconds
const SHORT_BREAK = 5 * 60 // 5 minutes in seconds
const LONG_BREAK = 15 * 60 // 15 minutes in seconds

export default function FocusMode() {
  const [timerState, setTimerState] = useState<TimerState>('idle')
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION)
  const [currentSession, setCurrentSession] = useState<'work' | 'shortBreak' | 'longBreak'>('work')
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [customWorkDuration, setCustomWorkDuration] = useState('')
  const [customBreakDuration, setCustomBreakDuration] = useState('')
  const [workDuration, setWorkDuration] = useState(WORK_DURATION)
  const [breakDuration, setBreakDuration] = useState(SHORT_BREAK)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (timerState === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerState])

  const handleTimerComplete = () => {
    setTimerState('completed')
    if (isSoundEnabled) {
      // Play completion sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      } catch (error) {
        console.log('Audio not supported or blocked by browser')
      }
    }
  }

  const startTimer = () => {
    setTimerState('running')
  }

  const pauseTimer = () => {
    setTimerState('paused')
  }

  const resetTimer = () => {
    setTimerState('idle')
    const duration = currentSession === 'work' ? workDuration : 
                    currentSession === 'shortBreak' ? breakDuration : 
                    LONG_BREAK
    setTimeLeft(duration)
  }

  const nextSession = () => {
    if (currentSession === 'work') {
      setSessionsCompleted(prev => prev + 1)
      
      // If break duration is 0, skip break and go directly to next work session
      if (breakDuration === 0) {
        setCurrentSession('work')
        setTimeLeft(workDuration)
      } else {
        // Normal break logic
        if (sessionsCompleted + 1 >= 4) {
          setCurrentSession('longBreak')
          setTimeLeft(LONG_BREAK)
        } else {
          setCurrentSession('shortBreak')
          setTimeLeft(breakDuration)
        }
      }
    } else {
      setCurrentSession('work')
      setTimeLeft(workDuration)
    }
    setTimerState('idle')
  }

  const skipBreak = () => {
    // Skip break and go directly to next work session
    setCurrentSession('work')
    setTimeLeft(workDuration)
    setTimerState('idle')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getSessionTitle = () => {
    switch (currentSession) {
      case 'work': return 'Focus Time'
      case 'shortBreak': return 'Short Break'
      case 'longBreak': return 'Long Break'
    }
  }

  const getSessionColor = () => {
    switch (currentSession) {
      case 'work': return 'text-black'
      case 'shortBreak': return 'text-green-600'
      case 'longBreak': return 'text-blue-600'
    }
  }

  return (
    <div className="min-h-screen bg-black text-beige">
      {/* Header */}
      <AppNavigation currentPage="focus" />
      
      <div className="flex items-center justify-center relative overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-beige rounded-full" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-beige rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-beige rounded-full" />
      </div>

      {/* Emergency Exit */}
      <motion.button
        onClick={() => window.location.href = '/app'}
        className="absolute top-8 right-8 p-3 border border-beige/30 rounded-full hover:bg-beige/10 transition-colors z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X size={24} className="text-beige" />
      </motion.button>

      {/* Settings */}
      <motion.button
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-8 left-8 p-3 border border-beige/30 rounded-full hover:bg-beige/10 transition-colors z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings size={24} className="text-beige" />
      </motion.button>

      {/* Sound Toggle */}
      <motion.button
        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
        className="absolute top-8 left-20 p-3 border border-beige/30 rounded-full hover:bg-beige/10 transition-colors z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSoundEnabled ? <Volume2 size={24} className="text-beige" /> : <VolumeX size={24} className="text-beige" />}
      </motion.button>

      {/* Main Timer */}
      <div className="text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Session Info */}
          <div className="mb-8">
            <h1 className={`text-2xl font-serif font-bold mb-2 ${getSessionColor()}`}>
              {getSessionTitle()}
            </h1>
            <p className="text-beige/60">
              Session {sessionsCompleted + 1} of 4
            </p>
          </div>

          {/* Timer Circle */}
          <div className="relative mb-12">
            <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto relative">
              {/* Background Circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-beige/20"
                />
                {/* Progress Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className={getSessionColor()}
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (timeLeft / (currentSession === 'work' ? workDuration : currentSession === 'shortBreak' ? breakDuration : LONG_BREAK))}`}
                />
              </svg>
              
              {/* Timer Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  key={timeLeft}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold"
                >
                  {formatTime(timeLeft)}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            {timerState === 'idle' && (
              <motion.button
                onClick={startTimer}
                className="w-16 h-16 bg-beige text-black rounded-full flex items-center justify-center hover:bg-beige/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} className="ml-1" />
              </motion.button>
            )}

            {timerState === 'running' && (
              <motion.button
                onClick={pauseTimer}
                className="w-16 h-16 bg-beige text-black rounded-full flex items-center justify-center hover:bg-beige/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Pause size={24} />
              </motion.button>
            )}

            {timerState === 'paused' && (
              <>
                <motion.button
                  onClick={startTimer}
                  className="w-16 h-16 bg-beige text-black rounded-full flex items-center justify-center hover:bg-beige/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={24} className="ml-1" />
                </motion.button>
                
                <motion.button
                  onClick={resetTimer}
                  className="w-12 h-12 border border-beige/50 rounded-full flex items-center justify-center hover:bg-beige/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={20} />
                </motion.button>
              </>
            )}

            {timerState === 'completed' && (
              <div className="flex gap-4">
                <motion.button
                  onClick={nextSession}
                  className="px-8 py-4 bg-beige text-black rounded-full font-semibold hover:bg-beige/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next Session
                </motion.button>
                
                {(currentSession === 'shortBreak' || currentSession === 'longBreak') && (
                  <motion.button
                    onClick={skipBreak}
                    className="px-8 py-4 border border-beige/50 text-beige rounded-full font-semibold hover:bg-beige/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Skip Break
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* Session Stats */}
          <div className="mt-12 text-beige/60">
            <p>Completed: {sessionsCompleted} focus sessions</p>
          </div>
        </motion.div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
            
            {/* Modal */}
            <motion.div
              className="relative bg-black border border-beige/20 rounded-3xl shadow-2xl max-w-md w-full"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(245, 240, 230, 0.1),
                  0 0 20px rgba(245, 240, 230, 0.15),
                  0 0 40px rgba(245, 240, 230, 0.1),
                  0 0 80px rgba(245, 240, 230, 0.05),
                  0 25px 50px -12px rgba(0, 0, 0, 0.8)
                `
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="relative flex items-center justify-center p-6 border-b border-beige/20">
                <h2 className="text-2xl font-serif font-bold text-beige">Timer Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="absolute right-6 p-2 hover:bg-beige/10 rounded-full transition-colors"
                >
                  <X size={24} className="text-beige/60" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-beige mb-2">
                      Work Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={customWorkDuration}
                      onChange={(e) => {
                        setCustomWorkDuration(e.target.value)
                      }}
                      className="w-full px-4 py-3 bg-black border border-beige/20 rounded-xl focus:outline-none focus:border-beige transition-colors text-beige placeholder-beige/40"
                      min="1"
                      max="60"
                      placeholder="25"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-beige mb-2">
                      Break Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={customBreakDuration}
                      onChange={(e) => {
                        setCustomBreakDuration(e.target.value)
                      }}
                      className="w-full px-4 py-3 bg-black border border-beige/20 rounded-xl focus:outline-none focus:border-beige transition-colors text-beige placeholder-beige/40"
                      min="1"
                      max="30"
                      placeholder="5"
                    />
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-6 py-3 border border-beige/20 rounded-xl text-beige hover:bg-beige/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const workValue = parseInt(customWorkDuration)
                      const breakValue = parseInt(customBreakDuration)
                      
                      // Allow starting with just work duration, or both work and break
                      const isWorkValid = workValue >= 1 && workValue <= 60
                      const isBreakValid = breakValue >= 0 && breakValue <= 30
                      const isBreakEmpty = customBreakDuration === '' || isNaN(breakValue)
                      
                      if (isWorkValid && (isBreakValid || isBreakEmpty)) {
                        const workSeconds = workValue * 60
                        const breakSeconds = isBreakValid ? breakValue * 60 : 0 // Use 0 if no break time entered
                        
                        setWorkDuration(workSeconds) // Convert minutes to seconds
                        setBreakDuration(breakSeconds) // Convert minutes to seconds
                        setTimeLeft(workSeconds) // Convert minutes to seconds
                        setShowSettings(false)
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-beige text-black rounded-xl hover:bg-beige/80 transition-colors"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}
