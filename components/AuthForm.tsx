'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, User, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface AuthFormProps {
  mode: 'signin' | 'signup'
  onToggleMode: () => void
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (mode === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match"
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      if (mode === 'signup') {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        })

        if (response.ok) {
          toast.success('Account created successfully! Please sign in.')
          onToggleMode()
          setFormData({ name: '', email: '', password: '', confirmPassword: '' })
          setErrors({})
        } else {
          const error = await response.json()
          toast.error(error.error || 'Something went wrong')
        }
      } else {
        // Simulate login for frontend-only operation
        setTimeout(() => {
          if (formData.email && formData.password) {
            toast.success('Welcome back!')
            router.push('/dashboard')
          } else {
            toast.error('Please fill in all fields')
          }
          setIsLoading(false)
        }, 1000)
        return
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
          >
            <MapPin className="h-6 w-6 text-white" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            {mode === 'signin' ? 'Welcome back to' : 'Join'} SafeTrip.AI
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {mode === 'signin' 
              ? 'Sign in to continue your safe journey' 
              : 'Create your account and explore safely'
            }
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    autoComplete="name"
                    className={cn(
                      "block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      "bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                      errors.name && "border-red-500 focus:ring-red-500"
                    )}
                    placeholder="Full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  autoComplete="email"
                  className={cn(
                    "block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                    errors.email && "border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className={cn(
                    "block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                    errors.password && "border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    autoComplete="new-password"
                    className={cn(
                      "block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      "bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                      errors.confirmPassword && "border-red-500 focus:ring-red-500"
                    )}
                    placeholder="Confirm password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            )}
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                mode === 'signin' ? 'Sign in' : 'Create account'
              )}
            </motion.button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onToggleMode}
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}
