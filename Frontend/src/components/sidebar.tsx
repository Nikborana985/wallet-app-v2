'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CreditCard, Database, BarChart, Settings, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Logo } from './logo'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Transactions', href: '/transactions', icon: CreditCard },
  { name: 'Masters', href: '/masters', icon: Database },
  { name: 'Budget', href: '/budget', icon: BarChart },
  { name: 'Investments', href: '/investments', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <aside className={cn(
      "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out",
      isExpanded ? "w-64" : "w-20"
    )}>
      <div className="flex justify-between items-center p-6">
        {isExpanded && (
          <Logo />
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
        >
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <nav className="mt-8 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200",
                isActive
                  ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400")} />
              {isExpanded && <span className="ml-3 font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

