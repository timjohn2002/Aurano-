'use client'

import { motion } from 'framer-motion'
import { Mic, ArrowRight } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate particle positions that work on both server and client
  const generateParticles = (count: number, size: string) => {
    if (!mounted) return []
    
    return [...Array(count)].map((_, i) => ({
      id: `${size}-${i}`,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    }))
  }

  const largeParticles = generateParticles(5, 'large')
  const mediumParticles = generateParticles(12, 'medium')
  const smallParticles = generateParticles(25, 'small')
  return (
        <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
            {/* Background Glows */}
            <div className="absolute inset-0">
              {/* Left glow - behind "Talk your habits" */}
              <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-beige/10 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2" />
              {/* Right glow - behind "existence" */}
              <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-beige/8 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2" />
              {/* Center connecting glow */}
              <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-beige/8 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2" />
              {/* Additional overlapping glows for seamless blend */}
              <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-beige/6 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2" />
              <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-beige/6 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2" />
              {/* Top and bottom connecting glows */}
              <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-beige/5 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2" />
              <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-beige/5 rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/2" />
              {/* Very subtle corner grain effects */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-beige/6 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-beige/6 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-beige/6 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
              {/* Left side grain effect - positioned in center-left */}
              <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-beige/12 rounded-full blur-3xl transform -translate-y-1/2" />
              {/* Right side grain effect - positioned in center-right */}
              <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-beige/12 rounded-full blur-3xl transform -translate-y-1/2" />
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }} />
            
          </div>

          {/* Animated Particles */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Large particles */}
              {largeParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-beige/60 rounded-full"
                  style={{
                    left: particle.x,
                    top: particle.y,
                  }}
                  animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -80, 60, 0],
                    opacity: [0.4, 0.8, 0.2, 0.4],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
              
              {/* Medium particles */}
              {mediumParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-0.5 h-0.5 bg-beige/50 rounded-full"
                  style={{
                    left: particle.x,
                    top: particle.y,
                  }}
                  animate={{
                    x: [0, 80, -60, 0],
                    y: [0, -60, 40, 0],
                    opacity: [0.5, 0.8, 0.2, 0.5],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
              
              {/* Small particles */}
              {smallParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-0.5 h-0.5 bg-beige/40 rounded-full"
                  style={{
                    left: particle.x,
                    top: particle.y,
                  }}
                  animate={{
                    x: [0, 60, -40, 0],
                    y: [0, -40, 30, 0],
                    opacity: [0.4, 0.6, 0.2, 0.4],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-20 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-[120rem] 5xl:max-w-[140rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 5xl:px-28 text-center pt-16 sm:pt-20 lg:pt-24 xl:pt-28 2xl:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Wordmark */}
          <motion.div 
            className="mb-8 sm:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 3xl:mb-28 4xl:mb-32 5xl:mb-36 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Logo size="lg" variant="text" />
          </motion.div>
          
              {/* Tagline */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white mb-4 sm:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 max-w-3xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto leading-tight px-4 font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Talk your habits into existence.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white/80 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 2xl:mb-16 max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                The first voice-powered productivity app that transforms your spoken thoughts into organized action. Speak naturally, stay focused, achieve more.
              </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-14 5xl:gap-16 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 bg-beige/20 text-white px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 lg:py-4 xl:py-5 2xl:py-6 rounded-full text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium hover:bg-beige/30 transition-all duration-300 hover:scale-105 shadow-lg border border-beige/30"
            >
              <Mic size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 4xl:w-16 4xl:h-16 5xl:w-20 5xl:h-20" />
              <span>Join the Waitlist</span>
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 bg-white/10 text-white px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 lg:py-4 xl:py-5 2xl:py-6 rounded-full text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg border border-white/20 group"
            >
              <span>View Demo</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 4xl:w-16 4xl:h-16 5xl:w-20 5xl:h-20 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
