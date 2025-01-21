import Link from 'next/link'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardHeader() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Wallet</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Dashboard</Link></li>
              <li><Link href="/transactions" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Transactions</Link></li>
              <li><Link href="/accounts" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Accounts</Link></li>
              <li><Link href="/budget" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Budget</Link></li>
              <li><Link href="/investments" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Investments</Link></li>
              <li><Link href="/reports" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Reports</Link></li>
              <li><Link href="/settings" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Settings</Link></li>
            </ul>
          </nav>
        </div>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}

