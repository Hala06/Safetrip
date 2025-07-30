'use client'

import { useState } from 'react'
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
  Calendar
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatedCard } from '@/components/ui/AnimatedComponents'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const [user] = useState({
    name: 'Demo User',
    email: 'demo@safetrip.ai',
    totalTrips: 5,
    savedPlaces: 12,
    safetyScore: 95
  })

  const router = useRouter()

  const handleLogout = () => {
    toast.success('Logged out successfully! (Demo)')
    router.push('/')
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
                  Ready for your next safe adventure?
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

          {/* Demo Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-12"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🎭 Welcome to the Demo Dashboard!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                This is a fully functional demo dashboard. In a real application, this would connect to your backend API to show real user data, trips, and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  onClick={() => router.push('/demo')}
                  className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Try Trip Planning Demo
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => router.push('/about')}
                  className="bg-white dark:bg-dark-800 text-primary-600 border border-primary-300 px-8 py-3 rounded-lg font-semibold"
                >
                  Learn More
                </AnimatedButton>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
