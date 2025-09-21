'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'

export default function CreatorMessageSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Video Placeholder */}
    <div className="mb-8">
      <div className="aspect-video bg-beige/10 border border-beige/20 rounded-2xl overflow-hidden shadow-lg relative group cursor-pointer">
        <Image
          src="/dane-video-thumbnail.jpg"
          alt="Dane's message thumbnail"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.button
            className="w-20 h-20 bg-beige rounded-full flex items-center justify-center hover:bg-beige/80 transition-colors shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={32} className="text-black ml-1" />
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-beige mb-6">
              Built with you in mind
            </h2>
            <p className="text-xl text-beige/70 leading-relaxed max-w-2xl mx-auto">
              Discipline made simple. Aurano transforms the way you think about productivity by making it as natural as speaking.
            </p>
          </motion.div>

          {/* Creator Info */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
    <div className="w-12 h-12 border border-beige/30 rounded-full overflow-hidden">
      <Image 
        src="https://instagram.fyvr1-1.fna.fbcdn.net/v/t51.2885-19/439533665_728104492728620_628560370648025937_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4zMjAuYzIifQ&_nc_ht=instagram.fyvr1-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QGyr_JVRj6TWSFyujieGDs_vfO-kuUUZvt6WdHXbg1C8gc41u9SIZ_FmcVVLbzDNyw&_nc_ohc=IaiN67JMsb8Q7kNvwFQ65Ns&_nc_gid=63FU5d797Rm6-CZUg4E01g&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfaKsKj1w7AWcColjxdOGETTDMJgWTkzQZJ7s58wjBPzJQ&oe=68D2EBA8&_nc_sid=7a9f4b" 
        alt="Dane - Founder & Creator" 
        width={48}
        height={48}
        className="w-full h-full object-cover"
      />
    </div>
            <div className="text-left">
              <div className="font-semibold text-beige">Dane</div>
              <div className="text-sm text-beige/60">Founder & Creator</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
