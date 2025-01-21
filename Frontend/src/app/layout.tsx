import '../../styles/globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/sidebar'
import { AppProvider } from '@/context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wallet - Personal Finance Manager',
  description: 'Manage your personal finances with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22 viewBox=%220 0 4 4%22%3E%3Cpath fill=%22%239C92AC%22 fill-opacity=%220.1%22 d=%22M1 3h1v1H1V3zm2-2h1v1H3V1z%22%3E%3C/path%3E%3C/svg%3E')]">
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

