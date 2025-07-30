'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Shield, DollarSign, Users, Accessibility, Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserPreferences } from '@/lib/validations'

interface PreferencesSetupProps {
  onComplete: (preferences: Partial<UserPreferences>) => void
  onSkip: () => void
}

const steps = [
  {
    id: 'religion',
    title: 'Religious Preferences',
    description: 'Help us find places that align with your values',
    icon: Heart,
  },
  {
    id: 'dietary',
    title: 'Dietary Requirements',
    description: 'What dietary restrictions do you have?',
    icon: Heart,
  },
  {
    id: 'safety',
    title: 'Safety Preferences',
    description: 'What areas would you like to avoid?',
    icon: Shield,
  },
  {
    id: 'travel',
    title: 'Travel Style',
    description: 'How do you usually travel?',
    icon: Users,
  },
  {
    id: 'budget',
    title: 'Budget Range',
    description: 'What\'s your typical travel budget?',
    icon: DollarSign,
  },
  {
    id: 'accessibility',
    title: 'Accessibility Needs',
    description: 'Any mobility or accessibility requirements?',
    icon: Accessibility,
  },
]

const religionOptions = [
  { value: 'muslim', label: 'Muslim', emoji: '☪️' },
  { value: 'christian', label: 'Christian', emoji: '✝️' },
  { value: 'jewish', label: 'Jewish', emoji: '✡️' },
  { value: 'hindu', label: 'Hindu', emoji: '🕉️' },
  { value: 'buddhist', label: 'Buddhist', emoji: '☸️' },
  { value: 'none', label: 'No specific religion', emoji: '🌟' },
  { value: 'other', label: 'Other', emoji: '🙏' },
]

const dietaryOptions = [
  { value: 'halal', label: 'Halal', emoji: '🥘' },
  { value: 'kosher', label: 'Kosher', emoji: '🍖' },
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'gluten-free', label: 'Gluten-free', emoji: '🌾' },
  { value: 'none', label: 'No restrictions', emoji: '🍽️' },
]

const avoidOptions = [
  { value: 'bars', label: 'Bars & Nightlife', emoji: '🍺' },
  { value: 'red-light', label: 'Red-light districts', emoji: '🚫' },
  { value: 'high-crime', label: 'High-crime areas', emoji: '⚠️' },
  { value: 'crowded', label: 'Very crowded places', emoji: '👥' },
  { value: 'none', label: 'No specific areas to avoid', emoji: '✨' },
]

const travelStyleOptions = [
  { value: 'solo', label: 'Solo traveler', emoji: '🎒' },
  { value: 'couple', label: 'Couple', emoji: '💑' },
  { value: 'family', label: 'Family with children', emoji: '👨‍👩‍👧‍👦' },
  { value: 'group', label: 'Group/Friends', emoji: '👥' },
]

const budgetOptions = [
  { value: 'low', label: 'Budget-conscious', description: 'Under $50/day', emoji: '💰' },
  { value: 'medium', label: 'Moderate', description: '$50-150/day', emoji: '💳' },
  { value: 'high', label: 'Comfortable', description: 'Above $150/day', emoji: '💎' },
]

const mobilityOptions = [
  { value: 'wheelchair', label: 'Wheelchair accessible', emoji: '♿' },
  { value: 'limited-mobility', label: 'Limited mobility', emoji: '🦯' },
  { value: 'none', label: 'No specific needs', emoji: '🚶' },
]

export default function PreferencesSetup({ onComplete, onSkip }: PreferencesSetupProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    dietaryRestrictions: [],
    avoidAreas: [],
    mobilityNeeds: [],
    preferredActivities: [],
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(preferences)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const toggleArrayPreference = (key: keyof UserPreferences, value: string) => {
    setPreferences(prev => {
      const currentArray = (prev[key] as string[]) || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return { ...prev, [key]: newArray }
    })
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'religion':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {religionOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updatePreference('religion', option.value)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left",
                  preferences.religion === option.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                  {preferences.religion === option.value && (
                    <Check className="w-5 h-5 text-blue-500 ml-auto" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )

      case 'dietary':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dietaryOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleArrayPreference('dietaryRestrictions', option.value)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left",
                  (preferences.dietaryRestrictions as string[])?.includes(option.value)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                  {(preferences.dietaryRestrictions as string[])?.includes(option.value) && (
                    <Check className="w-5 h-5 text-blue-500 ml-auto" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )

      case 'safety':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {avoidOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleArrayPreference('avoidAreas', option.value)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left",
                  (preferences.avoidAreas as string[])?.includes(option.value)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                  {(preferences.avoidAreas as string[])?.includes(option.value) && (
                    <Check className="w-5 h-5 text-blue-500 ml-auto" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )

      case 'travel':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {travelStyleOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updatePreference('travelStyle', option.value)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left",
                  preferences.travelStyle === option.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                  {preferences.travelStyle === option.value && (
                    <Check className="w-5 h-5 text-blue-500 ml-auto" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )

      case 'budget':
        return (
          <div className="space-y-3">
            {budgetOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updatePreference('budget', option.value)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all text-left",
                  preferences.budget === option.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                )}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      {preferences.budget === option.value && (
                        <Check className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )

      case 'accessibility':
        return (
          <div className="grid grid-cols-1 gap-3">
            {mobilityOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleArrayPreference('mobilityNeeds', option.value)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left",
                  (preferences.mobilityNeeds as string[])?.includes(option.value)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                  {(preferences.mobilityNeeds as string[])?.includes(option.value) && (
                    <Check className="w-5 h-5 text-blue-500 ml-auto" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentStepData.description}
            </p>
          </div>

          <div className="mb-8">
            {renderStepContent()}
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSkip}
                className="px-6 py-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Skip Setup
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
