'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock, Flag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface Task {
  id: string
  title: string
  category: string
  priority: 'low' | 'medium' | 'high'
  dueDate: Date
  completed: boolean
  createdAt: Date
}

interface TaskItemProps {
  task: Task
  onToggle: (taskId: string) => void
}

const priorityColors = {
  low: 'text-gray-500',
  medium: 'text-yellow-600',
  high: 'text-red-600'
}

const priorityIcons = {
  low: <Flag size={12} className="text-gray-500 w-3 h-3" />,
  medium: <Flag size={12} className="text-yellow-600 w-3 h-3" />,
  high: <Flag size={12} className="text-red-600 w-3 h-3" />
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isOverdue, setIsOverdue] = useState(false)
  const [isDueToday, setIsDueToday] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const now = new Date()
    setIsOverdue(!task.completed && task.dueDate < now)
    setIsDueToday(!task.completed && task.dueDate.toDateString() === now.toDateString())
  }, [task.completed, task.dueDate])

  return (
    <motion.div
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-beige/10 transition-colors ${
        task.completed ? 'opacity-60' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 hover:scale-110 transition-transform"
      >
        {task.completed ? (
          <CheckCircle size={20} className="text-green-400" />
        ) : (
          <Circle size={20} className="text-beige/40 hover:text-beige/60" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1 relative">
          <span className={`font-medium text-beige flex-1 pr-6 ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </span>
          <div className="absolute top-0 right-0 w-3 h-3 flex items-center justify-center">
            {priorityIcons[task.priority]}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-beige/60">
          <span className="px-2 py-1 bg-beige/20 text-beige rounded-full text-xs">
            {task.category}
          </span>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span className={isOverdue ? 'text-red-400' : isDueToday ? 'text-yellow-400' : 'text-beige/60'}>
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
