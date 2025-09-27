'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface GlowingButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: (e: React.FormEvent) => void | Promise<void>
  className?: string
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export default function GlowingButton({ 
  children, 
  href, 
  onClick, 
  className = '', 
  icon,
  variant = 'primary',
  disabled = false
}: GlowingButtonProps) {
  const baseClasses = `relative inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} shadow-lg group overflow-hidden ${!disabled ? 'hover:animate-spark-border' : ''}`
  
  const variantClasses = {
    primary: "bg-[#8B7F71] text-white border border-[#A68B5B] hover:bg-[#8B7F71]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10"
  }

  const buttonContent = (
    <>
      {icon}
      <span>{children}</span>
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      
    </>
  )

  if (href) {
    return (
      <a 
        href={href} 
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {buttonContent}
      </a>
    )
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {buttonContent}
    </button>
  )
}
