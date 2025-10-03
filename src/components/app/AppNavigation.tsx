'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/ui/Logo'

interface AppNavigationProps {
  currentPage: 'dashboard' | 'overview' | 'focus'
}

export default function AppNavigation({ currentPage }: AppNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { name: 'Dashboard', href: '/app', key: 'dashboard' },
    { name: 'Overview', href: '/app/overview', key: 'overview' },
    { name: 'Focus', href: '/app/focus', key: 'focus' }
  ]

  return (
    <header className="bg-black border-b border-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6">
              <Logo size="sm" variant="text" />
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {navigationItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className={`font-medium transition-colors ${
                      currentPage === item.key
                        ? 'text-beige'
                        : 'text-beige/60 hover:text-beige'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-beige hover:text-beige/80 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black border-t border-beige/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.key
                      ? 'text-beige bg-beige/10'
                      : 'text-beige/60 hover:text-beige hover:bg-beige/5'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
