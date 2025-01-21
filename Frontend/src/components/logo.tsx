import { Wallet } from 'lucide-react'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Wallet className="h-8 w-8 text-emerald-500" />
        <div className="absolute inset-0 bg-white opacity-30 rounded-full blur-sm"></div>
      </div>
      <span className="text-2xl font-bold text-gray-800 dark:text-white">Wallet</span>
    </div>
  )
}

