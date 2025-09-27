'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'

export default function CreatorMessageSection() {
  return (
    <section className="py-32 sm:py-40 lg:py-48 xl:py-56 2xl:py-64 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Video Placeholder */}
    <div className="mb-12 sm:mb-16 lg:mb-20 xl:mb-24 2xl:mb-28">
      <div className="aspect-video bg-beige/10 border border-beige/20 rounded-2xl lg:rounded-3xl xl:rounded-[1.5rem] 2xl:rounded-[2rem] overflow-hidden shadow-lg relative group cursor-pointer">
        <Image
          src="/dane-video-thumbnail.jpg"
          alt="Dane's message thumbnail"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.button
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 bg-beige rounded-full flex items-center justify-center hover:bg-beige/80 transition-colors shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={40} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 text-black ml-1" />
          </motion.button>
        </div>
      </div>
    </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
                Built with you in mind
              </span>
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-beige/70 leading-relaxed max-w-4xl sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
              Discipline made simple. Aurano transforms the way you think about productivity by making it as natural as speaking.
            </p>
          </motion.div>

          {/* Creator Info */}
          <motion.div
            className="mt-16 sm:mt-20 lg:mt-24 xl:mt-28 2xl:mt-32 flex items-center justify-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 border border-beige/30 rounded-full overflow-hidden">
      <Image 
        src="/dane-profile.jpg" 
        alt="Dane - Founder & Creator" 
        width={128}
        height={128}
        className="w-full h-full object-cover"
      />
    </div>
            <div className="text-left">
              <div className="font-semibold text-beige text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Dane</div>
              <div className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-beige/60">Founder & Creator</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
