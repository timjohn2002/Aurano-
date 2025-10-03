'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, Target, TrendingUp, CheckCircle } from 'lucide-react'
import VoiceInputModal from './VoiceInputModal'
import CategoryWidget from './CategoryWidget'
import TaskItem from './TaskItem'
import Logo from '@/components/ui/Logo'
import AppNavigation from './AppNavigation'
import { useUser } from '@/contexts/UserContext'
import { useUserData } from '@/hooks/useUserData'

// No mock data - using user-specific data from useUserData hook

  const defaultCategories = [
    { name: "Work", count: 0, color: "bg-blue-100 text-blue-800", isDefault: true },
    { name: "Health", count: 0, color: "bg-red-100 text-red-800", isDefault: true },
    { name: "Personal", count: 0, color: "bg-purple-100 text-purple-800", isDefault: true },
    { name: "Learning", count: 0, color: "bg-green-100 text-green-800", isDefault: true },
    { name: "Other", count: 0, color: "bg-gray-100 text-gray-800", isDefault: true }
  ]

export default function Dashboard() {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)
  const [userCategories, setUserCategories] = useState(defaultCategories)
  const { user } = useUser()
  const { userData, addTask, completeTask, getProductivityMetrics, isLoading } = useUserData()

  // Sync category counts with actual tasks
  useEffect(() => {
    if (userData.tasks) {
      const categoryCounts = userData.tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      setUserCategories(prev => 
        prev.map(cat => ({
          ...cat,
          count: categoryCounts[cat.name] || 0
        }))
      )
    }
  }, [userData.tasks])

  // Function to get greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  // Function to format time ago
  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const upcomingTasks = userData.tasks.filter(task => !task.completed).slice(0, 5)
  const metrics = getProductivityMetrics()

  const handleToggleTask = (taskId: string) => {
    const task = userData.tasks.find(t => t.id === taskId)
    completeTask(taskId)
    
    // Update category count when task is completed
    if (task) {
      setUserCategories(prev => 
        prev.map(cat => 
          cat.name === task.category 
            ? { ...cat, count: Math.max(0, cat.count - 1) }
            : cat
        )
      )
    }
  }

  const handleAddTask = (title: string, category: string, dueDate?: string) => {
    console.log('Dashboard: Adding task with dueDate:', dueDate)
    addTask({
      title,
      category,
      description: '',
      dueDate
    })
  }

  const handleDeleteCategory = (categoryName: string) => {
    setUserCategories(prev => prev.filter(cat => cat.name !== categoryName))
  }

  return (
    <div className="min-h-screen bg-black text-beige">
      {/* Header */}
      <AppNavigation currentPage="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Task Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex items-center gap-2 bg-beige text-black px-4 py-2 rounded-full hover:bg-beige/80 transition-colors"
          >
            <Mic size={16} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
        
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
                {getGreeting()}, {user?.name || 'Beta Tester'}! 👋
              </h2>
              <p className="text-beige/60">
                {upcomingTasks.length === 0 
                  ? "You have no tasks yet. Add your first task to get started!" 
                  : `You have ${upcomingTasks.length} tasks to complete today`
                }
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
                  {upcomingTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-beige/40 mb-4">
                        <Target size={48} className="mx-auto" />
                      </div>
                      <p className="text-beige/60 mb-4">No tasks yet</p>
                      <button
                        onClick={() => setIsVoiceModalOpen(true)}
                        className="text-beige hover:text-beige/80 text-sm underline"
                      >
                        Add your first task
                      </button>
                    </div>
                  ) : (
                    upcomingTasks.map((task, index) => (
                      <motion.div
                        key={`${task.id}_${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <TaskItem 
                          task={{
                            id: task.id,
                            title: task.title,
                            category: task.category,
                            priority: 'medium' as const,
                            dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
                            completed: task.completed,
                            createdAt: new Date(task.createdAt)
                          }} 
                          onToggle={() => handleToggleTask(task.id)} 
                        />
                      </motion.div>
                    ))
                  )}
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

            {/* Tips Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-black border border-beige/20 rounded-2xl p-6">
                <h3 className="text-lg font-serif font-semibold text-beige mb-4">Quick Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-beige/5 border border-beige/10">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-beige text-sm mb-1">Voice Input</h4>
                      <p className="text-xs text-beige/70">Use voice commands to quickly add tasks while multitasking</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-beige/5 border border-beige/10">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-beige text-sm mb-1">Focus Mode</h4>
                      <p className="text-xs text-beige/70">Set work intervals to maintain concentration and productivity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-beige/5 border border-beige/10">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-beige text-sm mb-1">Categories</h4>
                      <p className="text-xs text-beige/70">Organize tasks by type to track progress across different areas</p>
                    </div>
                  </div>
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
                  key={metrics.productivityScore}
                >
                  {metrics.productivityScore}%
                </motion.div>
                
                <motion.div 
                  className="text-beige/80 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {metrics.totalTasksCompleted} tasks completed
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
                      animate={{ pathLength: metrics.productivityScore / 100 }}
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
                  {userCategories && userCategories.length > 0 ? (
                    userCategories.map((category, index) => (
                      <div
                        key={category.name}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          padding: '12px',
                          margin: '5px 0',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: category.name === 'Work' ? '#93c5fd' : 
                                              category.name === 'Health' ? '#fca5a5' : 
                                              category.name === 'Personal' ? '#c4b5fd' : 
                                              category.name === 'Learning' ? '#86efac' : '#d1d5db'
                            }}
                          />
                          <span style={{ color: 'white', fontWeight: '500', fontSize: '16px' }}>{category.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>{category.count}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteCategory(category.name)
                            }}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              padding: '4px',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                            title="Delete category"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
                      No categories available
                    </div>
                  )}
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
                      {userData.activities.length === 0 ? (
                        <motion.div 
                          className="text-center py-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          <div className="text-beige/40 mb-4">
                            <Target size={48} className="mx-auto" />
                          </div>
                          <p className="text-beige/60 mb-4">No recent activity</p>
                          <p className="text-beige/40 text-sm">Start by adding your first task to see activity here</p>
                        </motion.div>
                      ) : (
                        userData.activities.slice(0, 5).map((activity, index) => (
                          <motion.div 
                            key={activity.id}
                            className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-beige/5 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                            whileHover={{ x: 5, scale: 1.02 }}
                          >
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.6 + (index * 0.1)
                              }}
                            >
                              {activity.type === 'task_completed' && <CheckCircle size={16} className="text-green-400" />}
                              {activity.type === 'task_added' && <Mic size={16} className="text-beige/60" />}
                              {activity.type === 'focus_session_started' && <Target size={16} className="text-beige/60" />}
                              {activity.type === 'focus_session_completed' && <CheckCircle size={16} className="text-blue-400" />}
                            </motion.div>
                            <span className="text-beige/80">{activity.title}</span>
                            <motion.span 
                              className="text-beige/40 ml-auto"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                            >
                              {getTimeAgo(activity.timestamp)}
                            </motion.span>
                          </motion.div>
                        ))
                      )}
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
        onTaskAdded={handleAddTask}
      />
    </div>
  )
}
