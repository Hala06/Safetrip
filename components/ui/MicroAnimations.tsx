'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function InteractiveCard({ children, className = '', glowColor = 'primary' }: InteractiveCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative bg-white/10 dark:bg-dark-800/50 backdrop-blur-xl border border-white/20 dark:border-dark-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300`}
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-${glowColor}-400 to-${glowColor}-600`}
          whileHover={{ opacity: 0.2 }}
        />
        {children}
      </motion.div>
    </motion.div>
  )
}

interface BlobCursorProps {
  children: React.ReactNode
  className?: string
}

export function BlobCursor({ children, className = '' }: BlobCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    x.set(mousePosition.x - 16)
    y.set(mousePosition.y - 16)
  }, [mousePosition, x, y])

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{ x, y }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
      >
        <div className="w-full h-full bg-white rounded-full blur-sm" />
      </motion.div>
    </div>
  )
}

interface PulsingIconProps {
  children: React.ReactNode
  className?: string
  pulseColor?: string
}

export function PulsingIcon({ children, className = '', pulseColor = 'primary' }: PulsingIconProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse ring */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-${pulseColor}-400/30`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Icon container */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
}

export function GradientText({ 
  children, 
  className = '', 
  gradient = 'from-primary-600 via-purple-600 to-pink-600' 
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      style={{ backgroundSize: '200% 200%' }}
    >
      {children}
    </motion.span>
  )
}

interface CounterAnimationProps {
  value: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function CounterAnimation({ 
  value, 
  duration = 2, 
  className = '', 
  suffix = '', 
  prefix = '' 
}: CounterAnimationProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

interface BouncingArrowProps {
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function BouncingArrow({ direction = 'right', className = '' }: BouncingArrowProps) {
  const directionStyles = {
    up: 'rotate-[-90deg]',
    down: 'rotate-90',
    left: 'rotate-180',
    right: 'rotate-0'
  }

  return (
    <motion.div
      className={`inline-block ${directionStyles[direction]} ${className}`}
      animate={{
        x: direction === 'left' ? [-5, 5, -5] : direction === 'right' ? [5, -5, 5] : 0,
        y: direction === 'up' ? [-5, 5, -5] : direction === 'down' ? [5, -5, 5] : 0,
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      →
    </motion.div>
  )
}

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
}

export function ShimmerText({ children, className = '' }: ShimmerTextProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        variants={{
          initial: { x: '-100%' },
          hover: { x: '100%' },
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      {children}
    </motion.div>
  )
}

export function FloatingButton({ children, className = '', ...props }: any) {
  return (
    <motion.button
      className={`${className}`}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      whileTap={{
        scale: 0.95,
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
