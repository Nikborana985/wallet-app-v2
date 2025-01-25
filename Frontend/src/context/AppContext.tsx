'use client'

import React, { createContext, useContext, useState } from 'react'
import { Account, Transaction, Budget, Investment, UserProfile, Category, Subcategory } from '@/types'

interface AppContextType {
  accounts: Account[]
  transactions: Transaction[]
  budgets: Budget[]
  investments: Investment[]
  userProfile: UserProfile
  currency: string
  categories: Category[]
  subcategories: Subcategory[]
  setAccounts: (accounts: Account[]) => void
  setTransactions: (transactions: Transaction[]) => void
  setBudgets: (budgets: Budget[]) => void
  setInvestments: (investments: Investment[]) => void
  setUserProfile: (userProfile: UserProfile) => void
  setCurrency: (currency: string) => void
  setCategories: (categories: Category[]) => void
  setSubcategories: (subcategories: Subcategory[]) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', age: 0, monthlyIncome: 0 })
  const [currency, setCurrency] = useState('USD')
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])

  return (
    <AppContext.Provider
      value={{
        accounts,
        transactions,
        budgets,
        investments,
        userProfile,
        currency,
        categories,
        subcategories,
        setAccounts,
        setTransactions,
        setBudgets,
        setInvestments,
        setUserProfile,
        setCurrency,
        setCategories,
        setSubcategories,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}