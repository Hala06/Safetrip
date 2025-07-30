'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page
    router.replace('/login')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-950 dark:to-dark-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to login...</p>
      </div>
    </div>
  )
}
