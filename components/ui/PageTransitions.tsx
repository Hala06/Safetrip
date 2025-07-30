'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

interface FadeInUpProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeInUp({ children, delay = 0, className = "" }: FadeInUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className = "",
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6 }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

interface SlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  className?: string
  delay?: number
}

export function SlideIn({ 
  children, 
  direction = 'right', 
  className = "",
  delay = 0 
}: SlideInProps) {
  const directions = {
    left: { x: -100 },
    right: { x: 100 },
    up: { y: -100 },
    down: { y: 100 }
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
    >
      {children}
    </motion.div>
  )
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: delay + 0.2,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
