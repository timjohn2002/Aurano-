'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Plus, CheckCircle, Target, ArrowRight, Calendar, Clock, Zap } from 'lucide-react'

export default function DemoSection() {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  
  const handleStepInView = (stepId: number) => {
    setVisibleSteps(prev => new Set([...prev, stepId]))
  }

  const steps = [
    {
      id: 0,
      title: "Speak Your Mind",
      description: "Just say what's on your mind naturally",
      example: "I need to finish the quarterly report by Friday",
      icon: Mic,
      color: "bg-beige",
      iconColor: "text-black",
      bgColor: "bg-beige/5",
      borderColor: "border-beige/30"
    },
    {
      id: 1,
      title: "AI Magic Happens",
      description: "Our AI understands, categorizes, and prioritizes",
      example: "Analyzing: Work task, High priority, Due Friday",
      icon: Target,
      color: "bg-beige/20",
      iconColor: "text-beige",
      bgColor: "bg-beige/5",
      borderColor: "border-beige/30"
    },
    {
      id: 2,
      title: "Task Created",
      description: "Instantly added to your organized dashboard",
      example: "✓ Added to Work category, due Friday",
      icon: CheckCircle,
      color: "bg-green-400/20",
      iconColor: "text-green-400",
      bgColor: "bg-green-400/5",
      borderColor: "border-green-400/30"
    },
    {
      id: 3,
      title: "Stay Productive",
      description: "Track progress and maintain momentum",
      example: "Productivity Score: 87%",
      icon: Zap,
      color: "bg-beige",
      iconColor: "text-black",
      bgColor: "bg-beige/5",
      borderColor: "border-beige/30"
    }
  ]

  return (
    <section id="demo" className="pt-16 pb-4 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-12 xl:pt-12 xl:pb-14 2xl:pt-14 2xl:pb-16 3xl:pt-16 3xl:pb-18 4xl:pt-18 4xl:pb-20 5xl:pt-20 5xl:pb-22 bg-black relative overflow-hidden">

      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-4xl px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-14 4xl:px-16 5xl:px-18 relative">
        <motion.div 
          className="text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16 4xl:mb-18 5xl:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif font-bold mb-2 sm:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6">
            <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
              See it in action
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-beige/70 max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto">
            Experience how voice input transforms into organized tasks, step by step
          </p>
        </motion.div>

        <div className="flex flex-col items-center w-full">
          {/* Interactive Story Steps */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 w-full max-w-[500px] mb-6 sm:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.has(step.id)
              const Icon = step.icon
              
              
              return (
                <motion.div
                  key={step.id}
                  className="relative"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ margin: "-50px" }}
                  onViewportEnter={() => handleStepInView(step.id)}
                >
                  {/* Step Card */}
                  <motion.div 
                    className={`flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 p-2 sm:p-3 lg:p-4 xl:p-5 2xl:p-6 ${step.bgColor} border-2 ${step.borderColor} rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl 2xl:rounded-[1.5rem] backdrop-blur-sm`}
                    animate={{
                      scale: isVisible ? 1.02 : 1,
                      y: isVisible ? -2 : 0
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {/* Icon */}
                    <motion.div 
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 ${step.color} rounded-full flex items-center justify-center ${
                        isVisible ? 'animate-pulse' : ''
                      }`}
                      animate={{
                        scale: isVisible ? 1.1 : 1,
                        rotate: isVisible ? [0, 3, -3, 0] : 0,
                        y: isVisible ? -1 : 0
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.25, 0.46, 0.45, 0.94], 
                        repeat: isVisible ? Infinity : 0,
                        repeatDelay: 2
                      }}
                    >
                      <Icon size={14} className={`sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 ${step.iconColor}`} />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <motion.h3 
                        className={`font-semibold text-beige text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl mb-1 sm:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 ${
                          isVisible ? 'text-beige' : 'text-beige/60'
                        }`}
                        animate={{ 
                          color: isVisible ? '#F5F0E6' : '#F5F0E680',
                          y: isVisible ? 0 : 2
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.25, 0.46, 0.45, 0.94] 
                        }}
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p 
                        className={`text-beige/80 text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg mb-1 sm:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 ${
                          isVisible ? 'text-beige/90' : 'text-beige/50'
                        }`}
                        animate={{ 
                          color: isVisible ? '#F5F0E6E6' : '#F5F0E650',
                          y: isVisible ? 0 : 2
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: 0.1
                        }}
                      >
                        {step.description}
                      </motion.p>
                      <motion.div 
                        className={`p-1 sm:p-2 lg:p-3 xl:p-4 2xl:p-5 bg-black/20 rounded-lg lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl border border-beige/10 ${
                          isVisible ? 'opacity-100' : 'opacity-50'
                        }`}
                        animate={{ 
                          opacity: isVisible ? 1 : 0.5,
                          y: isVisible ? 0 : 3,
                          scale: isVisible ? 1 : 0.98
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: 0.2
                        }}
                      >
                        <motion.p 
                          className="text-xs sm:text-xs lg:text-sm xl:text-base 2xl:text-lg text-beige/70 font-mono"
                          animate={{
                            y: isVisible ? 0 : 1
                          }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            delay: 0.3
                          }}
                        >
                          "{step.example}"
                        </motion.p>
                      </motion.div>
                    </div>

                  </motion.div>

                  {/* Connecting Arrow */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="flex justify-center py-2 sm:py-4 lg:py-6 xl:py-8 2xl:py-10 3xl:py-12 4xl:py-14 5xl:py-16"
                      animate={{ opacity: isVisible ? 1 : 0.3 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        animate={{ 
                          y: isVisible ? [0, 8, 0] : 0,
                          opacity: isVisible ? 1 : 0.3,
                          scale: isVisible ? 1 : 0.9
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: isVisible ? Infinity : 0,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <ArrowRight size={20} className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 5xl:w-24 5xl:h-24 text-beige/60 rotate-90" />
                      </motion.div>
                    </motion.div>
                  )}

                </motion.div>
              )
            })}
          </div>

          {/* Horizontal Dashboard - Centered */}
          <motion.div 
            className="bg-beige/5 border-2 border-green-400/30 rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl 2xl:rounded-[1.5rem] shadow-2xl backdrop-blur-sm p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12 w-full max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ margin: "-50px" }}
          >
              {/* Horizontal Layout */}
              <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6">
                {/* Left Column - Header and Tasks */}
                <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 3xl:mb-7 4xl:mb-8 5xl:mb-9">
                  <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl font-serif font-semibold text-beige">Dashboard</h3>
                  <motion.div 
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 5xl:w-18 5xl:h-18 bg-beige rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: '0 0 20px rgba(245, 240, 230, 0.5)'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Mic size={10} className="sm:w-2 sm:h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-8 4xl:h-8 5xl:w-10 5xl:h-10 text-black" />
                  </motion.div>
                </div>

                {/* Tasks */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-7 4xl:space-y-8 5xl:space-y-9 mb-2 sm:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 3xl:mb-7 4xl:mb-8 5xl:mb-9">
                {[
                  { text: "Finish quarterly report", category: "Work", completed: true },
                  { text: "Go to gym", category: "Health", completed: false },
                  { text: "Read 30 pages", category: "Learning", completed: false }
                ].map((task, index) => (
                  <motion.div 
                    key={index}
                    className={`flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 3xl:gap-7 4xl:gap-8 5xl:gap-9 p-2 sm:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-7 4xl:p-8 5xl:p-9 bg-beige/10 rounded-lg lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl 3xl:rounded-[1.5rem] 4xl:rounded-[2rem] 5xl:rounded-[2.5rem] transition-all duration-500 ${
                      task.completed ? 'bg-green-400/10 border border-green-400/20' : ''
                    }`}
                    animate={task.completed ? {
                      scale: [1, 1.05, 1],
                      y: [0, -4, 0]
                    } : {
                      scale: 1,
                      y: 0
                    }}
                    transition={{ 
                      duration: task.completed ? 3 : 0.3,
                      ease: "easeInOut",
                      repeat: task.completed ? Infinity : 0,
                      repeatType: task.completed ? "reverse" : "loop"
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: task.completed ? [1, 1.2, 1] : 1,
                        color: task.completed ? '#10B981' : '#F5F0E660'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle size={14} className={`sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 5xl:w-16 5xl:h-16 ${task.completed ? 'text-green-400' : 'text-beige/40'}`} />
                    </motion.div>
                    <span className={`text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl flex-1 whitespace-nowrap ${task.completed ? 'text-beige' : 'text-beige/60'}`}>
                      {task.text}
                    </span>
                    <span className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl text-beige/50">{task.category}</span>
                  </motion.div>
                ))}
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 gap-1 sm:gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 mb-1 sm:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5">
                <motion.div 
                  className="text-center p-2 sm:p-3 lg:p-4 xl:p-5 2xl:p-6 bg-green-400/10 border border-green-400/20 rounded-lg lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl"
                  animate={{
                    scale: [1, 1.02, 1],
                    y: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <motion.div 
                    className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold text-beige"
                    animate={{
                      color: '#F5F0E6'
                    }}
                  >
                    12
                  </motion.div>
                  <div className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl text-beige/50">Work Tasks</div>
                </motion.div>
                <div className="text-center p-2 sm:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-7 4xl:p-8 5xl:p-9 bg-beige/10 rounded-lg lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl 3xl:rounded-[1.5rem] 4xl:rounded-[2rem] 5xl:rounded-[2.5rem]">
                  <div className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold text-beige">8</div>
                  <div className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl text-beige/60">Health Tasks</div>
                </div>
                </div>
                </div>

                {/* Right Column - Metrics */}
                <div className="flex-1 flex flex-col">
                {/* Productivity Score - Vertical Layout */}
                <motion.div 
                  className="p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14 4xl:p-16 5xl:p-18 bg-beige rounded-lg lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl 3xl:rounded-[1.5rem] 4xl:rounded-[2rem] 5xl:rounded-[2.5rem] shadow-lg border border-beige/20 flex-1"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: '0 0 30px rgba(245, 240, 230, 0.3)'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col h-full justify-between">
                    {/* Top section - Score and Progress */}
                    <div className="flex flex-col items-center text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14">
                      <motion.div 
                        className="text-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl 4xl:text-[10rem] 5xl:text-[12rem] font-bold mb-2 sm:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6"
                        animate={{
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        87%
                      </motion.div>
                      <div className="text-black/80 text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl mb-4 sm:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12">Productivity Score</div>
                      <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl bg-black/10 rounded-full h-2 sm:h-3 lg:h-4 xl:h-5 2xl:h-6 3xl:h-7 4xl:h-8 5xl:h-10">
                        <motion.div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full shadow-lg"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: ["0%", "87%", "75%", "87%", "80%", "87%"]
                          }}
                          transition={{ 
                            duration: 4, 
                            delay: 0.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          whileHover={{
                            scale: 1.02
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Bottom section - Stats */}
                    <div className="flex justify-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
                      <div className="text-center p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 border-2 border-green-400/30 rounded-lg lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl">
                        <div className="text-black text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-bold">23</div>
                        <div className="text-black/60 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl">Tasks Done</div>
                      </div>
                      <div className="text-center p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 border-2 border-green-400/30 rounded-lg lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl">
                        <div className="text-black text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-bold">5</div>
                        <div className="text-black/60 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl">Streak Days</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
