'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Users, Globe, Heart } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-dark-900 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                About SafeTrip.AI
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Empowering travelers worldwide with AI-driven safety recommendations and cultural-sensitive travel planning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                To make travel safe, inclusive, and enjoyable for everyone, regardless of their background, beliefs, or accessibility needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "Real-time safety alerts and recommendations based on current conditions."
                },
                {
                  icon: Users,
                  title: "Inclusive Travel",
                  description: "Accommodating diverse needs including religious, dietary, and accessibility requirements."
                },
                {
                  icon: Globe,
                  title: "Global Coverage",
                  description: "Comprehensive data and insights for major cities worldwide."
                },
                {
                  icon: Heart,
                  title: "Community Driven",
                  description: "Built with feedback from travelers who share their experiences."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Travel Safely?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join thousands of travelers who trust SafeTrip.AI for their journeys.
              </p>
              <Link
                href="/demo"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Try Demo
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
