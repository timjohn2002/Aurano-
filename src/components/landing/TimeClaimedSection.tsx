'use client'

import { motion } from 'framer-motion'
import Logo from '@/components/ui/Logo'

export default function TimeClaimedSection() {
  return (
    <section className="pt-4 pb-8 md:pt-6 md:pb-12 bg-black text-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {/* Impact Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-black border border-beige/20 rounded-full text-beige text-sm font-medium">
              Impact
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-beige via-beige/80 to-beige/60 bg-clip-text text-transparent">
              Average time saved thanks to{' '}
              <span className="inline-block">
                <Logo size="lg" variant="text" />
              </span>
            </span>
          </motion.h2>

          {/* Key Metric */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="py-4"
          >
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold">
                  <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
                    1h 28m
                  </span>
                </div>
          </motion.div>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-beige/70 font-medium"
          >
            saved daily
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
