'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import GlowingButton from '@/components/ui/GlowingButton'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')
  }

  return (
    <section id="waitlist" className="py-8 sm:py-20 lg:py-24 xl:py-32 2xl:py-40 3xl:py-48 4xl:py-56 5xl:py-64 bg-black text-beige">
      <div className="max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl 4xl:max-w-8xl 5xl:max-w-9xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 5xl:px-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10">
            <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
              Join the Beta Waitlist Today
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-beige/80 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 2xl:mb-16 max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto">
            Be among the first to experience voice-powered productivity. Get early access and exclusive updates.
          </p>

          <div className="max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl 5xl:max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-14 5xl:gap-16 items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                placeholder="Enter your email"
                className="flex-1 w-full px-3 sm:px-4 lg:px-6 xl:px-8 2xl:px-10 py-2 sm:py-3 lg:py-4 xl:py-5 2xl:py-6 bg-beige/10 border border-beige/20 rounded-full lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-beige placeholder-beige/60 focus:outline-none focus:border-beige/40 transition-colors"
                required
              />
              
              <GlowingButton
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 lg:py-4 xl:py-5 2xl:py-6 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                variant="secondary"
              >
                {isLoading ? 'Joining...' : 'Join Waitlist'}
              </GlowingButton>
            </div>
          </div>

          {isSubmitted && (
            <motion.div
              className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl 5xl:max-w-5xl mx-auto mt-4 sm:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 3xl:mt-14 4xl:mt-16 5xl:mt-18"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8 4xl:gap-10 5xl:gap-12 p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-8 3xl:p-10 4xl:p-12 5xl:p-14 bg-beige/10 rounded-xl lg:rounded-2xl xl:rounded-3xl 2xl:rounded-[2rem] 3xl:rounded-[2.5rem] 4xl:rounded-[3rem] 5xl:rounded-[3.5rem] border border-beige/20">
                <CheckCircle size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 4xl:w-16 4xl:h-16 5xl:w-20 5xl:h-20 text-green-400" />
                <div className="text-left">
                  <div className="font-semibold text-beige text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl">You&apos;re on the list!</div>
                  <div className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl text-beige/80">We&apos;ll notify you when Aurano is ready.</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Benefits */}
          <motion.div
            className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28 3xl:mt-32 4xl:mt-36 5xl:mt-40 flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 text-beige whitespace-nowrap">Early Access</div>
              <div className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-beige/70 whitespace-nowrap">Be the first to try Aurano</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 text-beige whitespace-nowrap">Exclusive Updates</div>
              <div className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-beige/70 whitespace-nowrap">Get insider news and features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 text-beige whitespace-nowrap">Special Pricing</div>
              <div className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-beige/70 whitespace-nowrap">Founding member discounts</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
