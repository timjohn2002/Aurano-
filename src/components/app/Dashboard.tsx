'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Target, TrendingUp, CheckCircle } from 'lucide-react'
import VoiceInputModal from './VoiceInputModal'
import CategoryWidget from './CategoryWidget'
import TaskItem from './TaskItem'
import Logo from '@/components/ui/Logo'

const mockTasks = [
  {
    id: 1,
    title: "Finish quarterly report",
    category: "Work",
        priority: "high" as const,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    completed: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 2,
    title: "Go to gym",
    category: "Health",
        priority: "medium" as const,
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    completed: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: 3,
    title: "Read 30 pages",
    category: "Learning",
        priority: "low" as const,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    completed: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    id: 4,
    title: "Call mom",
    category: "Personal",
        priority: "medium" as const,
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    completed: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000)
  }
]

const categories = [
  { name: "Work", count: 12, color: "bg-blue-100 text-blue-800" },
  { name: "Health", count: 8, color: "bg-green-100 text-green-800" },
  { name: "Personal", count: 5, color: "bg-purple-100 text-purple-800" },
  { name: "Learning", count: 3, color: "bg-orange-100 text-orange-800" }
]

export default function Dashboard() {
  const [tasks, setTasks] = useState(mockTasks)
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)

  const upcomingTasks = tasks.filter(task => !task.completed).slice(0, 5)
  const completedToday = tasks.filter(task => task.completed).length
  const productivityScore = Math.round((completedToday / tasks.length) * 100)

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="min-h-screen bg-black text-beige">
      {/* Header */}
      <header className="bg-black border-b border-beige/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6">
                <Logo size="sm" variant="text" />
                <div className="hidden md:flex items-center gap-6">
                  <a href="/app" className="text-beige font-medium">Dashboard</a>
                  <a href="/app/overview" className="text-beige/60 hover:text-beige">Overview</a>
                  <a href="/app/focus" className="text-beige/60 hover:text-beige">Focus</a>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex items-center gap-2 bg-beige text-black px-4 py-2 rounded-full hover:bg-beige/80 transition-colors"
            >
              <Mic size={16} />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-serif font-bold text-beige mb-2">
                Good morning! 👋
              </h2>
              <p className="text-beige/60">
                You have {upcomingTasks.length} tasks to complete today
              </p>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-black border border-beige/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-serif font-semibold text-beige">Upcoming Tasks</h3>
                  <a href="/app/overview" className="text-beige/60 hover:text-beige text-sm">
                    View all
                  </a>
                </div>
                
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TaskItem task={task} onToggle={toggleTask} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-beige/10 border border-beige/20 rounded-2xl p-6">
                <h3 className="text-xl font-serif font-semibold text-beige mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setIsVoiceModalOpen(true)}
                    className="flex items-center gap-3 p-4 bg-beige/20 rounded-xl hover:bg-beige/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-beige rounded-full flex items-center justify-center">
                      <Mic size={20} className="text-black" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-beige">Voice Input</div>
                      <div className="text-sm text-beige/60">Add new task</div>
                    </div>
                  </button>
                  
                  <a
                    href="/app/focus"
                    className="flex items-center gap-3 p-4 bg-beige/20 rounded-xl hover:bg-beige/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-beige rounded-full flex items-center justify-center">
                      <Target size={20} className="text-black" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-beige">Focus Mode</div>
                      <div className="text-sm text-beige/60">Start Pomodoro</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Productivity Score */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div 
                className="bg-beige/10 border border-beige/20 rounded-2xl p-6 text-center"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(245, 240, 230, 0.15)',
                  borderColor: 'rgba(245, 240, 230, 0.3)'
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex items-center justify-center gap-2 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <TrendingUp size={20} className="text-beige" />
                  </motion.div>
                  <span className="font-medium text-beige">Productivity Score</span>
                </motion.div>
                
                <motion.div 
                  className="text-4xl font-bold mb-2 text-beige"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3
                  }}
                  key={productivityScore}
                >
                  {productivityScore}%
                </motion.div>
                
                <motion.div 
                  className="text-beige/80 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {completedToday} tasks completed today
                </motion.div>
                
                {/* Animated progress ring */}
                <motion.div 
                  className="relative w-16 h-16 mx-auto mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-beige/20"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      className="text-beige"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: productivityScore / 100 }}
                      transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Category Widgets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-black border border-beige/20 rounded-2xl p-6">
                <h3 className="text-lg font-serif font-semibold text-beige mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <CategoryWidget category={category} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className="bg-black border border-beige/20 rounded-2xl p-6"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: 'rgba(245, 240, 230, 0.3)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.h3 
                      className="text-lg font-serif font-semibold text-beige mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      Recent Activity
                    </motion.h3>
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-beige/5 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.6
                          }}
                        >
                          <CheckCircle size={16} className="text-green-400" />
                        </motion.div>
                        <span className="text-beige/80">Completed &quot;Read 30 pages&quot;</span>
                        <motion.span 
                          className="text-beige/40 ml-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.8 }}
                        >
                          2h ago
                        </motion.span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-beige/5 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.8
                          }}
                        >
                          <Mic size={16} className="text-beige/60" />
                        </motion.div>
                        <span className="text-beige/80">Added &quot;Call mom&quot;</span>
                        <motion.span 
                          className="text-beige/40 ml-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 1.0 }}
                        >
                          30m ago
                        </motion.span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-beige/5 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.9 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 1.0
                          }}
                        >
                          <Target size={16} className="text-beige/60" />
                        </motion.div>
                        <span className="text-beige/80">Started focus session</span>
                        <motion.span 
                          className="text-beige/40 ml-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 1.2 }}
                        >
                          1h ago
                        </motion.span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
          </div>
        </div>
      </div>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onTaskAdded={(newTask) => {
          setTasks([newTask, ...tasks])
          setIsVoiceModalOpen(false)
        }}
      />
    </div>
  )
}
