'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, X, Play, Square, Check, RotateCcw } from 'lucide-react'

interface VoiceInputModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskAdded: (task: { id: number; title: string; category: string; priority: "low" | "medium" | "high"; dueDate: Date; completed: boolean; createdAt: Date }) => void
}

type RecordingState = 'idle' | 'recording' | 'processing' | 'completed'

export default function VoiceInputModal({ isOpen, onClose, onTaskAdded }: VoiceInputModalProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskCategory, setTaskCategory] = useState('Work')
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium')
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const categories = ['Work', 'Health', 'Personal', 'Learning', 'Other']

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setRecordingState('idle')
      setTranscript('')
      setTaskTitle('')
      setTaskCategory('Work')
      setTaskPriority('medium')
    }
  }, [isOpen])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const chunks: BlobPart[] = []
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        // Simulate transcription
        setTimeout(() => {
          setTranscript("I need to finish the quarterly report by Friday")
          setTaskTitle("Finish quarterly report")
          setRecordingState('completed')
        }, 2000)
      }
      
      mediaRecorder.start()
      setRecordingState('recording')
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Please allow microphone access to use voice input')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.stop()
      setRecordingState('processing')
      
      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
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
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      category: taskCategory,
      priority: taskPriority as "low" | "medium" | "high",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      completed: false,
      createdAt: new Date()
    }
    
    onTaskAdded(newTask)
  }

  const resetRecording = () => {
    setRecordingState('idle')
    setTranscript('')
    setTaskTitle('')
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
