'use client'

import { motion } from 'framer-motion'
import { Mic, CheckSquare, Target } from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: "Speak it",
    description: "Record with voice",
    details: "Simply speak your tasks, goals, and intentions. Our AI transcribes and organizes everything for you."
  },
  {
    icon: CheckSquare,
    title: "Track it",
    description: "Organized into to-dos & categories",
    details: "Your spoken words become structured tasks with automatic categorization and priority setting."
  },
  {
    icon: Target,
    title: "Stay Accountable",
    description: "Productivity score + focus mode",
    details: "Track your progress with a productivity score and enter focus mode for deep work sessions."
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="pt-8 pb-4 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12 xl:pt-32 xl:pb-16 2xl:pt-40 2xl:pb-20 3xl:pt-48 3xl:pb-24 4xl:pt-56 4xl:pb-28 5xl:pt-64 5xl:pb-32 bg-black">
      <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-[120rem] 5xl:max-w-[140rem] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 5xl:px-28">
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24 2xl:mb-28 3xl:mb-32 4xl:mb-36 5xl:mb-40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10">
            <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
              How it works
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-beige/70 max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto">
            Three simple steps to transform your voice into organized action
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 3xl:gap-28 4xl:gap-32 5xl:gap-36">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center group flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="relative mb-6 sm:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16 4xl:mb-18 5xl:mb-20">
                <motion.div 
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 3xl:w-36 3xl:h-36 4xl:w-40 4xl:h-40 5xl:w-44 5xl:h-44 bg-beige/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-beige transition-colors duration-300 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon 
                    size={20} 
                    className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 5xl:w-18 5xl:h-18 text-beige group-hover:text-black transition-colors duration-300" 
                  />
                </motion.div>
                {/* Connection line - centered through the icons */}
                {index < features.length - 1 && (
                  <div className="hidden md:block absolute top-8 sm:top-10 lg:top-12 xl:top-14 2xl:top-16 3xl:top-18 4xl:top-20 5xl:top-22 left-1/2 w-full h-0.5 sm:h-1 lg:h-1.5 xl:h-2 2xl:h-2.5 3xl:h-3 4xl:h-3.5 5xl:h-4 transform translate-x-10 overflow-hidden">
                    {/* Animated line with flowing effect */}
                    <motion.div
                      className="h-full bg-gradient-to-r from-transparent via-beige/40 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                    {/* Static background line */}
                    <div className="absolute inset-0 bg-beige/10" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col h-full flex-1 space-y-2 sm:space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-7 4xl:space-y-8 5xl:space-y-9">
                <div className="flex items-center justify-center">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl 5xl:text-8xl font-serif font-semibold text-beige">
                    {feature.title}
                  </h3>
                </div>
                <div className="flex items-start justify-center">
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl text-beige/80 font-medium">
                    {feature.description}
                  </p>
                </div>
                <div className="flex-1 flex items-start justify-center">
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl text-beige/60 leading-relaxed">
                    {feature.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
