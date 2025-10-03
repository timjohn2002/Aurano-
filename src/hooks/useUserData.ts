'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  completedAt?: string
  category: string
  dueDate?: string
}

interface Habit {
  id: string
  title: string
  description?: string
  frequency: 'daily' | 'weekly' | 'monthly'
  streak: number
  lastCompleted?: string
  createdAt: string
}

interface Activity {
  id: string
  type: 'task_completed' | 'task_added' | 'focus_session_started' | 'focus_session_completed'
  title: string
  timestamp: string
}

interface UserData {
  tasks: Task[]
  habits: Habit[]
  activities: Activity[]
  productivityScore: number
  totalTasksCompleted: number
  currentStreak: number
  lastActiveDate: string
}

const defaultUserData: UserData = {
  tasks: [],
  habits: [],
  activities: [],
  productivityScore: 0,
  totalTasksCompleted: 0,
  currentStreak: 0,
  lastActiveDate: new Date().toISOString()
}

export function useUserData() {
  const { user } = useUser()
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [isLoading, setIsLoading] = useState(true)

  // Load user data from localStorage
  useEffect(() => {
    if (user) {
      const storageKey = `aurano_user_data_${user.id}`
      const savedData = localStorage.getItem(storageKey)
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          
          // Clean up duplicate tasks by removing duplicates and keeping the latest one
          const uniqueTasks = parsedData.tasks.reduce((acc: Task[], current: Task) => {
            const existingIndex = acc.findIndex(task => task.id === current.id)
            if (existingIndex === -1) {
              acc.push(current)
            } else {
              // If duplicate found, keep the one with the latest createdAt
              if (new Date(current.createdAt) > new Date(acc[existingIndex].createdAt)) {
                acc[existingIndex] = current
              }
            }
            return acc
          }, [])
          
          // Update the data with cleaned tasks
          const cleanedData = {
            ...parsedData,
            tasks: uniqueTasks
          }
          
          setUserData(cleanedData)
          
          // Save the cleaned data back to localStorage if duplicates were found
          if (uniqueTasks.length !== parsedData.tasks.length) {
            localStorage.setItem(storageKey, JSON.stringify(cleanedData))
            console.log(`Cleaned up ${parsedData.tasks.length - uniqueTasks.length} duplicate tasks`)
          }
        } catch (error) {
          console.error('Error loading user data:', error)
          setUserData(defaultUserData)
        }
      } else {
        // First time user - start with empty data
        setUserData(defaultUserData)
      }
      setIsLoading(false)
    } else {
      setUserData(defaultUserData)
      setIsLoading(false)
    }
  }, [user])

  // Save user data to localStorage
  const saveUserData = (newData: UserData) => {
    if (user) {
      const storageKey = `aurano_user_data_${user.id}`
      localStorage.setItem(storageKey, JSON.stringify(newData))
      setUserData(newData)
    }
  }

  // Add activity to user data
  const addActivity = (type: Activity['type'], title: string) => {
    const newActivity: Activity = {
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      timestamp: new Date().toISOString()
    }
    
    // Get the current user data from state instead of using the stale userData
    setUserData(currentData => {
      const updatedData = {
        ...currentData,
        activities: [newActivity, ...currentData.activities].slice(0, 10) // Keep only last 10 activities
      }
      saveUserData(updatedData)
      return updatedData
    })
  }

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    console.log('useUserData: Adding task with dueDate:', task.dueDate)
    const newTask: Task = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      completed: false
    }
    console.log('useUserData: Created task:', newTask)
    
    // Use setUserData to get the current state and update it
    setUserData(currentData => {
      // Check if a task with the same title already exists (prevent duplicates)
      const existingTask = currentData.tasks.find(t => 
        t.title.toLowerCase().trim() === task.title.toLowerCase().trim() && !t.completed
      )
      
      if (existingTask) {
        console.log('Task already exists:', task.title)
        return currentData // Don't add duplicate
      }
      
      const updatedData = {
        ...currentData,
        tasks: [...currentData.tasks, newTask],
        activities: [
          {
            id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'task_added' as const,
            title: `Added "${task.title}"`,
            timestamp: new Date().toISOString()
          },
          ...currentData.activities
        ].slice(0, 10) // Keep only last 10 activities
      }
      
      saveUserData(updatedData)
      return updatedData
    })
  }

  // Complete a task
  const completeTask = (taskId: string) => {
    setUserData(currentData => {
      const taskToComplete = currentData.tasks.find(task => task.id === taskId)
      const updatedTasks = currentData.tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              completed: true, 
              completedAt: new Date().toISOString() 
            }
          : task
      )
      
      const completedTasks = updatedTasks.filter(task => task.completed)
      const productivityScore = Math.min(100, Math.floor((completedTasks.length / Math.max(1, currentData.tasks.length)) * 100))
      
      const updatedData = {
        ...currentData,
        tasks: updatedTasks,
        totalTasksCompleted: completedTasks.length,
        productivityScore,
        lastActiveDate: new Date().toISOString(),
        activities: taskToComplete ? [
          {
            id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'task_completed' as const,
            title: `Completed "${taskToComplete.title}"`,
            timestamp: new Date().toISOString()
          },
          ...currentData.activities
        ].slice(0, 10) : currentData.activities
      }
      saveUserData(updatedData)
      
      return updatedData
    })
  }

  // Add a new habit
  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'streak'>) => {
    const newHabit: Habit = {
      ...habit,
      id: `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      streak: 0
    }
    
    const updatedData = {
      ...userData,
      habits: [...userData.habits, newHabit]
    }
    saveUserData(updatedData)
  }

  // Complete a habit
  const completeHabit = (habitId: string) => {
    const updatedHabits = userData.habits.map(habit => {
      if (habit.id === habitId) {
        const today = new Date().toISOString().split('T')[0]
        const lastCompleted = habit.lastCompleted?.split('T')[0]
        
        let newStreak = habit.streak
        if (lastCompleted !== today) {
          newStreak = lastCompleted === new Date(Date.now() - 86400000).toISOString().split('T')[0] 
            ? habit.streak + 1 
            : 1
        }
        
        return {
          ...habit,
          streak: newStreak,
          lastCompleted: new Date().toISOString()
        }
      }
      return habit
    })
    
    const updatedData = {
      ...userData,
      habits: updatedHabits,
      lastActiveDate: new Date().toISOString()
    }
    saveUserData(updatedData)
  }

  // Delete a task
  const deleteTask = (taskId: string) => {
    const updatedData = {
      ...userData,
      tasks: userData.tasks.filter(task => task.id !== taskId)
    }
    saveUserData(updatedData)
  }

  // Delete a habit
  const deleteHabit = (habitId: string) => {
    const updatedData = {
      ...userData,
      habits: userData.habits.filter(habit => habit.id !== habitId)
    }
    saveUserData(updatedData)
  }

  // Get user's productivity metrics
  const getProductivityMetrics = () => {
    const completedTasks = userData.tasks.filter(task => task.completed)
    const totalTasks = userData.tasks.length
    const productivityScore = totalTasks > 0 ? Math.floor((completedTasks.length / totalTasks) * 100) : 0
    
    return {
      productivityScore,
      totalTasksCompleted: completedTasks.length,
      totalTasks,
      currentStreak: userData.currentStreak
    }
  }

  return {
    userData,
    isLoading,
    addTask,
    completeTask,
    addHabit,
    completeHabit,
    deleteTask,
    deleteHabit,
    getProductivityMetrics
  }
}
