'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'

interface FloatingParticlesProps {
  particles: string[]
  count?: number
  className?: string
}

export function FloatingParticles({ 
  particles, 
  count = 8, 
  className = "" 
}: FloatingParticlesProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fixed positions that are always the same
  const fixedPositions = [
    { x: 15, y: 20 }, { x: 85, y: 30 }, { x: 25, y: 70 }, { x: 75, y: 80 },
    { x: 45, y: 15 }, { x: 65, y: 60 }, { x: 35, y: 85 }, { x: 80, y: 45 }
  ]

  // Create static positions array - always the same regardless of mount state
  const particleArray = Array.from({ length: count }, (_, i) => {
    const pos = fixedPositions[i % fixedPositions.length]
    return {
      id: i,
      icon: particles[i % particles.length],
      x: pos.x,
      y: pos.y,
      delay: i * 0.5
    }
  })

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particleArray.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ 
            scale: 0,
            rotate: 0,
            opacity: 0
          }}
          animate={mounted ? {
            scale: [0, 1, 0.8, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0.8, 0.6, 0],
            x: [0, 20, -10, 20, 0],
            y: [0, -15, 25, -10, 0]
          } : {}}
          transition={{
            duration: 8 + (particle.id * 0.7) % 4,
            repeat: mounted ? Infinity : 0,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        >
          {particle.icon}
        </motion.div>
      ))}
    </div>
  )
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0,
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
            "linear-gradient(45deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2), rgba(59,130,246,0.2))",
            "linear-gradient(45deg, rgba(236,72,153,0.2), rgba(59,130,246,0.2), rgba(168,85,247,0.2))"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  )
}

interface MorphingBlobProps {
  className?: string
  size?: number
  color?: string
}

export function MorphingBlob({ 
  className = "",
  size = 200,
  color = "bg-gradient-to-br from-blue-400/30 to-purple-500/30"
}: MorphingBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${color} ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.3, 0.8, 1.1, 1],
        rotate: [0, 90, 180, 270, 360],
        borderRadius: [
          "50%", 
          "40% 60% 70% 30%", 
          "60% 40% 30% 70%", 
          "30% 70% 60% 40%",
          "50%"
        ],
        x: [0, 50, -30, 20, 0],
        y: [0, -20, 40, -10, 0]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

interface AnimatedIconProps {
  children: ReactNode
  className?: string
  animation?: 'float' | 'rotate' | 'pulse' | 'bounce'
  hover?: boolean
}

export function AnimatedIcon({ 
  children, 
  className = "",
  animation = 'float',
  hover = true 
}: AnimatedIconProps) {
  const animations = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    rotate: {
      rotate: 360,
      transition: { duration: 4, repeat: Infinity, ease: "linear" }
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    bounce: {
      y: [0, -20, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={animations[animation]}
      whileHover={hover ? { 
        scale: 1.2, 
        rotate: 15,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={hover ? { scale: 0.9 } : undefined}
    >
      {children}
    </motion.div>
  )
}
