'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Eye, EyeOff, Check } from 'lucide-react'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (!agreeTerms) {
      toast.error('Please agree to the terms and conditions')
      setIsLoading(false)
      return
    }

    // Simulate signup process
    setTimeout(() => {
      toast.success('Account created successfully! (Demo)')
      router.push('/login')
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-950 dark:to-dark-900 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="w-10 h-10 text-primary-600" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              SafeTrip.AI
            </span>
          </Link>
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join SafeTrip.AI and start traveling safely
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <div className="relative">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="sr-only"
                />
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-colors ${
                    agreeTerms
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300 dark:border-dark-600'
                  }`}
                >
                  {agreeTerms && <Check className="w-3 h-3 text-white" />}
                </motion.div>
              </div>
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                I agree to the{' '}
                <Link href="#" className="text-primary-600 hover:text-primary-500" onClick={(e) => {
                  e.preventDefault()
                  toast.success('Terms and Conditions (Demo)')
                }}>
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-primary-600 hover:text-primary-500" onClick={(e) => {
                  e.preventDefault()
                  toast.success('Privacy Policy (Demo)')
                }}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <AnimatedButton
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </AnimatedButton>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-dark-600">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🎭 This is a demo signup - no real account will be created
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
