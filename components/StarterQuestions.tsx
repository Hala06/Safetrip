'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, MapPin, Clock, DollarSign, Users, Shield, Heart } from 'lucide-react'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { AnimatedCard } from '@/components/ui/AnimatedComponents'
import { FadeInUp } from '@/components/ui/PageTransitions'

interface StarterQuestionsProps {
  onComplete: (answers: any) => void
}

const questions = [
  {
    id: 'travel_style',
    title: 'What kind of traveler are you?',
    type: 'single',
    options: [
      { value: 'explorer', label: 'Explorer', icon: '🗺️', description: 'I love discovering hidden gems' },
      { value: 'cultural', label: 'Cultural', icon: '🕌', description: 'I prioritize cultural experiences' },
      { value: 'foodie', label: 'Foodie', icon: '🍽️', description: 'I travel for the food' },
      { value: 'budget', label: 'Budget Conscious', icon: '💰', description: 'I want the best value' }
    ]
  },
  {
    id: 'safety_priority',
    title: 'How important is safety to you?',
    type: 'single',
    options: [
      { value: 'very_high', label: 'Very High', icon: '🛡️', description: 'Safety is my top priority' },
      { value: 'high', label: 'High', icon: '⚠️', description: 'Important but flexible' },
      { value: 'moderate', label: 'Moderate', icon: '😌', description: 'I take reasonable precautions' },
      { value: 'low', label: 'Adventurous', icon: '🎒', description: 'I like some risk' }
    ]
  },
  {
    id: 'budget_range',
    title: 'What\'s your typical daily budget?',
    type: 'single',
    options: [
      { value: 'budget', label: 'Budget', icon: '💵', description: 'Under $50/day' },
      { value: 'moderate', label: 'Moderate', icon: '💳', description: '$50-$150/day' },
      { value: 'comfortable', label: 'Comfortable', icon: '💎', description: '$150-$300/day' },
      { value: 'luxury', label: 'Luxury', icon: '🏆', description: '$300+/day' }
    ]
  },
  {
    id: 'interests',
    title: 'What interests you most? (Select all that apply)',
    type: 'multiple',
    options: [
      { value: 'religious_sites', label: 'Religious Sites', icon: '🕌', description: 'Mosques, churches, temples' },
      { value: 'halal_food', label: 'Halal Food', icon: '🥘', description: 'Certified halal restaurants' },
      { value: 'museums', label: 'Museums & Art', icon: '🎨', description: 'Cultural institutions' },
      { value: 'nature', label: 'Nature & Parks', icon: '🌳', description: 'Green spaces and outdoors' },
      { value: 'shopping', label: 'Shopping', icon: '🛍️', description: 'Markets and malls' },
      { value: 'nightlife', label: 'Entertainment', icon: '🎭', description: 'Shows and activities' }
    ]
  },
  {
    id: 'accessibility',
    title: 'Do you have any accessibility needs?',
    type: 'multiple',
    options: [
      { value: 'wheelchair', label: 'Wheelchair Access', icon: '♿', description: 'Need wheelchair accessibility' },
      { value: 'elevator', label: 'Elevator Access', icon: '🛗', description: 'Prefer elevator access' },
      { value: 'parking', label: 'Parking', icon: '🅿️', description: 'Need accessible parking' },
      { value: 'none', label: 'No Special Needs', icon: '✅', description: 'No accessibility requirements' }
    ]
  }
]

export default function StarterQuestions({ onComplete }: StarterQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleAnswerSelect = (questionId: string, value: string, type: string) => {
    if (type === 'multiple') {
      const currentAnswers = answers[questionId] || []
      let newAnswers
      
      if (currentAnswers.includes(value)) {
        newAnswers = currentAnswers.filter((v: string) => v !== value)
      } else {
        newAnswers = [...currentAnswers, value]
      }
      
      setAnswers({ ...answers, [questionId]: newAnswers })
      setSelectedOptions(newAnswers)
    } else {
      setAnswers({ ...answers, [questionId]: value })
      setSelectedOptions([value])
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      const nextQuestion = questions[currentQuestion + 1]
      setSelectedOptions(answers[nextQuestion.id] || [])
    } else {
      onComplete(answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const prevQuestion = questions[currentQuestion - 1]
      setSelectedOptions(answers[prevQuestion.id] || [])
    }
  }

  const currentQ = questions[currentQuestion]
  const hasAnswer = currentQ.type === 'multiple' 
    ? (answers[currentQ.id] || []).length > 0
    : answers[currentQ.id]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Let's personalize your experience
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedCard className="p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {currentQ.title}
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedOptions.includes(option.value)
                  
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswerSelect(currentQ.id, option.value, currentQ.type)}
                      className={`p-6 rounded-2xl text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl'
                          : 'bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{option.icon}</div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg mb-2 ${
                            isSelected ? 'text-white' : 'text-gray-900 dark:text-white'
                          }`}>
                            {option.label}
                          </h3>
                          <p className={`text-sm ${
                            isSelected ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </AnimatedCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <AnimatedButton
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </AnimatedButton>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-500'
                    : index < currentQuestion
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <AnimatedButton
            onClick={handleNext}
            disabled={!hasAnswer}
            className="flex items-center gap-2"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </AnimatedButton>
        </div>
      </div>
    </div>
  )
}
