'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    text: "Aurano has completely changed how I organize my thoughts. I can just speak my tasks and they're automatically organized.",
    author: "Sarah Chen",
    role: "Product Manager",
    rating: 5
  },
  {
    text: "The voice input feature is a game-changer. No more forgetting tasks because I can capture them instantly while walking.",
    author: "Marcus Johnson",
    role: "Entrepreneur",
    rating: 5
  },
  {
    text: "Finally, a productivity app that feels natural. The focus mode has helped me get so much more done.",
    author: "Emily Rodriguez",
    role: "Designer",
    rating: 5
  }
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-beige mb-6">
            What people are saying
          </h2>
              <p className="text-xl text-beige/70 max-w-2xl mx-auto">
                Join hundreds who are already transforming their productivity
              </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-black border border-beige/20 p-8 rounded-2xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-beige/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-beige/20 border border-beige/30 rounded-full flex items-center justify-center">
                  <span className="text-beige font-semibold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-beige text-sm">{testimonial.author}</div>
                  <div className="text-beige/60 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats with glowing lines */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative flex flex-col items-center justify-center py-8">
            {/* Glowing shadow lines with rounded ends and fade */}
            <div className="absolute top-0 left-0 w-full h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-beige/30 to-transparent rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-beige/30 to-transparent rounded-full" />
            </div>
            
            <p className="text-5xl md:text-6xl font-bold mb-2">
              <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
                500+
              </span>
            </p>
            <p className="text-lg text-beige/70">Beta Users</p>
          </div>
          
          <div className="relative flex flex-col items-center justify-center py-8">
            {/* Glowing shadow lines with rounded ends and fade */}
            <div className="absolute top-0 left-0 w-full h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-beige/30 to-transparent rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-beige/30 to-transparent rounded-full" />
            </div>
            
            {/* Vertical lines for middle column with rounded ends and fade */}
            <div className="absolute top-0 left-0 h-full w-px hidden md:block">
              <div className="w-full bg-gradient-to-b from-transparent via-beige/30 to-transparent rounded-full" />
            </div>
            <div className="absolute top-0 right-0 h-full w-px hidden md:block">
              <div className="w-full bg-gradient-to-b from-transparent via-beige/30 to-transparent rounded-full" />
            </div>
            
            <p className="text-5xl md:text-6xl font-bold mb-2">
              <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
                82,170
              </span>
            </p>
            <p className="text-lg text-beige/70">Tasks Created</p>
          </div>
          
          <div className="relative flex flex-col items-center justify-center py-8">
            {/* Glowing shadow lines with rounded ends and fade */}
            <div className="absolute top-0 left-0 w-full h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-beige/30 to-transparent rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-beige/30 to-transparent rounded-full" />
            </div>
            
            <p className="text-5xl md:text-6xl font-bold mb-2">
              <span className="bg-gradient-to-b from-beige via-beige/80 to-beige/50 bg-clip-text text-transparent">
                92%
              </span>
            </p>
            <p className="text-lg text-beige/70">Time Efficiency Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
