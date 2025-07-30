'use client'

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// Enhanced Scroll Progress Indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX }}
    />
  )
}

// Magnetic Button Effect
interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.25
    const deltaY = (e.clientY - centerY) * 0.25
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

// Parallax Container
interface ParallaxContainerProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export function ParallaxContainer({ children, offset = 50, className = '' }: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// Text Reveal Animation
interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const words = children.split(' ')

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Morphing Card
interface MorphingCardProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
}

export function MorphingCard({ children, className = '', hoverScale = 1.03 }: MorphingCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{ 
        scale: hoverScale,
        rotateY: 5,
        rotateX: 5,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  )
}

// Floating Elements
interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  amplitude?: number
  className?: string
}

export function FloatingElement({ children, delay = 0, amplitude = 20, className = '' }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

// Cursor Follower
export function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    
    window.addEventListener('mousemove', updateMousePosition)
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <div className="w-5 h-5 bg-white rounded-full opacity-50" />
    </motion.div>
  )
}

// Loading Animation
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-gray-200 dark:border-gray-700 border-t-${color}-500 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// Staggered List Animation
interface StaggeredListProps {
  children: React.ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredList({ children, staggerDelay = 0.1, className = '' }: StaggeredListProps) {
  return (
    <motion.div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Typewriter Effect
interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export function Typewriter({ text, delay = 0, speed = 50, className = '' }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, delay + speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay, speed])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-5 bg-primary-500 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  )
}
