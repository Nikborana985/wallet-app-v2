'use client'

import { AppProvider } from '@/context/AppContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same structure to prevent layout shift
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
} 