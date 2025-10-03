'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Logo from '@/components/ui/Logo'
import GlowingButton from '@/components/ui/GlowingButton'
import LoginModal from '@/components/ui/LoginModal'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
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
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 5xl:px-28 py-2">
        <div className="flex justify-center items-center h-10 sm:h-10 lg:h-12 xl:h-14 2xl:h-16">
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
            className="flex-shrink-0 absolute left-3 sm:left-6 lg:left-8 xl:left-12 2xl:left-16 3xl:left-20 4xl:left-24 5xl:left-28"
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
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-white hover:text-white/80 px-1 sm:px-1 lg:px-2 xl:px-3 2xl:px-4 py-1 text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg font-medium transition-colors"
                >
                  Login
                </button>
                <GlowingButton
                  href="#waitlist"
                  className="px-2 sm:px-2 lg:px-3 xl:px-4 2xl:px-5 py-1 text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg"
                >
                  Join Waitlist
                </GlowingButton>
              </div>
            </div>
          </div>

          {/* Mobile menu button - Top Right for mobile only */}
          <div className="md:hidden absolute right-3 sm:right-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 p-2"
            >
              {isMenuOpen ? <X size={20} className="w-5 h-5" /> : <Menu size={20} className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeOut",
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 mx-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                >
                  <motion.a 
                    href="#problems" 
                    className="text-white hover:text-white/80 block px-3 py-2 text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
                    Problems
                  </motion.a>
                  <motion.a 
                    href="#features" 
                    className="text-white hover:text-white/80 block px-3 py-2 text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.25, duration: 0.2 }}
                  >
                    Features
                  </motion.a>
                  <motion.a 
                    href="#demo" 
                    className="text-white hover:text-white/80 block px-3 py-2 text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                  >
                    Demo
                  </motion.a>
                  <motion.a 
                    href="#testimonials" 
                    className="text-white hover:text-white/80 block px-3 py-2 text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.35, duration: 0.2 }}
                  >
                    Testimonials
                  </motion.a>
                  <motion.button 
                    onClick={() => {
                      setIsLoginModalOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="text-white hover:text-white/80 block px-3 py-2 text-sm font-medium w-full text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                  >
                    Login
                  </motion.button>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.45, duration: 0.2 }}
                  >
                    <GlowingButton
                      href="#waitlist"
                      className="block px-4 py-2 text-sm text-center mt-2"
                    >
                      Join Waitlist
                    </GlowingButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  )
}
