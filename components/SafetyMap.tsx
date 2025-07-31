'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Circle, InfoWindow } from '@react-google-maps/api'
import { motion } from 'framer-motion'
import { Shield, MapPin, Clock, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { apiClient, SafetyZone, Place } from '@/lib/api'
import { SUPPORTED_CITIES, SAFETY_ZONES } from '@/lib/constants'
import FallbackMap from './FallbackMap'

interface SafetyMapProps {
  city: string
  center?: { lat: number; lng: number }
  zoom?: number
  onLocationSelect?: (location: { lat: number; lng: number }) => void
  showFilters?: boolean
  className?: string
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '16px'
}

const libraries: Array<"places" | "geometry"> = ["places", "geometry"]

export default function SafetyMap({ 
  city, 
  center, 
  zoom = 13, 
  onLocationSelect,
  showFilters = true,
  className = ''
}: SafetyMapProps) {
  const [safetyZones, setSafetyZones] = useState<SafetyZone[]>([])
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedZone, setSelectedZone] = useState<SafetyZone | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    showHalal: true,
    showMosques: true,
    showSafeZones: true,
    safetyLevel: 'all'
  })

  // Check if Google Maps API key is available
  const hasValidApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && 
                         process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== 'demo-key'

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'demo-key',
    libraries,
    // Add fallback options for demo
    googleMapsApiOptions: {
      version: 'weekly'
    }
  })

  const cityData = SUPPORTED_CITIES[city as keyof typeof SUPPORTED_CITIES]
  const mapCenter = center || cityData?.center || { lat: 43.6532, lng: -79.3832 }

  // Load safety zones and places
  useEffect(() => {
    const loadMapData = async () => {
      setLoading(true)
      try {
        const [safetyResponse, placesResponse] = await Promise.all([
          apiClient.getSafetyZones(city, cityData?.bounds),
          apiClient.getPlaces(city, {
            isHalal: filters.showHalal,
            type: filters.showMosques ? 'mosque' : undefined
          })
        ])

        if (safetyResponse.success && safetyResponse.data) {
          setSafetyZones(safetyResponse.data)
        }

        if (placesResponse.success && placesResponse.data) {
          setPlaces(placesResponse.data)
        }
      } catch (error) {
        console.error('Failed to load map data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      loadMapData()
    }
  }, [city, cityData, filters.showHalal, filters.showMosques])

  const getSafetyColor = (level: string) => {
    const colors = SAFETY_ZONES[level as keyof typeof SAFETY_ZONES]
    return colors?.color || '#9CA3AF'
  }

  const getSafetyOpacity = (level: string) => {
    const colors = SAFETY_ZONES[level as keyof typeof SAFETY_ZONES]
    return colors?.opacity || 0.3
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng && onLocationSelect) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      onLocationSelect({ lat, lng })
    }
  }, [onLocationSelect])

  // Use fallback map if Google Maps API is not available or has errors
  if (!hasValidApiKey || loadError) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showFilters && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Demo Mode:</strong> Using interactive fallback map. 
              To enable full Google Maps functionality, configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
            </p>
          </div>
        )}
        
        <FallbackMap
          center={mapCenter}
          zoom={zoom}
          onLocationSelect={onLocationSelect}
          className="w-full"
        />
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-2xl ${className}`} style={{ height: '500px' }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading SafeTrip Map...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-wrap gap-4 items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-600" />
              Map Filters
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.showSafeZones}
                  onChange={(e) => setFilters(prev => ({ ...prev, showSafeZones: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Safety Zones</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.showHalal}
                  onChange={(e) => setFilters(prev => ({ ...prev, showHalal: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Halal Places</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.showMosques}
                  onChange={(e) => setFilters(prev => ({ ...prev, showMosques: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mosques</span>
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
      >
        {loading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Updating safety data...</p>
            </div>
          </div>
        )}

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={zoom}
          onClick={handleMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          }}
        >
          {/* Safety Zones */}
          {filters.showSafeZones && safetyZones.map((zone) => (
            <React.Fragment key={zone.id}>
              <Circle
                center={zone.center}
                radius={zone.radius}
                options={{
                  fillColor: getSafetyColor(zone.safetyLevel),
                  fillOpacity: getSafetyOpacity(zone.safetyLevel),
                  strokeColor: getSafetyColor(zone.safetyLevel),
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  clickable: true
                }}
                onClick={() => setSelectedZone(zone)}
              />
              
              <Marker
                position={zone.center}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: getSafetyColor(zone.safetyLevel),
                  fillOpacity: 1,
                  strokeColor: '#fff',
                  strokeWeight: 2,
                  scale: 8
                }}
                onClick={() => setSelectedZone(zone)}
              />
            </React.Fragment>
          ))}

          {/* Places */}
          {places.map((place) => (
            <Marker
              key={place.id}
              position={place.location}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="12" fill="${place.type === 'mosque' ? '#059669' : '#3B82F6'}" stroke="white" stroke-width="2"/>
                    <text x="16" y="20" text-anchor="middle" fill="white" font-size="14" font-weight="bold">
                      ${place.type === 'mosque' ? '🕌' : '🍽️'}
                    </text>
                  </svg>
                `)}`,
                scaledSize: new google.maps.Size(32, 32)
              }}
              onClick={() => setSelectedPlace(place)}
            />
          ))}

          {/* Zone Info Window */}
          {selectedZone && (
            <InfoWindow
              position={selectedZone.center}
              onCloseClick={() => setSelectedZone(null)}
            >
              <div className="p-3 max-w-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className={`w-5 h-5 ${
                    selectedZone.safetyLevel === 'high' ? 'text-green-600' :
                    selectedZone.safetyLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                  <h3 className="font-semibold text-gray-900">{selectedZone.name}</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{selectedZone.description}</p>
                
                {selectedZone.crimeStats && (
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Crime Trend</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(selectedZone.crimeStats.trend)}
                        <span className="text-sm text-gray-600 capitalize">
                          {selectedZone.crimeStats.trend}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Incidents (30 days)</span>
                      <span className="text-sm font-medium">{selectedZone.crimeStats.lastMonth}</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  Updated {new Date(selectedZone.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </InfoWindow>
          )}

          {/* Place Info Window */}
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.location}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="p-3 max-w-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">
                    {selectedPlace.type === 'mosque' ? '🕌' : '🍽️'}
                  </span>
                  <h3 className="font-semibold text-gray-900">{selectedPlace.name}</h3>
                </div>
                
                {selectedPlace.description && (
                  <p className="text-sm text-gray-600 mb-2">{selectedPlace.description}</p>
                )}
                
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Safety Rating</span>
                    <span className="font-medium text-green-600">{selectedPlace.safetyRating}/10</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Overall Rating</span>
                    <span className="font-medium">{'⭐'.repeat(Math.floor(selectedPlace.ratings.overall))} {selectedPlace.ratings.overall}</span>
                  </div>
                </div>
                
                {selectedPlace.isHalal && (
                  <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium inline-block mb-2">
                    Halal Certified
                  </div>
                )}
                
                {selectedPlace.accessibility.wheelchairAccessible && (
                  <div className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs font-medium inline-block">
                    Wheelchair Accessible
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Safety Zone Legend</h4>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(SAFETY_ZONES).map(([level, config]) => (
            <div key={level} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {level} Safety
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}