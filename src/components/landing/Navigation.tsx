'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Logo from '@/components/ui/Logo'
import GlowingButton from '@/components/ui/GlowingButton'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Trigger logo animation when scrolling past hero section
  const scrollValue = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  
  useEffect(() => {
    const unsubscribe = scrollValue.onChange((value) => {
      if (value > 0.5 && !showLogo) {
        setShowLogo(true)
      } else if (value <= 0.5 && showLogo) {
        setShowLogo(false)
      }
    })
    
    return () => unsubscribe()
  }, [scrollValue, showLogo])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 5xl:px-28 py-2">
        <div className="flex justify-center items-center h-8 sm:h-10 lg:h-12 xl:h-14 2xl:h-16">
          {/* Logo - Left Side */}
          <motion.div
            initial={{ 
              scale: 0, 
              opacity: 0, 
              x: -120, 
              y: 20 
            }}
            animate={showLogo ? { 
              scale: 1, 
              opacity: 1, 
              x: 0, 
              y: 0 
            } : { 
              scale: 0, 
              opacity: 0, 
              x: -120, 
              y: 20 
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 1.2,
              duration: 0.8
            }}
            className="flex-shrink-0 absolute left-4 sm:left-6 lg:left-8 xl:left-12 2xl:left-16 3xl:left-20 4xl:left-24 5xl:left-28"
          >
            <Logo size="sm" variant="text" />
          </motion.div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl px-2 sm:px-3 lg:px-4 xl:px-6 2xl:px-8 py-1 sm:py-1 lg:py-2 xl:py-2 2xl:py-3">
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 xl:space-x-4 2xl:space-x-6">
                <a href="#problems" className="text-white hover:text-white/80 px-1 sm:px-1 lg:px-2 xl:px-3 2xl:px-4 py-1 text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg font-medium transition-colors">
                  Problems
                </a>
                <a href="#features" className="text-white hover:text-white/80 px-1 sm:px-1 lg:px-2 xl:px-3 2xl:px-4 py-1 text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg font-medium transition-colors">
                  Features
                </a>
                <a href="#demo" className="text-white hover:text-white/80 px-1 sm:px-1 lg:px-2 xl:px-3 2xl:px-4 py-1 text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg font-medium transition-colors">
                  Demo
                </a>
                <a href="#testimonials" className="text-white hover:text-white/80 px-1 sm:px-1 lg:px-2 xl:px-3 2xl:px-4 py-1 text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg font-medium transition-colors">
                  Testimonials
                </a>
                <GlowingButton
                  href="#waitlist"
                  className="px-2 sm:px-2 lg:px-3 xl:px-4 2xl:px-5 py-1 text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg"
                >
                  Join Waitlist
                </GlowingButton>
              </div>
            </div>
          </div>

          {/* Mobile menu button - Centered */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 p-1 sm:p-2"
            >
              {isMenuOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 mx-4 sm:mx-6">
              <div className="space-y-1 sm:space-y-2">
                <a href="#problems" className="text-white hover:text-white/80 block px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium">
                  Problems
                </a>
                <a href="#features" className="text-white hover:text-white/80 block px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium">
                  Features
                </a>
                <a href="#demo" className="text-white hover:text-white/80 block px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium">
                  Demo
                </a>
                <a href="#testimonials" className="text-white hover:text-white/80 block px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium">
                  Testimonials
                </a>
                <GlowingButton
                  href="#waitlist"
                  className="block px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-center"
                >
                  Join Waitlist
                </GlowingButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
