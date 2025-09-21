'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function StatsCounter() {
  const [hoursSaved, setHoursSaved] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Transform scroll progress to hours saved (0 to 71,458) - much slower progression
  const targetHours = useTransform(scrollYProgress, [0, 1], [0, 71458])
  
  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Animate the counter
  useEffect(() => {
    if (!isMounted) return
    
    const unsubscribe = targetHours.onChange((value) => {
      setHoursSaved(Math.floor(value))
    })
    
    return () => unsubscribe()
  }, [targetHours, isMounted])

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <motion.div
      className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0 }}
    >
      <motion.div
        className="bg-beige/10 backdrop-blur-sm border border-beige/20 rounded-full px-4 py-2 shadow-lg"
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(245, 240, 230, 0.2)' }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.span
            className="text-sm font-bold text-beige tabular-nums"
            key={hoursSaved}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {formatNumber(hoursSaved)}
          </motion.span>
          <span className="text-beige/80 text-xs font-medium">
            hours saved with aurano
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
