'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  MapPin, 
  Shield, 
  Clock,
  Sparkles,
  User,
  Bot
} from 'lucide-react'
import { apiClient, ChatMessage } from '@/lib/api'

interface AIChatBotProps {
  city?: string
  userLocation?: { lat: number; lng: number }
  className?: string
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  context?: {
    city?: string
    safetyLevel?: string
    timeOfDay?: string
  }
}

export default function AIChatBot({ city, userLocation, className = '' }: AIChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: `Hi! I'm your SafeTrip AI assistant 🤖 I can help you with:

• Finding safe areas and routes
• Locating halal restaurants and mosques
• Getting real-time safety updates
• Travel advice for ${city || 'your destination'}
• Emergency information and contacts

What would you like to know?`,
        isUser: false,
        timestamp: new Date(),
        context: {
          city: city || 'unknown',
          safetyLevel: 'high',
          timeOfDay: new Date().getHours() < 18 ? 'day' : 'night'
        }
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length, city])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const context = {
        location: userLocation,
        city: city || 'Toronto',
        userPreferences: {
          // These would come from user settings in a real app
          religiousNeeds: ['halal'],
          safetyPriority: 'high' as const
        }
      }

      const response = await apiClient.getChatResponse(inputMessage.trim(), context)
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        setIsTyping(false)
        
        if (response.success && response.data) {
          const aiMessage: Message = {
            id: response.data.id || Date.now().toString(),
            text: response.data.response,
            isUser: false,
            timestamp: new Date(),
            context: response.data.context
          }
          setMessages(prev => [...prev, aiMessage])
        } else {
          // Fallback response
          const fallbackMessage: Message = {
            id: Date.now().toString(),
            text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or contact our support team if the issue persists.",
            isUser: false,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, fallbackMessage])
        }
      }, 1000 + Math.random() * 1000) // Random delay 1-2 seconds
      
    } catch (error) {
      console.error('Chat error:', error)
      setIsTyping(false)
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I apologize, but I'm experiencing technical difficulties. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getContextualSuggestions = () => {
    const timeOfDay = new Date().getHours()
    const suggestions = [
      "What are the safest areas to visit right now?",
      "Find halal restaurants near me",
      "Where are the nearest mosques?",
      "Is this area safe for solo travelers?",
    ]

    if (timeOfDay >= 18) {
      suggestions.push("What areas should I avoid at night?")
    } else {
      suggestions.push("What are good family-friendly spots?")
    }

    return suggestions
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        height: isMinimized ? 60 : 500,
        width: isMinimized ? 300 : 400
      }}
      exit={{ opacity: 0, scale: 0.8, y: 100 }}
      className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold">SafeTrip AI</h3>
            <p className="text-xs opacity-90">Your travel safety assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  message.isUser 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`flex-1 max-w-[280px] ${message.isUser ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-2xl text-sm leading-relaxed ${
                    message.isUser
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  </div>
                  <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                    message.isUser ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {message.context && (
                      <span className="ml-2">
                        {message.context.city && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {message.context.city}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md p-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {getContextualSuggestions().slice(0, 3).map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about safety, halal food, or travel tips..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  )
}