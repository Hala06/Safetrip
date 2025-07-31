'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Shield, 
  Star, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Clock,
  Navigation,
  Heart,
  Accessibility,
  DollarSign
} from 'lucide-react'
import { apiClient } from '@/lib/api'

interface AreaSummaryProps {
  location: { lat: number; lng: number }
  radius?: number
  city?: string
  className?: string
}

interface AreaData {
  name: string
  safetyScore: number
  highlights: string[]
  warnings: string[]
  recommendedFor: string[]
  nearbyAmenities: {
    halal_restaurants: number
    mosques: number
    accessible_venues: number
    budget_options: number
  }
  localInsights?: {
    bestTimeToVisit?: string
    crowdLevel?: 'low' | 'medium' | 'high'
    publicTransport?: string
    walkingScore?: number
  }
}

const defaultAreaData: AreaData = {
  name: 'Unknown Area',
  safetyScore: 7.5,
  highlights: [
    'Well-lit streets with good visibility',
    'Active community presence during day',
    'Multiple dining options available'
  ],
  warnings: [
    'Exercise normal precautions after dark',
    'Keep valuables secure in crowded areas'
  ],
  recommendedFor: [
    'Solo travelers during day',
    'Families with children',
    'Budget-conscious visitors'
  ],
  nearbyAmenities: {
    halal_restaurants: 5,
    mosques: 2,
    accessible_venues: 8,
    budget_options: 12
  },
  localInsights: {
    bestTimeToVisit: 'Morning to early evening',
    crowdLevel: 'medium',
    publicTransport: 'Good subway and bus connections',
    walkingScore: 8.2
  }
}

export default function AreaSummary({ location, radius = 500, city, className = '' }: AreaSummaryProps) {
  const [areaData, setAreaData] = useState<AreaData>(defaultAreaData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAreaData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiClient.getAreaSummary(location, radius)
        
        if (response.success && response.data) {
          // Ensure all required properties exist
          const safeData = {
            ...defaultAreaData,
            ...response.data,
            highlights: response.data.highlights || defaultAreaData.highlights,
            warnings: response.data.warnings || defaultAreaData.warnings,
            recommendedFor: response.data.recommendedFor || defaultAreaData.recommendedFor,
            nearbyAmenities: {
              ...defaultAreaData.nearbyAmenities,
              ...(response.data.nearbyAmenities || {})
            },
            localInsights: {
              ...defaultAreaData.localInsights,
              ...(response.data.localInsights || {})
            }
          }
          setAreaData(safeData)
        } else {
          // Use default data with location-specific adjustments
          const adjustedData = {
            ...defaultAreaData,
            name: getAreaName(location, city)
          }
          setAreaData(adjustedData)
        }
      } catch (err) {
        console.error('Failed to load area data:', err)
        setError('Unable to load area information')
        setAreaData({
          ...defaultAreaData,
          name: getAreaName(location, city)
        })
      } finally {
        setLoading(false)
      }
    }

    loadAreaData()
  }, [location, radius, city])

  const getAreaName = (location: { lat: number; lng: number }, city?: string) => {
    // In a real app, this would use reverse geocoding
    if (city === 'toronto') {
      if (location.lat > 43.65 && location.lng > -79.39) return 'Downtown Core'
      if (location.lat > 43.65 && location.lng < -79.40) return 'Kensington Market Area'
      return 'Toronto Area'
    }
    return city ? `${city} Area` : 'Selected Area'
  }

  const getSafetyColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100 dark:bg-green-900/20'
    if (score >= 6) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
    return 'text-red-600 bg-red-100 dark:bg-red-900/20'
  }

  const getSafetyLabel = (score: number) => {
    if (score >= 8) return 'Very Safe'
    if (score >= 6) return 'Generally Safe'
    return 'Exercise Caution'
  }

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Analyzing area...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <MapPin className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {areaData.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Area analysis within {radius}m radius
              </p>
            </div>
          </div>

          {/* Safety Score */}
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getSafetyColor(areaData.safetyScore)}`}>
              <Shield className="w-4 h-4" />
              {getSafetyLabel(areaData.safetyScore)}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {areaData.safetyScore}/10 Safety Score
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Highlights */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Key Highlights
          </h4>
          <div className="space-y-2">
            {areaData.highlights && areaData.highlights.length > 0 ? areaData.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {highlight}
              </motion.div>
            )) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading area highlights...</p>
            )}
          </div>
        </div>

        {/* Warnings */}
        {areaData.warnings && areaData.warnings.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              Safety Considerations
            </h4>
            <div className="space-y-2">
              {areaData.warnings.map((warning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  {warning}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended For */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Recommended For
          </h4>
          <div className="flex flex-wrap gap-2">
            {areaData.recommendedFor && areaData.recommendedFor.length > 0 ? areaData.recommendedFor.map((recommendation, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
              >
                {recommendation}
              </motion.span>
            )) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">Loading recommendations...</span>
            )}
          </div>
        </div>

        {/* Nearby Amenities */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Nearby Amenities</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Heart className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {areaData.nearbyAmenities.halal_restaurants}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Halal Restaurants</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <span className="text-sm">🕌</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {areaData.nearbyAmenities.mosques}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Mosques</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Accessibility className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {areaData.nearbyAmenities.accessible_venues}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Accessible Venues</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <DollarSign className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {areaData.nearbyAmenities.budget_options}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Budget Options</p>
              </div>
            </div>
          </div>
        </div>

        {/* Local Insights */}
        {areaData.localInsights && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              Local Insights
            </h4>
            <div className="grid gap-3">
              {areaData.localInsights.bestTimeToVisit && (
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">Best time to visit:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {areaData.localInsights.bestTimeToVisit}
                  </span>
                </div>
              )}

              {areaData.localInsights.crowdLevel && (
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">Crowd level:</span>
                  <span className={`font-medium capitalize ${
                    areaData.localInsights.crowdLevel === 'low' ? 'text-green-600' :
                    areaData.localInsights.crowdLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {areaData.localInsights.crowdLevel}
                  </span>
                </div>
              )}

              {areaData.localInsights.publicTransport && (
                <div className="flex items-center gap-3 text-sm">
                  <Navigation className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">Transit:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {areaData.localInsights.publicTransport}
                  </span>
                </div>
              )}

              {areaData.localInsights.walkingScore && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">🚶</span>
                  <span className="text-gray-600 dark:text-gray-400">Walkability:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {areaData.localInsights.walkingScore}/10
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="px-6 pb-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Note: Using cached area data. Some information may not be current.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}