'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, MapPin } from 'lucide-react'
import Link from 'next/link'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import StarterQuestions from '@/components/StarterQuestions'
import CitySelection from '@/components/CitySelection'

type DemoStage = 'questions' | 'cities' | 'dashboard'

export default function DemoPage() {
  const [stage, setStage] = useState<DemoStage>('questions')
  const [userAnswers, setUserAnswers] = useState<any>(null)
  const [selectedCity, setSelectedCity] = useState<string>('')

  const handleQuestionsComplete = (answers: any) => {
    setUserAnswers(answers)
    setStage('cities')
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setStage('dashboard')
  }

  if (stage === 'questions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/">
              <AnimatedButton variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </AnimatedButton>
            </Link>
            
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Shield className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <div className="text-xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  SafeTrip.AI
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Setup Experience
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <StarterQuestions onComplete={handleQuestionsComplete} />
      </div>
    )
  }

  if (stage === 'cities') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <AnimatedButton 
              variant="outline" 
              onClick={() => setStage('questions')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Questions
            </AnimatedButton>
            
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <MapPin className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <div className="text-xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  SafeTrip.AI
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  City Selection
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <CitySelection onCitySelect={handleCitySelect} />
      </div>
    )
  }

  // Dashboard stage - redirect to actual dashboard
  if (stage === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl"
            >
              ✅
            </motion.div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Welcome to SafeTrip.AI!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            You're all set to explore {selectedCity === 'toronto' ? 'Toronto' : 'Tokyo'} safely!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/dashboard">
              <AnimatedButton size="lg" className="text-xl px-8 py-4">
                Go to Dashboard
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}
