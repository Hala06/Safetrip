'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { 
  ArrowLeft, MessageCircle, Send, MapPin, Star, Shield, Clock, 
  DollarSign, Navigation, Phone, ChevronDown, Search, Filter,
  Zap, Heart, Globe, Users, Camera, Coffee, Building, TreePine
} from 'lucide-react'
import Link from 'next/link'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { AnimatedCard, FloatingParticles, AnimatedIcon } from '@/components/ui/AnimatedComponents'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/PageTransitions'

const mockPlaces = [
  {
    id: 1,
    name: "Paramount Fine Foods",
    type: "Restaurant",
    rating: 4.8,
    safetyLevel: "high",
    distance: "0.3 km",
    price: "$$",
    tags: ["Halal", "Middle Eastern", "Family-friendly"],
    image: "🍽️",
    description: "Authentic Middle Eastern cuisine in a welcoming atmosphere",
    hours: "10:00 AM - 11:00 PM",
    features: ["Wheelchair accessible", "Parking available", "Takeout"]
  },
  {
    id: 2,
    name: "Islamic Society of Toronto",
    type: "Religious Site",
    rating: 4.9,
    safetyLevel: "high",
    distance: "0.8 km",
    price: "Free",
    tags: ["Mosque", "Prayer room", "Community center"],
    image: "🕌",
    description: "Main mosque with prayer facilities and community services",
    hours: "5:00 AM - 10:00 PM",
    features: ["Prayer rugs provided", "Wudu facilities", "Women's section"]
  },
  {
    id: 3,
    name: "Kensington Market",
    type: "Shopping District",
    rating: 4.6,
    safetyLevel: "medium",
    distance: "1.2 km",
    price: "$-$$",
    tags: ["Shopping", "Vintage", "Food court"],
    image: "🛍️",
    description: "Eclectic neighborhood with unique shops and diverse food options",
    hours: "10:00 AM - 8:00 PM",
    features: ["Pedestrian-friendly", "Multiple food options", "Street art"]
  },
  {
    id: 4,
    name: "Ryerson Prayer Room",
    type: "Prayer Facility",
    rating: 4.7,
    safetyLevel: "high",
    distance: "2.1 km",
    price: "Free",
    tags: ["Prayer room", "University", "Multi-faith"],
    image: "🏫",
    description: "Clean, quiet prayer space within the university campus",
    hours: "6:00 AM - 11:00 PM",
    features: ["Security cameras", "Clean facilities", "Quiet environment"]
  }
]

const mockChatMessages = [
  {
    id: 1,
    type: 'user',
    message: 'Is Kensington Market safe to visit alone in the evening?',
    timestamp: '2:34 PM'
  },
  {
    id: 2,
    type: 'ai',
    message: 'Kensington Market is generally safe during daylight hours and early evening (until 7 PM). The area is well-lit and has good foot traffic. However, I recommend visiting before sunset for solo travelers. Would you like me to suggest some nearby halal restaurants for dinner?',
    timestamp: '2:35 PM'
  },
  {
    id: 3,
    type: 'user',
    message: 'Yes, please recommend some halal options nearby',
    timestamp: '2:36 PM'
  },
  {
    id: 4,
    type: 'ai',
    message: 'Great! Here are 3 excellent halal restaurants within walking distance:\n\n🍽️ **Paramount Fine Foods** (0.3km) - Middle Eastern cuisine, family-friendly\n🥘 **Lahore Tikka House** (0.5km) - Pakistani/Indian, highly rated\n🍕 **Amico\'s Pizza** (0.7km) - Halal pizza and Mediterranean\n\nAll are open until 10 PM and have excellent safety ratings!',
    timestamp: '2:37 PM'
  }
]

const safetyZones = [
  { name: "Downtown Core", level: "high", color: "bg-green-500", percentage: 92 },
  { name: "Kensington Market", level: "medium", color: "bg-yellow-500", percentage: 78 },
  { name: "Entertainment District", level: "medium", color: "bg-yellow-500", percentage: 71 },
  { name: "Church & Wellesley", level: "low", color: "bg-red-500", percentage: 45 }
]

const filterOptions = [
  { label: "Halal Food", icon: "🍽️", active: true },
  { label: "Prayer Facilities", icon: "🕌", active: true },
  { label: "Family-Friendly", icon: "👨‍👩‍👧‍👦", active: false },
  { label: "Wheelchair Accessible", icon: "♿", active: false },
  { label: "Budget-Friendly", icon: "💰", active: true },
  { label: "Women-Safe", icon: "👩", active: true }
]

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('search')
  const [chatInput, setChatInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('halal restaurants near me')
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef)

  const tabs = [
    { id: 'search', label: 'Smart Search', icon: Search, color: 'from-blue-500 to-cyan-500' },
    { id: 'map', label: 'Safety Map', icon: MapPin, color: 'from-emerald-500 to-teal-500' },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
    { id: 'intel', label: 'Safety Intel', icon: Shield, color: 'from-orange-500 to-red-500' }
  ]

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 2000)
      setChatInput('')
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingParticles 
          particles={['🗺️', '🛡️', '🤖', '✨', '🎯', '💫']} 
          count={8}
          className="opacity-30"
        />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <AnimatedButton variant="ghost" size="sm" className="gap-2">
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
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Shield className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SafeTravel
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Interactive Demo
                </div>
              </div>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp delay={0}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-8"
                animate={isHeroInView ? { 
                  background: [
                    "linear-gradient(90deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))",
                    "linear-gradient(90deg, rgba(168,85,247,0.1), rgba(59,130,246,0.1))"
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <AnimatedIcon animation="pulse">
                  <Zap className="h-4 w-4 text-blue-600" />
                </AnimatedIcon>
                <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">
                  Experience SafeTravel in Action
                </span>
              </motion.div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                Your personalized travel assistant for exploring cities{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  safely and comfortably
                </span>
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto font-light">
                Designed for values-based travelers who prioritize safety, culture, and budget
              </p>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {['🕌 Cultural Spots', '🛡️ Safety Zones', '💰 Budget-Friendly', '♿ Accessible'].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200/50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {feature}
                  </motion.div>
                ))}
              </motion.div>
            </FadeInUp>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white shadow-xl'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-2xl`}
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
              >
                {/* Smart Search Tab */}
                {activeTab === 'search' && (
                  <div className="p-8">
                    <div className="grid lg:grid-cols-5 gap-8">
                      {/* Search Interface */}
                      <div className="lg:col-span-2 space-y-6">
                        <FadeInUp>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Smart Search
                          </h3>
                          
                          {/* Search Bar */}
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500"
                              placeholder="Search for places, food, activities..."
                            />
                          </div>

                          {/* Filters */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white">Smart Filters</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {filterOptions.map((filter, index) => (
                                <motion.div
                                  key={filter.label}
                                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                    filter.active
                                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
                                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{filter.icon}</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      {filter.label}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </FadeInUp>
                      </div>

                      {/* Results */}
                      <div className="lg:col-span-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                          Found {mockPlaces.length} places near you
                        </h4>
                        <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                          {mockPlaces.map((place, index) => (
                            <StaggerItem key={place.id}>
                              <AnimatedCard className="p-6 hover:shadow-lg transition-all">
                                <div className="flex items-start gap-4">
                                  <motion.div 
                                    className="text-3xl"
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                  >
                                    {place.image}
                                  </motion.div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="font-bold text-lg text-gray-900 dark:text-white">
                                        {place.name}
                                      </h5>
                                      <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${
                                          place.safetyLevel === 'high' ? 'bg-green-500' :
                                          place.safetyLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`} />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                          {place.distance}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 mb-2">
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{place.rating}</span>
                                      </div>
                                      <span className="text-gray-600 dark:text-gray-400">{place.price}</span>
                                      <span className="text-gray-600 dark:text-gray-400">{place.type}</span>
                                    </div>
                                    
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                      {place.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2">
                                      {place.tags.map((tag) => (
                                        <span
                                          key={tag}
                                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </AnimatedCard>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </div>
                  </div>
                )}

                {/* Safety Map Tab */}
                {activeTab === 'map' && (
                  <div className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          Safety Map Overview
                        </h3>
                        
                        {/* Mock Map Interface */}
                        <div className="relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8 h-80 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                          <motion.div
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <motion.div
                              className="text-6xl mb-4"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              🗺️
                            </motion.div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                              Interactive Toronto Safety Map
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                              Real-time safety zones • AI-powered risk assessment
                            </p>
                          </motion.div>
                          
                          {/* Floating Safety Indicators */}
                          {[
                            { x: '20%', y: '30%', level: 'high' },
                            { x: '70%', y: '20%', level: 'medium' },
                            { x: '50%', y: '70%', level: 'high' },
                            { x: '80%', y: '60%', level: 'low' }
                          ].map((indicator, index) => (
                            <motion.div
                              key={index}
                              className={`absolute w-4 h-4 rounded-full ${
                                indicator.level === 'high' ? 'bg-green-500' :
                                indicator.level === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ left: indicator.x, top: indicator.y }}
                              animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.5
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                          Neighborhood Safety Levels
                        </h4>
                        <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                          {safetyZones.map((zone, index) => (
                            <StaggerItem key={zone.name}>
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {zone.name}
                                  </span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {zone.percentage}% safe
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <motion.div
                                    className={`h-2 rounded-full ${zone.color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${zone.percentage}%` }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                  />
                                </div>
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Chat Tab */}
                {activeTab === 'chat' && (
                  <div className="p-0 h-96">
                    <div className="h-full flex flex-col">
                      {/* Chat Header */}
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <MessageCircle className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              AI Travel Assistant
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Ask me anything about Toronto safety and culture
                            </p>
                          </div>
                          <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full ml-auto"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div ref={chatRef} className="flex-1 p-6 overflow-y-auto space-y-4">
                        <AnimatePresence>
                          {mockChatMessages.map((message, index) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.3 }}
                              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-sm px-4 py-3 rounded-2xl ${
                                message.type === 'user'
                                  ? 'bg-blue-500 text-white rounded-br-none'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
                              }`}>
                                <p className="text-sm whitespace-pre-line">{message.message}</p>
                                <p className={`text-xs mt-1 ${
                                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {message.timestamp}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-none">
                              <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                      duration: 0.6,
                                      repeat: Infinity,
                                      delay: i * 0.2
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Chat Input */}
                      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask about safety, halal food, prayer times..."
                            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500"
                          />
                          <motion.button
                            onClick={handleSendMessage}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Send className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Safety Intel Tab */}
                {activeTab === 'intel' && (
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Safety Intelligence Dashboard
                    </h3>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <StaggerContainer staggerDelay={0.1}>
                        {[
                          {
                            title: "Real-time Alerts",
                            value: "3 Active",
                            icon: "🚨",
                            color: "from-red-500 to-orange-500",
                            description: "Road closures, events, incidents"
                          },
                          {
                            title: "Safety Score",
                            value: "92/100",
                            icon: "🛡️",
                            color: "from-green-500 to-emerald-500",
                            description: "Current area safety rating"
                          },
                          {
                            title: "Crowd Density",
                            value: "Medium",
                            icon: "👥",
                            color: "from-blue-500 to-cyan-500",
                            description: "Based on real-time data"
                          },
                          {
                            title: "Weather Impact",
                            value: "Low Risk",
                            icon: "🌤️",
                            color: "from-yellow-500 to-orange-500",
                            description: "Clear skies, good visibility"
                          },
                          {
                            title: "Transport Status",
                            value: "Normal",
                            icon: "🚇",
                            color: "from-purple-500 to-indigo-500",
                            description: "All lines operational"
                          },
                          {
                            title: "Emergency Services",
                            value: "4 min",
                            icon: "🚑",
                            color: "from-pink-500 to-rose-500",
                            description: "Average response time"
                          }
                        ].map((item, index) => (
                          <StaggerItem key={item.title}>
                            <AnimatedCard className="p-6 text-center">
                              <motion.div
                                className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              >
                                {item.icon}
                              </motion.div>
                              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                {item.title}
                              </h4>
                              <div className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                                {item.value}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                              </p>
                            </AnimatedCard>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Ready to Travel with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Confidence?
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of travelers exploring safely with SafeTravel.AI
              </p>
              <Link href="/auth">
                <AnimatedButton size="lg" className="text-xl px-12 py-5">
                  <span>Get Started Today</span>
                  <ArrowLeft className="h-6 w-6 ml-2 rotate-180" />
                </AnimatedButton>
              </Link>
            </FadeInUp>
          </div>
        </section>
      </div>
    </div>
  )
}
