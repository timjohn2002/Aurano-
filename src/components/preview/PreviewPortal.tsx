'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  ExternalLink, 
  Play, 
  Pause, 
  RotateCcw,
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

type DeviceType = 'desktop' | 'tablet' | 'mobile'
type ViewMode = 'landing' | 'dashboard' | 'overview' | 'focus'

const deviceSizes = {
  desktop: { width: '1200px', height: '800px' },
  tablet: { width: '768px', height: '1024px' },
  mobile: { width: '375px', height: '667px' }
}

export default function PreviewPortal() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop')
  const [currentView, setCurrentView] = useState<ViewMode>('landing')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const views = [
    { id: 'landing', name: 'Landing Page', url: '/' },
    { id: 'dashboard', name: 'Dashboard', url: '/app' },
    { id: 'overview', name: 'Overview', url: '/app/overview' },
    { id: 'focus', name: 'Focus Mode', url: '/app/focus' }
  ]

  const currentViewIndex = views.findIndex(view => view.id === currentView)

  const nextView = () => {
    const nextIndex = (currentViewIndex + 1) % views.length
    setCurrentView(views[nextIndex].id as ViewMode)
  }

  const prevView = () => {
    const prevIndex = currentViewIndex === 0 ? views.length - 1 : currentViewIndex - 1
    setCurrentView(views[prevIndex].id as ViewMode)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Auto-advance through views
      const interval = setInterval(() => {
        nextView()
      }, 5000)
      
      setTimeout(() => {
        clearInterval(interval)
        setIsPlaying(false)
      }, 20000) // Stop after 20 seconds
    }
  }

  const resetPreview = () => {
    setCurrentView('landing')
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-serif font-bold text-black">Aurano Preview Portal</h1>
              <span className="text-sm text-gray-500">Interactive Demo</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFullscreen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ExternalLink size={16} />
                Fullscreen
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Device Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">Device Preview</h3>
              <div className="flex gap-2">
                {[
                  { type: 'desktop', icon: Monitor, label: 'Desktop' },
                  { type: 'tablet', icon: Tablet, label: 'Tablet' },
                  { type: 'mobile', icon: Smartphone, label: 'Mobile' }
                ].map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setSelectedDevice(type as DeviceType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedDevice === type 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Navigation */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">View Navigation</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevView}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
                
                <select
                  value={currentView}
                  onChange={(e) => setCurrentView(e.target.value as ViewMode)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  {views.map(view => (
                    <option key={view.id} value={view.id}>{view.name}</option>
                  ))}
                </select>
                
                <button
                  onClick={nextView}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">Playback</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isPlaying 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Pause' : 'Auto Play'}
                </button>
                
                <button
                  onClick={resetPreview}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Frame */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">
                {views.find(v => v.id === currentView)?.name} - {selectedDevice}
              </span>
            </div>
            
            <div className="text-sm text-gray-500">
              {deviceSizes[selectedDevice].width} × {deviceSizes[selectedDevice].height}
            </div>
          </div>
          
          <div className="flex justify-center p-8 bg-gray-50">
            <div 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              style={{
                width: deviceSizes[selectedDevice].width,
                height: deviceSizes[selectedDevice].height,
                maxWidth: '100%',
                maxHeight: '80vh'
              }}
            >
              <iframe
                src={views.find(v => v.id === currentView)?.url}
                className="w-full h-full border-0"
                title={`Aurano ${views.find(v => v.id === currentView)?.name} Preview`}
              />
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {views.map((view, index) => (
            <motion.div
              key={view.id}
              className="bg-white rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setCurrentView(view.id as ViewMode)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                currentView === view.id ? 'bg-black text-white' : 'bg-beige text-black'
              }`}>
                {index + 1}
              </div>
              <h4 className="font-semibold text-black mb-2">{view.name}</h4>
              <p className="text-sm text-gray-600">
                {view.id === 'landing' && 'Hero, features, demo, testimonials, and waitlist signup'}
                {view.id === 'dashboard' && 'Task overview, productivity score, and quick actions'}
                {view.id === 'overview' && 'List/calendar view with advanced filtering and search'}
                {view.id === 'focus' && 'Full-screen Pomodoro timer with customizable sessions'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowFullscreen(false)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            
            <div className="h-full flex items-center justify-center p-4">
              <iframe
                src={views.find(v => v.id === currentView)?.url}
                className="w-full h-full border-0 rounded-lg"
                title={`Aurano ${views.find(v => v.id === currentView)?.name} Fullscreen`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
