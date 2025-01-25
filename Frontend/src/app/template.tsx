'use client'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Providers } from '@/components/Providers'
import { Suspense } from 'react'

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>{children}</Providers>
      </Suspense>
    </ErrorBoundary>
  )
} 