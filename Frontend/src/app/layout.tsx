import { Inter } from 'next/font/google'
import { Metadata, Viewport } from 'next'
import { Sidebar } from '@/components/sidebar'
import { AppProvider } from '@/context/AppContext'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wallet - Personal Finance Manager',
  description: 'Manage your personal finances with ease',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
      </body>
    </html>
  )
}

