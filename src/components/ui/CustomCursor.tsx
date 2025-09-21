'use client'

import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Only remove duplicate cursors, not our own
    const duplicateCursors = document.querySelectorAll('[id*="cursor"]:not(#aurano-custom-cursor), .custom-cursor:not(#aurano-custom-cursor)')
    duplicateCursors.forEach(cursor => {
      cursor.remove()
    })

    // Define handlers
    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is within viewport bounds
      const isWithinBounds = e.clientX >= 0 && e.clientX <= window.innerWidth && 
                            e.clientY >= 0 && e.clientY <= window.innerHeight
      
      if (isWithinBounds) {
        targetPosition.current = {
          x: Math.max(0, Math.min(e.clientX - 4, window.innerWidth - 8)),
          y: Math.max(0, Math.min(e.clientY - 4, window.innerHeight - 8))
        }
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const animate = () => {
      const cursor = cursorRef.current
      if (!cursor) return

      const dx = targetPosition.current.x - currentPosition.current.x
      const dy = targetPosition.current.y - currentPosition.current.y
      
      // Smooth interpolation factor (0.1 = slower, 0.3 = faster)
      const factor = 0.2
      
      currentPosition.current.x += dx * factor
      currentPosition.current.y += dy * factor
      
      cursor.style.left = `${currentPosition.current.x}px`
      cursor.style.top = `${currentPosition.current.y}px`
      
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate)

    // Add event listeners to both window and document for better coverage
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    // Hide cursor when mouse leaves the document entirely
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) {
        setIsVisible(false)
      }
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [mounted])

  // Don't render on server side to prevent hydration mismatch
  if (!mounted) return null

  return (
    <div
      ref={cursorRef}
      id="aurano-custom-cursor"
      className="fixed pointer-events-none z-[9999]"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {/* Main cursor dot */}
      <div className="w-2 h-2 bg-beige rounded-full shadow-lg" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 w-6 h-6 bg-beige/20 rounded-full blur-md -translate-x-2 -translate-y-2" />
    </div>
  )
}
