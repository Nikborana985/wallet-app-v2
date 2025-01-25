'use client'

import { AppProvider } from '@/context/AppContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return <AppProvider>{children}</AppProvider>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      {children}
    </ClientProviders>
  )
} 