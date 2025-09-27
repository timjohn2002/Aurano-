'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  variant?: 'icon' | 'text'
  constrained?: boolean
  trademarkSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xxs'
}

export default function Logo({ size = 'md', className = '', variant = 'text', constrained = false, trademarkSize }: LogoProps) {
  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16'
  }

  const textSizes = {
    xs: 'text-3xl md:text-4xl lg:text-5xl',
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  }

  const trademarkSizes = {
    xxs: 'text-xs',
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-xs'
  }

  if (variant === 'icon') {
    return (
      <motion.div
        className={`${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative flex items-center justify-center p-3">
          {/* Subtle animated glowing rounded line */}
          <motion.div
            className="absolute rounded-full border border-beige/30"
            style={{
              width: 'calc(100% + 0.75rem)',
              height: 'calc(100% + 0.75rem)',
              top: '-0.375rem',
              left: '-0.375rem'
            }}
            animate={{
              boxShadow: [
                '0 0 8px rgba(245, 240, 230, 0.2), 0 0 16px rgba(245, 240, 230, 0.1)',
                '0 0 12px rgba(245, 240, 230, 0.3), 0 0 20px rgba(245, 240, 230, 0.15)',
                '0 0 8px rgba(245, 240, 230, 0.2), 0 0 16px rgba(245, 240, 230, 0.1)'
              ],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Logo container - circular */}
          <div className="relative w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg z-10">
            {/* Stylized 'a' letter - positioned slightly left of center */}
            <div className="relative flex items-center justify-center">
              <span className="text-white font-bold text-base tracking-tight" style={{ fontFamily: 'sans-serif' }}>
                a
              </span>
              {/* Trademark symbol - positioned in upper right corner of 'a' */}
              <span className="absolute -top-0.5 -right-0.5 text-white text-xs z-20" style={{ fontSize: '0.4em' }}>
                ®
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`${className}`}
      whileHover={{ scale: size === 'xs' ? 1.05 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`relative flex items-center justify-center ${constrained ? 'p-2' : 'p-3'}`}>
        {/* Subtle animated glowing rounded line */}
        <motion.div
          className="absolute rounded-full border border-beige/30"
          style={{
            width: constrained ? 'calc(100% + 0.5rem)' : 'calc(100% + 0.75rem)',
            height: constrained ? 'calc(100% + 0.5rem)' : 'calc(100% + 0.75rem)',
            top: constrained ? '-0.25rem' : '-0.375rem',
            left: constrained ? '-0.25rem' : '-0.375rem'
          }}
          animate={{
            boxShadow: constrained ? [
              '0 0 6px rgba(245, 240, 230, 0.2), 0 0 12px rgba(245, 240, 230, 0.1)',
              '0 0 8px rgba(245, 240, 230, 0.3), 0 0 16px rgba(245, 240, 230, 0.15)',
              '0 0 6px rgba(245, 240, 230, 0.2), 0 0 12px rgba(245, 240, 230, 0.1)'
            ] : [
              '0 0 10px rgba(245, 240, 230, 0.2), 0 0 20px rgba(245, 240, 230, 0.1)',
              '0 0 15px rgba(245, 240, 230, 0.3), 0 0 25px rgba(245, 240, 230, 0.15)',
              '0 0 10px rgba(245, 240, 230, 0.2), 0 0 20px rgba(245, 240, 230, 0.1)'
            ],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Text logo */}
        <div className="relative flex items-center z-10">
          <span 
            className={`text-white font-bold ${textSizes[size]} tracking-tight`}
            style={{ 
              fontFamily: 'sans-serif',
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}
          >
            aurano
          </span>
          {/* Trademark symbol - positioned in upper right corner of 'o' */}
          <span 
            className={`absolute text-white z-20 ${trademarkSizes[trademarkSize || size]}`}
            style={{ 
              top: (trademarkSize || size) === 'xs' || (trademarkSize || size) === 'xxs' ? '-0.15em' : '-0.2em',
              right: (trademarkSize || size) === 'xs' || (trademarkSize || size) === 'xxs' ? '-0.6em' : '-0.8em',
              fontSize: (trademarkSize || size) === 'xxs' ? '0.2em' : 
                       (trademarkSize || size) === 'xs' ? '0.25em' : '0.4em'
            }}
          >
            ®
          </span>
        </div>
      </div>
    </motion.div>
  )
}
