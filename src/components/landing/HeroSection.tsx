'use client'

import { motion } from 'framer-motion'
import { Mic, ArrowRight } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import GlowingButton from '@/components/ui/GlowingButton'
import { useEffect, useState, useRef } from 'react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animated blob system
  useEffect(() => {
    if (!mounted || !canvasRef.current) {
      console.log('Canvas not ready:', { mounted, canvasRef: canvasRef.current })
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.log('Canvas context not available')
      return
    }
    
    console.log('Starting blob animation')

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Blob configuration
    const blobs = [
      { x: 0.2, y: 0.3, size: 0.3, speed: 0.3, phase: 0 },
      { x: 0.7, y: 0.2, size: 0.25, speed: 0.4, phase: Math.PI / 3 },
      { x: 0.1, y: 0.7, size: 0.35, speed: 0.25, phase: Math.PI / 2 },
      { x: 0.8, y: 0.6, size: 0.28, speed: 0.35, phase: Math.PI },
      { x: 0.5, y: 0.1, size: 0.22, speed: 0.4, phase: Math.PI * 1.5 },
      { x: 0.4, y: 0.8, size: 0.32, speed: 0.3, phase: Math.PI * 2 }
    ]

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set transparent background
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      blobs.forEach(blob => {
        // Calculate position with drift
        const driftX = Math.sin(time * blob.speed + blob.phase) * 0.1
        const driftY = Math.cos(time * blob.speed * 0.7 + blob.phase) * 0.1
        const morph = 0.9 + 0.2 * Math.sin(time * blob.speed * 1.3 + blob.phase)
        
        const x = (blob.x + driftX) * canvas.width
        const y = (blob.y + driftY) * canvas.height
        const radius = blob.size * Math.min(canvas.width, canvas.height) * morph

        // Create gradient for each blob
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, 'rgba(210, 180, 140, 1.0)')
        gradient.addColorStop(0.2, 'rgba(210, 180, 140, 0.8)')
        gradient.addColorStop(0.5, 'rgba(210, 180, 140, 0.4)')
        gradient.addColorStop(0.8, 'rgba(210, 180, 140, 0.1)')
        gradient.addColorStop(1, 'rgba(210, 180, 140, 0)')

        // Draw blob with blur effect
        ctx.save()
        ctx.filter = 'blur(20px)'
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      time += 0.01
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted])
  return (
        <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-2 pb-0 sm:py-16 sm:pb-16">
            {/* Animated Blob Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
              {/* Large Glowing Blobs */}
              <div 
                className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-beige/15 rounded-full blur-3xl animate-pulse"
                style={{
                  top: '20%',
                  left: '10%',
                  animation: 'float 20s ease-in-out infinite',
                  animationDelay: '0s'
                }}
              />
              <div 
                className="absolute w-56 h-56 sm:w-80 sm:h-80 bg-beige/20 rounded-full blur-3xl animate-pulse"
                style={{
                  top: '30%',
                  right: '15%',
                  animation: 'float 25s ease-in-out infinite',
                  animationDelay: '5s'
                }}
              />
              <div 
                className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-beige/10 rounded-full blur-3xl animate-pulse"
                style={{
                  bottom: '20%',
                  left: '20%',
                  animation: 'float 30s ease-in-out infinite',
                  animationDelay: '10s'
                }}
              />
              <div 
                className="absolute w-60 h-60 sm:w-88 sm:h-88 bg-beige/25 rounded-full blur-3xl animate-pulse"
                style={{
                  bottom: '30%',
                  right: '10%',
                  animation: 'float 22s ease-in-out infinite',
                  animationDelay: '15s'
                }}
              />
              <div 
                className="absolute w-44 h-44 sm:w-64 sm:h-64 bg-beige/15 rounded-full blur-3xl animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'float 18s ease-in-out infinite',
                  animationDelay: '8s'
                }}
              />
              <div 
                className="absolute w-52 h-52 sm:w-76 sm:h-76 bg-beige/20 rounded-full blur-3xl animate-pulse"
                style={{
                  top: '10%',
                  left: '60%',
                  animation: 'float 28s ease-in-out infinite',
                  animationDelay: '12s'
                }}
              />

              {/* Small Floating Particles (Stars) */}
              {mounted && Array.from({ length: 20 }, (_, i) => {
                // Use deterministic positioning based on index to avoid hydration mismatch
                const positions = [
                  { top: '10%', left: '15%', delay: '0s', duration: '18s', opacity: 0.4 },
                  { top: '25%', left: '85%', delay: '2s', duration: '22s', opacity: 0.6 },
                  { top: '40%', left: '20%', delay: '4s', duration: '25s', opacity: 0.3 },
                  { top: '60%', left: '90%', delay: '6s', duration: '20s', opacity: 0.5 },
                  { top: '80%', left: '10%', delay: '8s', duration: '28s', opacity: 0.4 },
                  { top: '15%', left: '50%', delay: '10s', duration: '24s', opacity: 0.7 },
                  { top: '35%', left: '75%', delay: '12s', duration: '19s', opacity: 0.3 },
                  { top: '55%', left: '30%', delay: '14s', duration: '26s', opacity: 0.6 },
                  { top: '75%', left: '70%', delay: '16s', duration: '23s', opacity: 0.4 },
                  { top: '5%', left: '40%', delay: '18s', duration: '21s', opacity: 0.5 },
                  { top: '45%', left: '5%', delay: '1s', duration: '27s', opacity: 0.3 },
                  { top: '65%', left: '95%', delay: '3s', duration: '17s', opacity: 0.6 },
                  { top: '85%', left: '60%', delay: '5s', duration: '29s', opacity: 0.4 },
                  { top: '20%', left: '35%', delay: '7s', duration: '25s', opacity: 0.5 },
                  { top: '50%', left: '80%', delay: '9s', duration: '22s', opacity: 0.3 },
                  { top: '70%', left: '45%', delay: '11s', duration: '24s', opacity: 0.6 },
                  { top: '90%', left: '25%', delay: '13s', duration: '18s', opacity: 0.4 },
                  { top: '30%', left: '65%', delay: '15s', duration: '26s', opacity: 0.5 },
                  { top: '12%', left: '8%', delay: '17s', duration: '23s', opacity: 0.3 },
                  { top: '38%', left: '92%', delay: '19s', duration: '20s', opacity: 0.6 },
                  { top: '58%', left: '12%', delay: '1.5s', duration: '28s', opacity: 0.4 },
                  { top: '78%', left: '88%', delay: '3.5s', duration: '21s', opacity: 0.5 },
                  { top: '8%', left: '55%', delay: '5.5s', duration: '25s', opacity: 0.3 },
                  { top: '28%', left: '18%', delay: '7.5s', duration: '19s', opacity: 0.6 },
                  { top: '48%', left: '82%', delay: '9.5s', duration: '27s', opacity: 0.4 },
                  { top: '68%', left: '42%', delay: '11.5s', duration: '23s', opacity: 0.5 },
                  { top: '88%', left: '72%', delay: '13.5s', duration: '17s', opacity: 0.3 },
                  { top: '18%', left: '28%', delay: '15.5s', duration: '26s', opacity: 0.6 },
                  { top: '42%', left: '58%', delay: '17.5s', duration: '22s', opacity: 0.4 },
                  { top: '62%', left: '88%', delay: '19.5s', duration: '24s', opacity: 0.5 },
                  { top: '82%', left: '38%', delay: '2.5s', duration: '18s', opacity: 0.3 },
                  { top: '2%', left: '68%', delay: '4.5s', duration: '29s', opacity: 0.6 },
                  { top: '22%', left: '98%', delay: '6.5s', duration: '21s', opacity: 0.4 },
                  { top: '52%', left: '2%', delay: '8.5s', duration: '25s', opacity: 0.5 },
                  { top: '72%', left: '32%', delay: '10.5s', duration: '19s', opacity: 0.3 },
                  { top: '92%', left: '62%', delay: '12.5s', duration: '27s', opacity: 0.6 },
                  { top: '32%', left: '78%', delay: '14.5s', duration: '23s', opacity: 0.4 },
                  { top: '6%', left: '48%', delay: '16.5s', duration: '20s', opacity: 0.5 },
                  { top: '26%', left: '78%', delay: '18.5s', duration: '26s', opacity: 0.3 },
                  { top: '46%', left: '8%', delay: '0.5s', duration: '24s', opacity: 0.6 },
                  { top: '66%', left: '38%', delay: '2.5s', duration: '18s', opacity: 0.4 },
                  { top: '86%', left: '68%', delay: '4.5s', duration: '22s', opacity: 0.5 },
                  { top: '16%', left: '98%', delay: '6.5s', duration: '28s', opacity: 0.3 },
                  { top: '36%', left: '28%', delay: '8.5s', duration: '21s', opacity: 0.6 },
                  { top: '56%', left: '58%', delay: '10.5s', duration: '25s', opacity: 0.4 },
                  { top: '76%', left: '88%', delay: '12.5s', duration: '19s', opacity: 0.5 },
                  { top: '96%', left: '18%', delay: '14.5s', duration: '27s', opacity: 0.3 },
                  { top: '4%', left: '48%', delay: '16.5s', duration: '23s', opacity: 0.6 },
                  { top: '24%', left: '78%', delay: '18.5s', duration: '20s', opacity: 0.4 },
                  { top: '44%', left: '8%', delay: '0.8s', duration: '26s', opacity: 0.5 },
                  { top: '64%', left: '38%', delay: '2.8s', duration: '22s', opacity: 0.3 },
                  { top: '84%', left: '68%', delay: '4.8s', duration: '24s', opacity: 0.6 },
                  { top: '14%', left: '98%', delay: '6.8s', duration: '18s', opacity: 0.4 },
                  { top: '34%', left: '28%', delay: '8.8s', duration: '25s', opacity: 0.5 },
                  { top: '54%', left: '58%', delay: '10.8s', duration: '21s', opacity: 0.3 },
                  { top: '74%', left: '88%', delay: '12.8s', duration: '27s', opacity: 0.6 },
                  { top: '94%', left: '18%', delay: '14.8s', duration: '19s', opacity: 0.4 },
                  { top: '1%', left: '48%', delay: '16.8s', duration: '23s', opacity: 0.5 }
                ];
                
                const pos = positions[i % positions.length];
                return (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-beige/60 rounded-full"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      animation: `float ${pos.duration} ease-in-out infinite`,
                      animationDelay: pos.delay,
                      opacity: pos.opacity
                    }}
                  />
                );
              })}
            </div>

          <div className="relative z-20 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-[120rem] 5xl:max-w-[140rem] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 5xl:px-28 text-center pt-20 sm:pt-20 lg:pt-24 xl:pt-28 2xl:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Wordmark */}
          <motion.div 
            className="mb-6 sm:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 3xl:mb-28 4xl:mb-32 5xl:mb-36 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Logo size="lg" variant="text" />
          </motion.div>
          
              {/* Tagline */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-4 sm:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 max-w-3xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto leading-tight px-2 sm:px-4 font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
                  Talk your habits into existence.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white/80 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 2xl:mb-16 max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto leading-relaxed px-2 sm:px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                The first voice-powered productivity app that transforms your spoken thoughts into organized action. Speak naturally, stay focused, achieve more.
              </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-14 5xl:gap-16 justify-center items-center px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlowingButton
              href="#waitlist"
              icon={<Mic size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 4xl:w-16 4xl:h-16 5xl:w-20 5xl:h-20" />}
              className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 lg:py-4 xl:py-5 2xl:py-6 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
            >
              Join the Waitlist
            </GlowingButton>
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
