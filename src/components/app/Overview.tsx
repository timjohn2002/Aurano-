'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, List, Filter, Search, ChevronDown } from 'lucide-react'
import TaskItem from './TaskItem'
import Logo from '@/components/ui/Logo'
import AppNavigation from './AppNavigation'
import { useUser } from '@/contexts/UserContext'
import { useUserData } from '@/hooks/useUserData'

const categories = ['All', 'Work', 'Health', 'Personal', 'Learning']
const priorities = ['All', 'High', 'Medium', 'Low']

export default function Overview() {
  const { user } = useUser()
  const { userData, completeTask, isLoading, getProductivityMetrics } = useUserData()
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPriority, setSelectedPriority] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Show loading state if user data is still loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-beige">
        <p>Loading overview...</p>
      </div>
    )
  }

  // If no user is logged in, redirect to login or show a message
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-beige">
        <div className="text-center">
          <p className="text-xl mb-4">Please log in to view your tasks</p>
          <a href="/" className="text-beige hover:text-beige/80 underline">
            Go to homepage
          </a>
        </div>
      </div>
    )
  }

  const tasks = userData.tasks

  const toggleTask = (taskId: string) => {
    completeTask(taskId)
  }

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const completedTasks = filteredTasks.filter(task => task.completed)
  const pendingTasks = filteredTasks.filter(task => !task.completed)

  return (
    <div className="min-h-screen bg-black text-beige">
      {/* Header */}
      <AppNavigation currentPage="overview" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother animation
          }}
          className="mb-8"
        >
          <motion.h2 
            className="text-3xl font-serif font-bold text-beige mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Task Overview
          </motion.h2>
          <motion.p 
            className="text-beige/60"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {filteredTasks.length} tasks • {completedTasks.length} completed • {pendingTasks.length} pending
          </motion.p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7, 
            delay: 0.15, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* View Toggle */}
            <motion.div 
              className="flex items-center gap-2 bg-beige/10 rounded-xl p-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-beige text-black shadow-sm' : 'hover:bg-beige/20 text-beige'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <List size={16} />
                <span className="text-sm font-medium">List</span>
              </motion.button>
              <motion.button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'calendar' ? 'bg-beige text-black shadow-sm' : 'hover:bg-beige/20 text-beige'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <Calendar size={16} />
                <span className="text-sm font-medium">Calendar</span>
              </motion.button>
            </motion.div>

            {/* Search and Filters */}
            <motion.div 
              className="flex items-center gap-4 w-full lg:w-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            >
              <motion.div 
                className="relative flex-1 lg:w-80"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beige/40" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black border border-beige/20 rounded-xl focus:outline-none focus:border-beige transition-all duration-300 text-beige placeholder-beige/40"
                />
              </motion.div>
              
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-beige/20 rounded-xl hover:bg-beige/10 transition-all duration-300 text-beige"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter size={16} />
                <span className="text-sm">Filters</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                height: { duration: 0.3 }
              }}
              className="mt-4 p-4 bg-beige/10 border border-beige/20 rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-beige mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 bg-black border border-beige/20 rounded-lg focus:outline-none focus:border-beige transition-colors text-beige appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23F5F0E6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1rem'
                    }}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-beige mb-2">Priority</label>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 bg-black border border-beige/20 rounded-lg focus:outline-none focus:border-beige transition-colors text-beige appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23F5F0E6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1rem'
                    }}
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Tasks List */}
        {viewMode === 'list' ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="space-y-6"
          >
            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <motion.h3 
                  className="text-lg font-serif font-semibold text-beige mb-4"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                >
                  Pending Tasks
                </motion.h3>
                <motion.div 
                  className="bg-black border border-beige/20 rounded-2xl p-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                >
                  <div className="space-y-3">
                    {pendingTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -25, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.7 + (index * 0.08), 
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{ x: 5, scale: 1.01 }}
                        layout
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
                          onToggle={() => toggleTask(task.id)} 
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                <motion.h3 
                  className="text-lg font-serif font-semibold text-beige mb-4"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                >
                  Completed Tasks
                </motion.h3>
                <motion.div 
                  className="bg-black border border-beige/20 rounded-2xl p-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                >
                  <div className="space-y-3">
                    {completedTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -25, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.8 + (index * 0.08), 
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{ x: 5, scale: 1.01 }}
                        layout
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
                          onToggle={() => toggleTask(task.id)} 
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.4, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-center py-12"
              >
                <motion.div 
                  className="w-24 h-24 bg-beige/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <List size={32} className="text-beige/40" />
                </motion.div>
                <motion.h3 
                  className="text-lg font-medium text-beige mb-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                >
                  No tasks found
                </motion.h3>
                <motion.p 
                  className="text-beige/60"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
                >
                  Try adjusting your filters or search query
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Calendar View Placeholder */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="bg-black border border-beige/20 rounded-2xl p-8 text-center"
          >
            <motion.div 
              className="w-24 h-24 bg-beige/20 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <Calendar size={32} className="text-beige/40" />
            </motion.div>
            <motion.h3 
              className="text-lg font-medium text-beige mb-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            >
              Calendar View
            </motion.h3>
            <motion.p 
              className="text-beige/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            >
              Calendar view coming soon! For now, use the list view to manage your tasks.
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
