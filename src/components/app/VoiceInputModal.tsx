'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, X, Play, Square, Check, RotateCcw } from 'lucide-react'

interface VoiceInputModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskAdded: (title: string, category: string, dueDate?: string) => void
}

type RecordingState = 'idle' | 'recording' | 'processing' | 'completed'

// Speech Recognition interface
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

// Date parsing function
const parseDateFromText = (text: string): string | null => {
  console.log('parseDateFromText: Input text:', text)
  const lowerText = text.toLowerCase()
  
  // Common date patterns
  const patterns = [
    // "by tomorrow", "by next week", "by next month" - check these first
    /by\s+(tomorrow|next\s+week|next\s+month|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
    // "due tomorrow", "due next week", "due next month"
    /due\s+(tomorrow|next\s+week|next\s+month|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
    // "on tomorrow", "on next week", "on next month"
    /on\s+(tomorrow|next\s+week|next\s+month|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
    // "by October 4th", "by Oct 4"
    /by\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i,
    // "by 10/4", "by 10-4", "by 10.4"
    /by\s+(\d{1,2})[\/\-\.](\d{1,2})/,
    // "on October 4th", "on Oct 4"
    /on\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i,
    // "on 10/4", "on 10-4", "on 10.4"
    /on\s+(\d{1,2})[\/\-\.](\d{1,2})/,
    // "due October 4th", "due Oct 4"
    /due\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i,
    // "due 10/4", "due 10-4", "due 10.4"
    /due\s+(\d{1,2})[\/\-\.](\d{1,2})/,
    // Standalone relative dates (without "by", "due", "on")
    /\b(tomorrow|next\s+week|next\s+month|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    // Month and day anywhere in text (like "October 12th")
    /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i,
    // Numeric dates anywhere in text (like "10/12", "10-12", "10.12")
    /\b(\d{1,2})[\/\-\.](\d{1,2})\b/,
  ]
  
  for (const pattern of patterns) {
    const match = text.match(pattern)
    console.log('parseDateFromText: Testing pattern:', pattern, 'Match:', match)
    if (match) {
      console.log('parseDateFromText: Found match:', match[0])
      try {
        const now = new Date()
        const currentYear = now.getFullYear()
        
        if (match[0].includes('tomorrow')) {
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          return tomorrow.toISOString()
        } else if (match[0].includes('next week')) {
          const nextWeek = new Date()
          nextWeek.setDate(nextWeek.getDate() + 7)
          return nextWeek.toISOString()
        } else if (match[0].includes('next month')) {
          const nextMonth = new Date()
          nextMonth.setMonth(nextMonth.getMonth() + 1)
          return nextMonth.toISOString()
        } else if (match[1] && ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(match[1].toLowerCase())) {
          // Handle day names
          const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
          const targetDay = dayNames.indexOf(match[1].toLowerCase())
          const today = new Date()
          const currentDay = today.getDay()
          
          let daysUntilTarget = targetDay - currentDay
          if (daysUntilTarget <= 0) {
            daysUntilTarget += 7 // Next week
          }
          
          const targetDate = new Date()
          targetDate.setDate(today.getDate() + daysUntilTarget)
          return targetDate.toISOString()
        } else if (match[0] && ['tomorrow', 'next week', 'next month', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(match[0].toLowerCase())) {
          // Handle standalone relative dates
          if (match[0].toLowerCase() === 'tomorrow') {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            return tomorrow.toISOString()
          } else if (match[0].toLowerCase() === 'next week') {
            const nextWeek = new Date()
            nextWeek.setDate(nextWeek.getDate() + 7)
            return nextWeek.toISOString()
          } else if (match[0].toLowerCase() === 'next month') {
            const nextMonth = new Date()
            nextMonth.setMonth(nextMonth.getMonth() + 1)
            return nextMonth.toISOString()
          } else if (['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(match[0].toLowerCase())) {
            // Handle standalone day names
            const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            const targetDay = dayNames.indexOf(match[0].toLowerCase())
            const today = new Date()
            const currentDay = today.getDay()
            
            let daysUntilTarget = targetDay - currentDay
            if (daysUntilTarget <= 0) {
              daysUntilTarget += 7 // Next week
            }
            
            const targetDate = new Date()
            targetDate.setDate(today.getDate() + daysUntilTarget)
            return targetDate.toISOString()
          }
        } else if (match[1] && match[2]) {
          // Handle month name and day
          const monthNames = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
          ]
          const monthAbbrs = [
            'jan', 'feb', 'mar', 'apr', 'may', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
          ]
          
          let monthIndex = -1
          const monthName = match[1].toLowerCase()
          
          if (monthNames.includes(monthName)) {
            monthIndex = monthNames.indexOf(monthName)
          } else if (monthAbbrs.includes(monthName)) {
            monthIndex = monthAbbrs.indexOf(monthName)
          }
          
          if (monthIndex !== -1) {
            const day = parseInt(match[2])
            const date = new Date(currentYear, monthIndex, day)
            
            // If the date has passed this year, assume next year
            if (date < now) {
              date.setFullYear(currentYear + 1)
            }
            
            return date.toISOString()
          }
        } else if (match[1] && match[2] && !isNaN(parseInt(match[1])) && !isNaN(parseInt(match[2]))) {
          // Handle numeric dates like "10/4"
          const month = parseInt(match[1])
          const day = parseInt(match[2])
          
          // Assume MM/DD format if month > 12, otherwise DD/MM
          let actualMonth, actualDay
          if (month > 12) {
            actualMonth = day
            actualDay = month
          } else {
            actualMonth = month
            actualDay = day
          }
          
          const date = new Date(currentYear, actualMonth - 1, actualDay)
          
          // If the date has passed this year, assume next year
          if (date < now) {
            date.setFullYear(currentYear + 1)
          }
          
          return date.toISOString()
        } else if (match[1] && match[2] && isNaN(parseInt(match[1])) && !isNaN(parseInt(match[2]))) {
          // Handle month name and day anywhere in text (like "October 12th")
          const monthNames = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
          ]
          const monthAbbrs = [
            'jan', 'feb', 'mar', 'apr', 'may', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
          ]
          
          let monthIndex = -1
          const monthName = match[1].toLowerCase()
          
          if (monthNames.includes(monthName)) {
            monthIndex = monthNames.indexOf(monthName)
          } else if (monthAbbrs.includes(monthName)) {
            monthIndex = monthAbbrs.indexOf(monthName)
          }
          
          if (monthIndex !== -1) {
            const day = parseInt(match[2])
            const date = new Date(currentYear, monthIndex, day)
            
            // If the date has passed this year, assume next year
            if (date < now) {
              date.setFullYear(currentYear + 1)
            }
            
            return date.toISOString()
          }
        }
      } catch (error) {
        console.error('Error parsing date:', error)
      }
    }
  }
  
  console.log('parseDateFromText: No date found in text:', text)
  return null
}

export default function VoiceInputModal({ isOpen, onClose, onTaskAdded }: VoiceInputModalProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskCategory, setTaskCategory] = useState('Work')
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [dueDate, setDueDate] = useState<string | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const categories = ['Work', 'Health', 'Personal', 'Learning', 'Other']

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setRecordingState('idle')
      setTranscript('')
      setTaskTitle('')
      setTaskCategory('Work')
      setTaskPriority('medium')
      setDueDate(null)
      
      // Initialize speech recognition
      if (typeof window !== 'undefined') {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition()
          recognition.continuous = false
          recognition.interimResults = true
          recognition.lang = 'en-US'
          
          recognition.onresult = (event) => {
            let finalTranscript = ''
            let interimTranscript = ''
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript
              if (event.results[i].isFinal) {
                finalTranscript += transcript
              } else {
                interimTranscript += transcript
              }
            }
            
            const fullTranscript = finalTranscript || interimTranscript
            setTranscript(fullTranscript)
            
            // Auto-extract task title and due date from transcript
            if (finalTranscript) {
              console.log('VoiceInputModal: Processing transcript:', finalTranscript)
              
              // Parse due date from transcript
              const parsedDate = parseDateFromText(finalTranscript)
              console.log('VoiceInputModal: Parsed date:', parsedDate)
              
              if (parsedDate) {
                setDueDate(parsedDate)
                console.log('VoiceInputModal: Set due date to:', parsedDate)
              }
              
              // Simple extraction - take the first sentence or phrase
              const sentences = finalTranscript.split(/[.!?]/)
              const extractedTitle = sentences[0]?.trim() || finalTranscript.trim()
              setTaskTitle(extractedTitle)
            }
          }
          
          recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error)
            setRecordingState('idle')
          }
          
          recognition.onend = () => {
            setRecordingState('completed')
          }
          
          recognitionRef.current = recognition
        }
      }
    }
  }, [isOpen])

  const startRecording = async () => {
    try {
      if (recognitionRef.current) {
        setRecordingState('recording')
        recognitionRef.current.start()
      } else {
        throw new Error('Speech recognition not available')
      }
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      alert('Speech recognition not supported in this browser. Please use Chrome or Edge.')
      setRecordingState('idle')
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current && recordingState === 'recording') {
      recognitionRef.current.stop()
      setRecordingState('processing')
    }
  }

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // const stopPlayback = () => {
  //   if (audioRef.current) {
  //     audioRef.current.pause()
  //     audioRef.current.currentTime = 0
  //     setIsPlaying(false)
  //   }
  // }

  const handleSubmit = () => {
    if (!taskTitle.trim()) {
      alert('Please enter a task title')
      return
    }
    console.log('VoiceInputModal: Submitting task with dueDate:', dueDate)
    onTaskAdded(taskTitle, taskCategory, dueDate || undefined)
    onClose()
  }

  const resetRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }
    setRecordingState('idle')
    setTranscript('')
    setTaskTitle('')
    setDueDate(null)
    setAudioBlob(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          
          {/* Modal */}
          <motion.div
            className="relative bg-black border border-beige/20 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
              <h2 className="text-2xl font-serif font-bold text-beige">Add New Task</h2>
              <button
                onClick={onClose}
                className="absolute right-6 p-2 hover:bg-beige/10 rounded-full transition-colors"
              >
                <X size={24} className="text-beige/60" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Voice Recording Section */}
              <div className="text-center space-y-6">
                {/* Voice Button */}
                <div className="flex flex-col items-center space-y-4">
                  {recordingState === 'idle' && (
                    <motion.button
                      onClick={startRecording}
                      className="w-24 h-24 bg-beige rounded-full flex items-center justify-center hover:bg-beige/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mic size={32} className="text-black" />
                    </motion.button>
                  )}
                  
                  {recordingState === 'recording' && (
                    <motion.button
                      onClick={stopRecording}
                      className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <MicOff size={32} className="text-white" />
                    </motion.button>
                  )}
                  
                  {recordingState === 'processing' && (
                    <div className="w-24 h-24 bg-beige/10 border border-beige/20 rounded-full flex items-center justify-center">
                      <motion.div
                        className="w-8 h-8 border-2 border-beige border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  )}
                  
                  {recordingState === 'completed' && (
                    <div className="flex items-center justify-center gap-4">
                      <motion.button
                        onClick={playRecording}
                        className="w-16 h-16 bg-beige/10 border border-beige/20 rounded-full flex items-center justify-center hover:bg-beige/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPlaying ? (
                          <Square size={20} className="text-beige" />
                        ) : (
                          <Play size={20} className="text-beige ml-1" />
                        )}
                      </motion.button>
                      
                      <motion.button
                        onClick={resetRecording}
                        className="w-16 h-16 bg-beige/10 border border-beige/20 rounded-full flex items-center justify-center hover:bg-beige/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw size={20} className="text-beige" />
                      </motion.button>
                    </div>
                  )}

                  {/* Status Text */}
                  <p className="text-beige/60 text-sm max-w-xs mx-auto">
                    {recordingState === 'idle' && 'Tap to start recording your task'}
                    {recordingState === 'recording' && 'Recording... Tap to stop'}
                    {recordingState === 'processing' && 'Processing your voice...'}
                    {recordingState === 'completed' && 'Recording complete! Review and edit below.'}
                  </p>
                </div>
              </div>

              {/* Transcript */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-beige/10 border border-beige/20 rounded-2xl p-4"
                >
                  <h3 className="font-medium text-beige mb-2">Transcription:</h3>
                  <p className="text-beige/80 italic">"{transcript}"</p>
                </motion.div>
              )}

              {/* Task Details Form */}
              {recordingState === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-beige mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-beige/20 rounded-xl focus:outline-none focus:border-beige transition-colors text-beige placeholder-beige/40"
                      placeholder="Enter task title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-beige mb-2">
                        Category
                      </label>
                      <select
                        value={taskCategory}
                        onChange={(e) => setTaskCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-beige/20 rounded-xl focus:outline-none focus:border-beige transition-colors text-beige"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-beige mb-2">
                        Priority
                      </label>
                      <select
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                        className="w-full px-4 py-3 bg-black border border-beige/20 rounded-xl focus:outline-none focus:border-beige transition-colors text-beige"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-beige/20 rounded-xl text-beige hover:bg-beige/10 transition-colors"
                >
                  Cancel
                </button>
                
                {recordingState === 'completed' && (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-beige text-black rounded-xl hover:bg-beige/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Add Task
                  </button>
                )}
              </div>
            </div>

            {/* Hidden audio element */}
            <audio
              ref={audioRef}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
