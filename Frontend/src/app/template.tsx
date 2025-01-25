'use client'

import { Sidebar } from '@/components/sidebar'
import { AppProvider } from '@/context/AppContext'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </AppProvider>
    </ErrorBoundary>
  )
} 