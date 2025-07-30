'use client'

import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Clock, Users, Thermometer } from 'lucide-react'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { AnimatedCard } from '@/components/ui/AnimatedComponents'
import { FadeInUp } from '@/components/ui/PageTransitions'

interface CitySelectionProps {
  onCitySelect: (city: string) => void
}

const cities = [
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    description: 'Multicultural metropolis with diverse neighborhoods',
    image: '🇨🇦',
    stats: {
      population: '2.9M',
      timezone: 'EST',
      temp: '22°C'
    },
    highlights: [
      '🕌 90+ Mosques',
      '🥘 1000+ Halal restaurants',
      '🎨 Rich cultural scene',
      '🚇 Excellent transit'
    ],
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Modern megacity blending tradition and innovation',
    image: '🇯🇵',
    stats: {
      population: '13.9M',
      timezone: 'JST',
      temp: '25°C'
    },
    highlights: [
      '🕌 15+ Mosques',
      '🍜 500+ Halal options',
      '🏯 Historic temples',
      '🚄 World-class transit'
    ],
    color: 'from-pink-500 to-red-500'
  }
]

export default function CitySelection({ onCitySelect }: CitySelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FadeInUp>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Destination
              </span>
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              Select a city to start your safe and personalized journey
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                More cities coming soon!
              </span>
            </div>
          </FadeInUp>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {cities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
            >
              <AnimatedCard className="p-8 h-full cursor-pointer group" hover={true}>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{city.image}</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {city.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {city.country}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {city.description}
                  </p>
                </div>

                {/* City Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Users className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {city.stats.population}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Population
                    </div>
                  </div>
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-2 text-green-500" />
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {city.stats.timezone}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Timezone
                    </div>
                  </div>
                  <div className="text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-2 text-orange-500" />
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {city.stats.temp}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Current
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    What's Available:
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {city.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <AnimatedButton
                  onClick={() => onCitySelect(city.id)}
                  className="w-full group-hover:scale-105 transition-transform"
                  size="lg"
                >
                  <span>Explore {city.name}</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </AnimatedButton>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <div className="inline-block p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              More Cities Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              New York • London • Dubai • Istanbul • Kuala Lumpur
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
