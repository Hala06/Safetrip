'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function AnimatedButton({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button'
}: AnimatedButtonProps) {
  const baseClasses = 'relative overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700 focus:ring-primary-500',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-700 hover:to-secondary-800 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        y: disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.95 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Animated background overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ x: '100%', opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: 0.3 }}
        animate={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}
