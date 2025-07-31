'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Filter, 
  MapPin, 
  DollarSign, 
  Shield, 
  Heart, 
  User, 
  Accessibility, 
  Clock,
  Star,
  Search
} from 'lucide-react'
import { apiClient, Place } from '@/lib/api'

interface SmartFiltersProps {
  city: string
  onFilterChange?: (filters: FilterState, results: Place[]) => void
  className?: string
}

interface FilterState {
  searchQuery: string
  placeTypes: string[]
  safetyRating: number
  budgetLevel: string[]
  isHalal: boolean
  isAccessible: boolean
  openNow: boolean
  ratings: {
    overall: number
    safety: number
  }
}

const defaultFilters: FilterState = {
  searchQuery: '',
  placeTypes: [],
  safetyRating: 0,
  budgetLevel: [],
  isHalal: false,
  isAccessible: false,
  openNow: false,
  ratings: {
    overall: 0,
    safety: 0
  }
}

const placeTypeOptions = [
  { id: 'restaurant', label: 'Restaurants', icon: '🍽️' },
  { id: 'mosque', label: 'Mosques', icon: '🕌' },
  { id: 'tourist_attraction', label: 'Attractions', icon: '🎯' },
  { id: 'park', label: 'Parks', icon: '🌳' },
  { id: 'shopping_mall', label: 'Shopping', icon: '🛍️' },
  { id: 'hospital', label: 'Healthcare', icon: '🏥' },
  { id: 'lodging', label: 'Hotels', icon: '🏨' }
]

const budgetOptions = [
  { id: 'low', label: 'Budget ($)', color: 'text-green-600' },
  { id: 'medium', label: 'Moderate ($$)', color: 'text-yellow-600' },
  { id: 'high', label: 'Premium ($$$)', color: 'text-red-600' }
]

export default function SmartFilters({ city, onFilterChange, className = '' }: SmartFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Place[]>([])
  const [resultCount, setResultCount] = useState(0)

  // Apply filters and fetch results
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true)
      try {
        const apiFilters: any = {
          safetyRating: filters.safetyRating,
          isHalal: filters.isHalal || undefined,
          accessibility: filters.isAccessible || undefined
        }

        if (filters.placeTypes.length > 0) {
          apiFilters.type = filters.placeTypes.join(',')
        }

        if (filters.budgetLevel.length > 0) {
          apiFilters.budgetLevel = filters.budgetLevel.join(',')
        }

        const response = await apiClient.getPlaces(city, apiFilters)
        
        if (response.success && response.data) {
          let filteredResults = response.data

          // Apply client-side filters
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase()
            filteredResults = filteredResults.filter(place =>
              place.name.toLowerCase().includes(query) ||
              place.description?.toLowerCase().includes(query)
            )
          }

          if (filters.ratings.overall > 0) {
            filteredResults = filteredResults.filter(place =>
              place.ratings.overall >= filters.ratings.overall
            )
          }

          if (filters.ratings.safety > 0) {
            filteredResults = filteredResults.filter(place =>
              place.ratings.safety >= filters.ratings.safety
            )
          }

          setResults(filteredResults)
          setResultCount(filteredResults.length)
          
          if (onFilterChange) {
            onFilterChange(filters, filteredResults)
          }
        }
      } catch (error) {
        console.error('Filter error:', error)
      } finally {
        setLoading(false)
      }
    }

    applyFilters()
  }, [city, filters, onFilterChange])

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const togglePlaceType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      placeTypes: prev.placeTypes.includes(type)
        ? prev.placeTypes.filter(t => t !== type)
        : [...prev.placeTypes, type]
    }))
  }

  const toggleBudgetLevel = (level: string) => {
    setFilters(prev => ({
      ...prev,
      budgetLevel: prev.budgetLevel.includes(level)
        ? prev.budgetLevel.filter(l => l !== level)
        : [...prev.budgetLevel, level]
    }))
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
  }

  const hasActiveFilters = 
    filters.searchQuery ||
    filters.placeTypes.length > 0 ||
    filters.safetyRating > 0 ||
    filters.budgetLevel.length > 0 ||
    filters.isHalal ||
    filters.isAccessible ||
    filters.openNow ||
    filters.ratings.overall > 0 ||
    filters.ratings.safety > 0

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Filter className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Smart Filters</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {loading ? 'Searching...' : `${resultCount} places found`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All
              </motion.button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search places, restaurants, attractions..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Expanded Filters */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-6">
          {/* Place Types */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Place Types
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {placeTypeOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => togglePlaceType(option.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all ${
                    filters.placeTypes.includes(option.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Safety & Quality */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Minimum Safety Rating
              </h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={filters.safetyRating}
                  onChange={(e) => updateFilter('safetyRating', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Any</span>
                  <span className="font-medium">{filters.safetyRating}/10</span>
                  <span>Max</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Minimum Overall Rating
              </h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.ratings.overall}
                  onChange={(e) => updateFilter('ratings', { ...filters.ratings, overall: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Any</span>
                  <span className="font-medium">
                    {'⭐'.repeat(Math.floor(filters.ratings.overall))} {filters.ratings.overall}
                  </span>
                  <span>5⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Level */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Budget Range
            </h4>
            <div className="flex flex-wrap gap-2">
              {budgetOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleBudgetLevel(option.id)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    filters.budgetLevel.includes(option.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className={option.color}>{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Special Requirements</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.isHalal}
                  onChange={(e) => updateFilter('isHalal', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600">
                    Halal Certified Only
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.isAccessible}
                  onChange={(e) => updateFilter('isAccessible', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center gap-2">
                  <Accessibility className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600">
                    Wheelchair Accessible
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.openNow}
                  onChange={(e) => updateFilter('openNow', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600">
                    Open Now
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Loading Indicator */}
      {loading && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
            Applying filters...
          </div>
        </div>
      )}
    </div>
  )
}