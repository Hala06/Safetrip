'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, User, Shield, Bell, MapPin, DollarSign, 
  Moon, Sun, Globe, Save, ArrowLeft, Eye, EyeOff 
} from 'lucide-react'
import Link from 'next/link'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { AnimatedCard } from '@/components/ui/AnimatedComponents'
import { FadeInUp } from '@/components/ui/PageTransitions'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Profile Settings
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+1 (555) 123-4567',
    
    // Privacy Settings
    locationSharing: true,
    dataCollection: false,
    marketingEmails: true,
    
    // Safety Preferences
    safetyLevel: 'high',
    emergencyContact: '+1 (555) 987-6543',
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    safetyAlerts: true,
    
    // Display Settings
    theme: 'auto',
    language: 'en',
    currency: 'CAD',
    
    // Travel Preferences
    defaultCity: 'toronto',
    travelRadius: '25',
    budgetRange: 'moderate'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Simulate saving settings
    alert('Settings saved successfully!')
  }

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Sun },
    { id: 'travel', label: 'Travel', icon: MapPin }
  ]

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Profile Information
      </h3>
      
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => handleSettingChange('name', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleSettingChange('email', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => handleSettingChange('phone', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Change Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Privacy & Data
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Location Sharing</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Allow SafeTrip to access your location for better recommendations
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.locationSharing}
              onChange={(e) => handleSettingChange('locationSharing', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Data Collection</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Allow anonymous usage data to improve our services
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.dataCollection}
              onChange={(e) => handleSettingChange('dataCollection', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Receive promotional emails and travel tips
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.marketingEmails}
              onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderSafetySection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Safety Preferences
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Safety Level
          </label>
          <select
            value={settings.safetyLevel}
            onChange={(e) => handleSettingChange('safetyLevel', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low - I'm adventurous</option>
            <option value="medium">Medium - Balanced approach</option>
            <option value="high">High - Safety first</option>
            <option value="very_high">Very High - Maximum safety</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Emergency Contact
          </label>
          <input
            type="tel"
            value={settings.emergencyContact}
            onChange={(e) => handleSettingChange('emergencyContact', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Emergency contact number"
          />
        </div>
      </div>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Notification Settings
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Receive push notifications on your device
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Receive important updates via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Safety Alerts</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Receive real-time safety alerts and warnings
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.safetyAlerts}
              onChange={(e) => handleSettingChange('safetyAlerts', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderDisplaySection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Display & Language
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="ur">اردو</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Currency
          </label>
          <select
            value={settings.currency}
            onChange={(e) => handleSettingChange('currency', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="USD">USD - US Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderTravelSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Travel Preferences
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default City
          </label>
          <select
            value={settings.defaultCity}
            onChange={(e) => handleSettingChange('defaultCity', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="toronto">Toronto, Canada</option>
            <option value="tokyo">Tokyo, Japan</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Travel Radius (km)
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={settings.travelRadius}
            onChange={(e) => handleSettingChange('travelRadius', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>5km</span>
            <span>{settings.travelRadius}km</span>
            <span>50km</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Budget Range
          </label>
          <select
            value={settings.budgetRange}
            onChange={(e) => handleSettingChange('budgetRange', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="budget">Budget (Under $50/day)</option>
            <option value="moderate">Moderate ($50-150/day)</option>
            <option value="comfortable">Comfortable ($150-300/day)</option>
            <option value="luxury">Luxury ($300+/day)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection()
      case 'privacy': return renderPrivacySection()
      case 'safety': return renderSafetySection()
      case 'notifications': return renderNotificationsSection()
      case 'display': return renderDisplaySection()
      case 'travel': return renderTravelSection()
      default: return renderProfileSection()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <AnimatedButton variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </AnimatedButton>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>
            </div>
          </div>
          
          <AnimatedButton onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </AnimatedButton>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AnimatedCard className="p-6">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    {section.label}
                  </button>
                ))}
              </nav>
            </AnimatedCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatedCard className="p-8">
              {renderContent()}
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  )
}
