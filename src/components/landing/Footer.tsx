'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-black text-beige py-16 px-4 overflow-hidden">
      {/* End-to-end horizontal glow lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top glow line - above content sections */}
        <motion.div
          className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beige/30 to-transparent"
          style={{
            boxShadow: '0 0 20px rgba(245, 240, 230, 0.3), 0 0 40px rgba(245, 240, 230, 0.2), 0 0 60px rgba(245, 240, 230, 0.1)'
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        
        {/* Bottom glow line - below copyright */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beige/30 to-transparent"
          style={{
            boxShadow: '0 0 20px rgba(245, 240, 230, 0.3), 0 0 40px rgba(245, 240, 230, 0.2), 0 0 60px rgba(245, 240, 230, 0.1)'
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>

      {/* Background wordmark with grain confined to letter shapes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] xl:text-[28rem] font-black select-none"
          style={{ 
            fontFamily: 'sans-serif',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            width: '100%',
            textAlign: 'center',
            position: 'relative'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Text with grain effect confined to letter shapes */}
          <div
            style={{
              color: 'rgba(245, 240, 230, 0.08)',
              textShadow: `
                0 0 20px rgba(245, 240, 230, 0.1),
                0 0 40px rgba(245, 240, 230, 0.05)
              `,
              filter: 'contrast(1.2) brightness(1.1)',
              position: 'relative'
            }}
          >
            aurano
          </div>
          
          {/* Grain overlay confined to text shape */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E"),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)' opacity='0.2'/%3E%3C/svg%3E")
              `,
              backgroundSize: '180px 180px, 120px 120px',
              backgroundRepeat: 'repeat',
              backgroundPosition: '0 0, 90px 90px',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mixBlendMode: 'overlay',
              opacity: 0.6
            }}
          >
            aurano
          </div>
          
          {/* Additional coarse grain layer */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='coarseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23coarseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px',
              backgroundRepeat: 'repeat',
              backgroundPosition: '40px 40px',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mixBlendMode: 'multiply',
              opacity: 0.4
            }}
          >
            aurano
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Section - Disclaimer */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-beige mb-4">Disclaimer</h3>
            <p className="text-beige/80 leading-relaxed text-sm">
              Results may vary. The productivity strategies and voice-powered features taught in this app are based on our personal experiences and success in the productivity industry. Individual outcomes depend on various factors, including effort, consistency, and personal circumstances. This app does not guarantee specific productivity improvements or habit formation.
            </p>
          </motion.div>

          {/* Right Section - Links and Copyright */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Links */}
            <div className="space-y-3">
              <a 
                href="#" 
                className="block text-beige/80 hover:text-beige transition-colors duration-200 text-sm"
              >
                Terms
              </a>
              <a 
                href="#" 
                className="block text-beige/80 hover:text-beige transition-colors duration-200 text-sm"
              >
                Privacy
              </a>
              <a 
                href="#" 
                className="block text-beige/80 hover:text-beige transition-colors duration-200 text-sm"
              >
                Cookie preferences
              </a>
            </div>

            {/* Instagram Icon */}
            <motion.a
              href="#"
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 border border-beige/30 rounded-lg flex items-center justify-center hover:border-beige/60 transition-colors duration-200">
                <Instagram size={16} className="text-beige/80" />
              </div>
            </motion.a>

            {/* Copyright */}
            <p className="text-beige/60 text-sm">
              © 2025 Aurano. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
