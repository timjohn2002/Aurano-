'use client'

import { motion } from 'framer-motion'
import { Mic, Target, Zap, Focus, CheckCircle, ArrowRight } from 'lucide-react'

const problems = [
  {
    id: 1,
    problem: "Friction in Daily Tracking",
    description: "Most people struggle to log their routines, habits, or tasks because it feels like work — typing notes, updating apps, and checking boxes.",
    solution: "Aurano solves this with voice input: speak your habits or tasks in seconds, and they're instantly organized.",
    icon: Mic,
    color: "bg-red-500/10",
    iconColor: "text-red-400",
    borderColor: "border-red-500/20"
  },
  {
    id: 2,
    problem: "Lack of Consistency & Discipline",
    description: "People start routines strong but quickly fall off because they don't have a system that keeps them accountable.",
    solution: "Aurano solves this with a dashboard + gamification: tasks, categories, and a 'Productivity Score' that motivates consistency.",
    icon: Target,
    color: "bg-orange-500/10",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/20"
  },
  {
    id: 3,
    problem: "Overwhelm from Too Many Tools",
    description: "Users bounce between journals, to-do apps, calendars, and pomodoro timers — creating confusion instead of clarity.",
    solution: "Aurano solves this by combining everything in one place: voice journal, task list, categories, overview calendar, and Focus Mode.",
    icon: Zap,
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/20"
  },
  {
    id: 4,
    problem: "Distractions & Poor Focus",
    description: "Even with plans, people lose focus because of notifications, app-hopping, and procrastination.",
    solution: "Aurano solves this with Focus Mode: a full-screen timer that blocks distractions and rewards completed deep work sessions.",
    icon: Focus,
    color: "bg-green-500/10",
    iconColor: "text-green-400",
    borderColor: "border-green-500/20"
  }
]

export default function ProblemsSection() {
  return (
    <section id="problems" className="py-16 sm:py-20 lg:py-24 xl:py-32 2xl:py-40 bg-black relative overflow-hidden">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold text-beige mb-3 sm:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10">
            The Problems We Solve
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-beige/70 max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
            Every productivity app promises to help, but most create more problems than they solve. Here's how Aurano is different.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
          {problems.map((item, index) => {
            const Icon = item.icon
            
            return (
              <motion.div
                key={item.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`${item.color} ${item.borderColor} border-2 rounded-xl lg:rounded-2xl xl:rounded-3xl 2xl:rounded-[1.5rem] p-4 sm:p-5 lg:p-6 xl:p-8 2xl:p-10 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-beige/10 h-full flex flex-col`}>
                  {/* Icon */}
                  <div className="flex flex-col items-center text-center mb-4 sm:mb-5 lg:mb-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18 ${item.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-3`}>
                      <Icon size={20} className={`sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-beige group-hover:text-white transition-colors duration-300 leading-tight">
                      {item.problem}
                    </h3>
                  </div>

                  {/* Problem Description */}
                  <div className="mb-3 sm:mb-4 lg:mb-5 flex-1">
                    <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-beige/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-green-400 font-medium leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center mt-3 sm:mt-4 lg:mt-5">
                    <ArrowRight size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-beige/60 group-hover:text-beige group-hover:translate-x-2 transition-all duration-300" />
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
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 bg-beige/20 text-white px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-16 py-3 sm:py-4 lg:py-5 xl:py-6 2xl:py-8 rounded-full text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium hover:bg-beige/30 transition-all duration-300 hover:scale-105 shadow-lg border border-beige/30 group"
          >
            <Mic size={20} className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12" />
            <span>Join the Waitlist</span>
            <ArrowRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
