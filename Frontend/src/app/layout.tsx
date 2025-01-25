import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wallet - Personal Finance Manager',
  description: 'Manage your personal finances with ease',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  headers() // This is needed to opt into dynamic rendering

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

