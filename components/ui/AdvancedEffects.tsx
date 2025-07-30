'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

// Sparkle effect for backgrounds
export function SparkleField() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; scale: number; delay: number }>>([])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 2,
      }))
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, sparkle.scale, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full blur-[1px]" />
        </motion.div>
      ))}
    </div>
  )
}

// Enhanced button with ripple effect
interface RippleButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function RippleButton({ children, onClick, className = '', variant = 'primary' }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = { x, y, id: Date.now() }
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
    
    if (onClick) {
      onClick(e)
    }
  }

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 text-white',
    ghost: 'bg-transparent border-2 border-primary-500 text-primary-600 dark:text-primary-400'
  }

  return (
    <motion.button
      className={`relative overflow-hidden rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${variants[variant]} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, x: '-50%', y: '-50%' }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.button>
  )
}

// Smooth mouse following spotlight
export function MouseSpotlight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed pointer-events-none z-0 opacity-30"
      style={{
        left: spotlightX,
        top: spotlightY,
        x: '-50%',
        y: '-50%',
      }}
    >
      <div className="w-96 h-96 bg-gradient-radial from-primary-400/20 via-purple-400/10 to-transparent rounded-full blur-3xl" />
    </motion.div>
  )
}

// Floating action button with pulse
interface FloatingActionButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function FloatingActionButton({ children, onClick, className = '' }: FloatingActionButtonProps) {
  return (
    <motion.button
      className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white z-50 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: [
          '0 4px 20px rgba(59, 130, 246, 0.3)',
          '0 8px 30px rgba(147, 51, 234, 0.4)',
          '0 4px 20px rgba(59, 130, 246, 0.3)',
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.button>
  )
}

// Text typing animation
interface TypedTextProps {
  texts: string[]
  className?: string
  speed?: number
}

export function TypedText({ texts, className = '', speed = 100 }: TypedTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex]
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, speed])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  )
}

// Gradient border animation
interface AnimatedBorderProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedBorder({ children, className = '' }: AnimatedBorderProps) {
  return (
    <motion.div
      className={`relative p-[2px] rounded-2xl bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      <div className="rounded-2xl bg-white dark:bg-dark-900 p-6">
        {children}
      </div>
    </motion.div>
  )
}

// Loading skeleton
interface SkeletonProps {
  className?: string
  lines?: number
}

export function Skeleton({ className = '', lines = 1 }: SkeletonProps) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 dark:bg-dark-700 rounded mb-2 last:mb-0"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}
