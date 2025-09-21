'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface Category {
  name: string
  count: number
  color: string
}

interface CategoryWidgetProps {
  category: Category
}

export default function CategoryWidget({ category }: CategoryWidgetProps) {
  return (
    <motion.div
      className="flex items-center justify-between p-3 rounded-lg hover:bg-beige/10 transition-colors cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${category.color.split(' ')[0]}`} />
        <span className="font-medium text-beige">{category.name}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-beige/60">{category.count}</span>
        <ChevronRight size={16} className="text-beige/40" />
      </div>
    </motion.div>
  )
}
