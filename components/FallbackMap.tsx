'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Shield, Navigation, Zap, AlertTriangle } from 'lucide-react'

interface FallbackMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  onLocationSelect?: (location: { lat: number; lng: number }) => void
  className?: string
}

// Mock Toronto neighborhoods for demonstration
const TORONTO_AREAS = [
  {
    id: 'downtown',
    name: 'Downtown Core',
    center: { lat: 43.6532, lng: -79.3832 },
    safetyLevel: 'high',
    description: 'Business district with good security'
  },
  {
    id: 'kensington',
    name: 'Kensington Market',
    center: { lat: 43.6549, lng: -79.4009 },
    safetyLevel: 'high',
    description: 'Vibrant cultural area'
  },
  {
    id: 'entertainment',
    name: 'Entertainment District',
    center: { lat: 43.6443, lng: -79.3892 },
    safetyLevel: 'medium',
    description: 'Active nightlife area'
  },
  {
    id: 'chinatown',
    name: 'Chinatown',
    center: { lat: 43.6531, lng: -79.3973 },
    safetyLevel: 'medium',
    description: 'Cultural district with restaurants'
  },
  {
    id: 'distillery',
    name: 'Distillery District',
    center: { lat: 43.6503, lng: -79.3592 },
    safetyLevel: 'high',
    description: 'Historic cobblestone district'
  }
]

export default function FallbackMap({ 
  center = { lat: 43.6532, lng: -79.3832 }, 
  zoom = 13, 
  onLocationSelect,
  className = ''
}: FallbackMapProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  const handleAreaClick = (area: typeof TORONTO_AREAS[0]) => {
    setSelectedArea(area.id)
    if (onLocationSelect) {
      onLocationSelect(area.center)
    }
  }

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'high': return <Shield className="w-4 h-4 text-green-600" />
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'low': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Shield className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className={`relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-blue-300 dark:border-gray-600 overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Interactive Toronto Safety Map
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <Zap className="w-4 h-4" />
              Demo Mode
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Click on areas to explore safety information and local insights
          </p>
        </div>
      </div>

      {/* Map Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Central Toronto illustration */}
          <div className="w-80 h-80 relative">
            {/* Background city outline */}
            <svg 
              viewBox="0 0 320 320" 
              className="w-full h-full absolute inset-0 text-blue-200 dark:text-gray-600"
            >
              <circle cx="160" cy="160" r="150" fill="currentColor" opacity="0.1" />
              <circle cx="160" cy="160" r="100" fill="currentColor" opacity="0.2" />
              <circle cx="160" cy="160" r="50" fill="currentColor" opacity="0.3" />
            </svg>

            {/* Area markers */}
            {TORONTO_AREAS.map((area, index) => {
              const angle = (index * 72) * (Math.PI / 180) // 72 degrees apart
              const radius = 80
              const x = 160 + Math.cos(angle) * radius
              const y = 160 + Math.sin(angle) * radius

              return (
                <motion.div
                  key={area.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: x, top: y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAreaClick(area)}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                >
                  <div className={`w-16 h-16 rounded-full border-3 shadow-lg transition-all duration-300 ${
                    selectedArea === area.id 
                      ? 'border-blue-500 bg-blue-500' 
                      : `border-white bg-white hover:shadow-xl`
                  }`}>
                    <div className="w-full h-full flex items-center justify-center">
                      {getSafetyIcon(area.safetyLevel)}
                    </div>
                  </div>

                  {/* Area label */}
                  <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                    hoveredArea === area.id || selectedArea === area.id 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-70 scale-90'
                  }`}>
                    <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg text-center min-w-max">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {area.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {area.description}
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <div className={`w-2 h-2 rounded-full ${getSafetyColor(area.safetyLevel)}`} />
                        <span className="text-xs capitalize text-gray-600 dark:text-gray-400">
                          {area.safetyLevel} safety
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Center marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-8 h-8 bg-blue-600 rounded-full shadow-lg flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Navigation className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Area Info */}
      {selectedArea && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 z-10"
        >
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            {(() => {
              const area = TORONTO_AREAS.find(a => a.id === selectedArea)
              if (!area) return null
              
              return (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {area.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getSafetyIcon(area.safetyLevel)}
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {area.safetyLevel} Safety Level
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {area.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {area.center.lat.toFixed(4)}, {area.center.lng.toFixed(4)}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedArea(null)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        </motion.div>
      )}

      {/* Demo Notice */}
      <div className="absolute top-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-2"
        >
          <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-medium">Google Maps Demo Mode</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}