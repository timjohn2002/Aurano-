'use client'

import { motion } from 'framer-motion'
import { Mic, Target, Zap, Focus, CheckCircle, ArrowRight } from 'lucide-react'
import GlowingButton from '@/components/ui/GlowingButton'

const problems = [
  {
    id: 1,
    problem: "Friction in Daily Tracking",
    description: "Most people struggle to log their routines, habits, or tasks because it feels like work — typing notes, updating apps, and checking boxes.",
    solution: "Aurano solves this with voice input: speak your habits or tasks in seconds, and they're instantly organized.",
    icon: Mic,
    gradient: "from-black via-beige/5 to-beige/10",
    iconColor: "text-beige/80",
    borderColor: "border-beige/20"
  },
  {
    id: 2,
    problem: "Lack of Consistency & Discipline",
    description: "People start routines strong but quickly fall off because they don't have a system that keeps them accountable.",
    solution: "Aurano solves this with a dashboard + gamification: tasks, categories, and a 'Productivity Score' that motivates consistency.",
    icon: Target,
    gradient: "from-black via-beige/8 to-beige/15",
    iconColor: "text-beige/80",
    borderColor: "border-beige/25"
  },
  {
    id: 3,
    problem: "Overwhelm from Too Many Tools",
    description: "Users bounce between journals, to-do apps, calendars, and pomodoro timers — creating confusion instead of clarity.",
    solution: "Aurano solves this by combining everything in one place: voice journal, task list, categories, overview calendar, and Focus Mode.",
    icon: Zap,
    gradient: "from-black via-beige/10 to-beige/20",
    iconColor: "text-beige/80",
    borderColor: "border-beige/30"
  },
  {
    id: 4,
    problem: "Distractions & Poor Focus",
    description: "Even with plans, people lose focus because of notifications, app-hopping, and procrastination.",
    solution: "Aurano solves this with Focus Mode: a full-screen timer that blocks distractions and rewards completed deep work sessions.",
    icon: Focus,
    gradient: "from-black via-beige/12 to-beige/25",
    iconColor: "text-beige/80",
    borderColor: "border-beige/35"
  }
]

export default function ProblemsSection() {
  return (
    <section id="problems" className="py-16 sm:py-20 lg:py-24 xl:py-32 2xl:py-40 bg-black relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-beige/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10">
            <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
              The Problems We Solve
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-beige/70 max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
            Every productivity app promises to help, but most create more problems than they solve. Here's how Aurano is different.
          </p>
        </motion.div>

        {/* Problems Grid - Horizontal Stack */}
        <div className="flex flex-row gap-2 sm:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 overflow-x-auto animate-auto-scroll py-8 px-16" style={{ width: '450%' }}>
          {problems.map((item, index) => {
            const Icon = item.icon
            
            return (
              <motion.div
                key={item.id}
                className="group flex-shrink-0 w-80 sm:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] my-4 mx-4"
                style={{ width: '22.2%' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
              <div 
                className={`bg-gradient-to-b ${item.gradient} ${item.borderColor} border-2 rounded-xl lg:rounded-2xl xl:rounded-3xl 2xl:rounded-[1.5rem] p-4 sm:p-5 lg:p-6 xl:p-8 2xl:p-10 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-beige/10 h-full flex flex-col relative overflow-visible animate-light-strike`}
                style={{
                  animation: `autoRotate 8s ease-in-out infinite, lightStrike 3s ease-in-out infinite`,
                  animationDelay: `${index * 2}s, ${index * 0.5}s`
                }}
              >
                  {/* Grain texture overlay */}
                  <div 
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                      backgroundSize: '200px 200px',
                      backgroundRepeat: 'repeat'
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="flex flex-col items-center text-center mb-4 sm:mb-5 lg:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18 bg-beige/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-3">
                        <Icon size={20} className={`sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 ${item.iconColor}`} />
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-beige group-hover:text-white transition-colors duration-300 leading-tight text-center">
                        {item.problem}
                      </h3>
                    </div>

                  {/* Problem Description */}
                  <div className="mb-4 sm:mb-5 lg:mb-6 flex-1 flex flex-col justify-center min-h-[80px]">
                    <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-beige/80 leading-relaxed text-center">
                      {item.description}
                    </p>
                  </div>

                    {/* Solution */}
                    <div className="flex items-start gap-2 sm:gap-3 min-h-[60px]">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-beige font-medium leading-relaxed">
                          {item.solution}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center mt-3 sm:mt-4 lg:mt-5">
                      <ArrowRight size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-beige/60 group-hover:text-beige group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20 xl:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-beige/80 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 2xl:mb-16">
            Ready to solve these problems for yourself?
          </p>
          <GlowingButton
            href="#waitlist"
            icon={<Mic size={20} className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12" />}
            className="px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-16 py-3 sm:py-4 lg:py-5 xl:py-6 2xl:py-8 text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Join the Waitlist
          </GlowingButton>
        </motion.div>
      </div>
    </section>
  )
}
