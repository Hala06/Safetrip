'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  User, 
  MapPin, 
  Settings, 
  History, 
  Heart, 
  Shield, 
  Globe,
  LogOut,
  Plus,
  Calendar,
  Navigation
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SafetyMap from '@/components/SafetyMap'
import AIChatBot from '@/components/AIChatBot'
import SmartFilters from '@/components/SmartFilters'
import AreaSummary from '@/components/AreaSummary'
import { AnimatedCard } from '@/components/ui/AnimatedComponents'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { Place } from '@/lib/api'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const [user] = useState({
    name: 'Demo User',
    email: 'demo@safetrip.ai',
    totalTrips: 5,
    savedPlaces: 12,
    safetyScore: 95,
    preferredCity: 'toronto'
  })

  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number }>({
    lat: 43.6532,
    lng: -79.3832
  })
  
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([])
  const [activeTab, setActiveTab] = useState<'explore' | 'saved' | 'history'>('explore')
  
  const router = useRouter()

  const handleLogout = () => {
    toast.success('Logged out successfully! (Demo)')
    router.push('/')
  }

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location)
    toast.success('Location selected! View area summary below.')
  }

  const handleFilterChange = (filters: any, results: Place[]) => {
    setFilteredPlaces(results)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-950">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore Toronto safely with real-time insights and AI assistance
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <AnimatedButton
                  onClick={() => router.push('/demo')}
                  className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Plan New Trip
                </AnimatedButton>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'Total Trips',
                value: user.totalTrips,
                icon: Globe,
                color: 'from-blue-500 to-blue-600',
                change: '+2 this month'
              },
              {
                title: 'Saved Places',
                value: user.savedPlaces,
                icon: Heart,
                color: 'from-pink-500 to-pink-600',
                change: '+4 this week'
              },
              {
                title: 'Safety Score',
                value: `${user.safetyScore}%`,
                icon: Shield,
                color: 'from-green-500 to-green-600',
                change: 'Excellent'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <AnimatedCard className="p-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
              <div className="flex space-x-2">
                {[
                  { id: 'explore', label: 'Explore Areas', icon: Navigation },
                  { id: 'saved', label: 'Saved Places', icon: Heart },
                  { id: 'history', label: 'Trip History', icon: History }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          {activeTab === 'explore' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Filters */}
              <SmartFilters 
                city={user.preferredCity}
                onFilterChange={handleFilterChange}
              />

              {/* Map and Area Summary */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <SafetyMap
                    city={user.preferredCity}
                    onLocationSelect={handleLocationSelect}
                    showFilters={false}
                  />
                </div>
                <div>
                  <AreaSummary
                    location={selectedLocation}
                    city={user.preferredCity}
                  />
                </div>
              </div>

              {/* Filtered Places */}
              {filteredPlaces.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Filtered Results ({filteredPlaces.length} places)
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlaces.slice(0, 6).map((place) => (
                      <AnimatedCard key={place.id} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{place.name}</h4>
                          <div className="flex items-center gap-1">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">{place.safetyRating}</span>
                          </div>
                        </div>
                        
                        {place.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{place.description}</p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{'⭐'.repeat(Math.floor(place.ratings.overall))}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{place.ratings.overall}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            {place.isHalal && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded">
                                Halal
                              </span>
                            )}
                            {place.accessibility.wheelchairAccessible && (
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                                Accessible
                              </span>
                            )}
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Saved Places Tab */}
          {activeTab === 'saved' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Saved Places Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start exploring and save your favorite places for future trips
              </p>
              <AnimatedButton
                onClick={() => setActiveTab('explore')}
                className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-lg"
              >
                Explore Places
              </AnimatedButton>
            </motion.div>
          )}

          {/* Trip History Tab */}
          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Trip History</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your travel history will appear here once you start planning trips
              </p>
              <AnimatedButton
                onClick={() => router.push('/demo')}
                className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-lg"
              >
                Plan Your First Trip
              </AnimatedButton>
            </motion.div>
          )}

        </div>
      </main>

      {/* AI ChatBot */}
      <AIChatBot
        city={user.preferredCity}
        userLocation={selectedLocation}
      />

      <Footer />
    </div>
  )
}
