'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle, Globe, Heart, MapPin, Shield, Star, Users, Sparkles, Zap, Eye, Target } from 'lucide-react'
import Link from 'next/link'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { AnimatedCard, FloatingParticles, MorphingBlob, AnimatedIcon } from '@/components/ui/AnimatedComponents'
import { FadeInUp, StaggerContainer, StaggerItem, SlideIn, Reveal } from '@/components/ui/PageTransitions'

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const stats = [
    { value: '50K+', label: 'Safe Journeys', icon: '🛡️' },
    { value: '200+', label: 'Cities Mapped', icon: '🗺️' },
    { value: '98%', label: 'Safety Rating', icon: '⭐' },
    { value: '24/7', label: 'AI Support', icon: '🤖' }
  ]

  const features = [
    {
      icon: Shield,
      title: 'SafeZone Mapping',
      description: 'Real-time safety visualization with AI-powered risk assessment and community insights',
      gradient: 'from-emerald-500 to-teal-600',
      particles: ['🛡️', '📍', '✅']
    },
    {
      icon: Heart,
      title: 'Cultural Alignment',
      description: 'Discover halal restaurants, prayer spaces, and venues that match your values',
      gradient: 'from-rose-500 to-pink-600',
      particles: ['🕌', '🍽️', '❤️']
    },
    {
      icon: Sparkles,
      title: 'AI Travel Assistant',
      description: 'Get instant, personalized recommendations powered by advanced AI technology',
      gradient: 'from-purple-500 to-indigo-600',
      particles: ['🤖', '💬', '✨']
    },
    {
      icon: Target,
      title: 'Budget-Conscious',
      description: 'Smart budget tracking with cost-effective recommendations and deals',
      gradient: 'from-amber-500 to-orange-600',
      particles: ['💰', '🏷️', '📊']
    },
    {
      icon: Eye,
      title: 'Solo Traveler Safe',
      description: 'Advanced safety features designed specifically for independent explorers',
      gradient: 'from-blue-500 to-cyan-600',
      particles: ['👤', '🔒', '🌟']
    },
    {
      icon: Zap,
      title: 'Accessibility Focus',
      description: 'Comprehensive accessibility features for inclusive travel experiences',
      gradient: 'from-violet-500 to-purple-600',
      particles: ['♿', '🎯', '🌈']
    }
  ]

  const testimonials = [
    {
      name: 'Sarah L.',
      role: 'Budget Traveler',
      content: 'Discovered amazing free activities and budget eats I never would have found otherwise. Complete game changer!',
      avatar: '👩‍💼',
      rating: 5,
      location: 'Toronto, Canada'
    },
    {
      name: 'Ahmed K.',
      role: 'Muslim Traveler',
      content: 'Finally, a travel app that truly understands my cultural needs. Prayer times, halal spots - everything!',
      avatar: '👨‍💻',
      rating: 5,
      location: 'Dubai, UAE'
    },
    {
      name: 'Maria G.',
      role: 'Solo Explorer',
      content: 'Feel incredibly safe exploring new cities. The real-time safety zones are absolutely revolutionary.',
      avatar: '👩‍🎨',
      rating: 5,
      location: 'Barcelona, Spain'
    }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <MorphingBlob 
          className="top-1/4 left-1/4" 
          size={400} 
          color="bg-gradient-to-br from-blue-400/20 to-purple-500/20" 
        />
        <MorphingBlob 
          className="bottom-1/4 right-1/4" 
          size={350} 
          color="bg-gradient-to-br from-emerald-400/20 to-cyan-500/20" 
        />
        <MorphingBlob 
          className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
          size={300} 
          color="bg-gradient-to-br from-rose-400/20 to-pink-500/20" 
        />
        
        {/* Floating Particles */}
        <FloatingParticles 
          particles={['✈️', '🗺️', '🛡️', '🌟', '🎯', '💫', '🚀', '🎨']} 
          count={12}
          className="opacity-60"
        />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="relative z-50 px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Shield className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SafeTravel
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Values-Based Travel
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Link href="/auth">
                <AnimatedButton variant="outline" size="sm">
                  Sign In
                </AnimatedButton>
              </Link>
              <Link href="/auth">
                <AnimatedButton size="sm">
                  Get Started
                </AnimatedButton>
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-20 min-h-screen flex items-center">
          <motion.div style={{ y, opacity }} className="absolute inset-0" />
          
          <div className="max-w-7xl mx-auto text-center w-full">
            {/* Trust Badge */}
            <FadeInUp delay={0}>
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 border border-blue-200/50 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <AnimatedIcon animation="pulse">
                  <Star className="h-5 w-5 fill-current" />
                </AnimatedIcon>
                <span>Trusted by 50,000+ values-based travelers worldwide</span>
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </FadeInUp>

            {/* Main Heading with Advanced Typography */}
            <FadeInUp delay={0.2}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
                <span className="block">Travel with</span>
                <motion.span 
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent relative"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Confidence
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                </motion.span>
              </h1>
            </FadeInUp>

            {/* Enhanced Subheading */}
            <FadeInUp delay={0.4}>
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Your <span className="font-semibold text-blue-600 dark:text-blue-400">AI-powered</span> personalized travel assistant for exploring cities safely and comfortably.
                <br />
                <span className="text-lg md:text-xl text-gray-500 dark:text-gray-400">
                  Designed for Muslim travelers, solo adventurers, accessibility-conscious explorers, and budget-minded wanderers.
                </span>
              </motion.p>
            </FadeInUp>

            {/* Enhanced CTA Buttons */}
            <FadeInUp delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Link href="/auth">
                  <AnimatedButton size="lg" className="text-xl px-12 py-5">
                    <span>Start Exploring</span>
                    <ArrowRight className="h-6 w-6 ml-2" />
                  </AnimatedButton>
                </Link>
                <Link href="/demo">
                  <AnimatedButton variant="outline" size="lg" className="text-xl px-12 py-5">
                    <span>Watch Demo</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-6 w-6 ml-2" />
                    </motion.div>
                  </AnimatedButton>
                </Link>
              </div>
            </FadeInUp>

            {/* Enhanced Stats */}
            <FadeInUp delay={0.8}>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto" staggerDelay={0.1}>
                {stats.map((stat, index) => (
                  <StaggerItem key={stat.label}>
                    <AnimatedCard delay={0} hover={true} className="text-center p-6">
                      <motion.div 
                        className="text-4xl mb-3"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.div 
                        className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-600 dark:text-gray-400 font-semibold">
                        {stat.label}
                      </div>
                    </AnimatedCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeInUp>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-32 relative">
          <div className="max-w-7xl mx-auto">
            <Reveal delay={0}>
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black mb-8">
                  Everything You Need to{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Travel Smart
                  </span>
                </h2>
                <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light">
                  Comprehensive AI-powered tools and insights tailored to your values and travel style
                </p>
              </div>
            </Reveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
              {features.map((feature, index) => (
                <StaggerItem key={feature.title}>
                  <AnimatedCard className="p-8 h-full relative overflow-hidden">
                    {/* Background Gradient Animation */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`}
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 6, repeat: Infinity, delay: index * 0.5 }}
                    />
                    
                    {/* Floating Particles for this card */}
                    <FloatingParticles particles={feature.particles} count={3} />
                    
                    <div className="relative z-10">
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-xl`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, -10, 10, 0],
                          boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <feature.icon className="h-10 w-10 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 py-32 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 relative">
          <div className="max-w-7xl mx-auto">
            <Reveal delay={0}>
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black mb-8">
                  Trusted by{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Travelers Worldwide
                  </span>
                </h2>
                <p className="text-2xl text-gray-600 dark:text-gray-300 font-light">
                  Real stories from our community of values-based explorers
                </p>
              </div>
            </Reveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={testimonial.name}>
                  <AnimatedCard className="p-8 h-full relative">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        className="text-5xl relative"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {testimonial.avatar}
                        <motion.div
                          className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      <div>
                        <div className="font-bold text-xl text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">
                          {testimonial.role}
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed text-lg">
                      "{testimonial.content}"
                    </p>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="px-6 py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(45deg, #3b82f6, #8b5cf6, #10b981)",
                  "linear-gradient(45deg, #8b5cf6, #10b981, #3b82f6)",
                  "linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6)"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
          
          {/* Animated overlay patterns */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal delay={0}>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
                Ready to Explore{' '}
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Safely?
                </motion.span>
              </h2>
            </Reveal>
            
            <FadeInUp delay={0.2}>
              <p className="text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto">
                Join thousands of travelers who explore with confidence using SafeTrip.AI's revolutionary platform
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.4}>
              <Link href="/auth">
                <AnimatedButton 
                  variant="secondary" 
                  size="lg" 
                  className="text-2xl px-16 py-6 bg-white text-blue-600 hover:bg-gray-100"
                >
                  <span>Start Your Safe Journey</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-8 w-8 ml-3" />
                  </motion.div>
                </AnimatedButton>
              </Link>
            </FadeInUp>
          </div>
        </section>
      </div>
    </div>
  )
}
