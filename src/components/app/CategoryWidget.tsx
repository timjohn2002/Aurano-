'use client'

import { motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'

interface Category {
  name: string
  count: number
  color: string
}

interface CategoryWidgetProps {
  category: Category
  onDelete?: (categoryName: string) => void
}

export default function CategoryWidget({ category, onDelete }: CategoryWidgetProps) {
  return (
    <motion.div
      className="flex items-center justify-between p-3 rounded-lg hover:bg-beige/10 transition-colors cursor-pointer border border-red-500 bg-red-900/20"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${category.color.split(' ')[0]}`} />
        <span className="font-medium text-white text-lg">{category.name}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-white font-bold">{category.count}</span>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(category.name)
            }}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
            title="Delete category"
          >
            <X size={14} className="text-red-400" />
          </button>
        )}
        <ChevronRight size={16} className="text-beige/40" />
      </div>
    </motion.div>
  )
}
