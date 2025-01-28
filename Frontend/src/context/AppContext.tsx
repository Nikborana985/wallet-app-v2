'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
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
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

function useAppContextInternal() {
  const [isLoading, setIsLoading] = useState(true)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', age: 0, monthlyIncome: 0 })
  const [currency, setCurrency] = useState('USD')
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])

  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedAccounts = localStorage.getItem('accounts')
        if (storedAccounts) setAccounts(JSON.parse(storedAccounts))

        const storedTransactions = localStorage.getItem('transactions')
        if (storedTransactions) setTransactions(JSON.parse(storedTransactions))

        const storedBudgets = localStorage.getItem('budgets')
        if (storedBudgets) setBudgets(JSON.parse(storedBudgets))

        const storedInvestments = localStorage.getItem('investments')
        if (storedInvestments) setInvestments(JSON.parse(storedInvestments))

        const storedUserProfile = localStorage.getItem('userProfile')
        if (storedUserProfile) setUserProfile(JSON.parse(storedUserProfile))

        const storedCurrency = localStorage.getItem('currency')
        if (storedCurrency) setCurrency(storedCurrency)

        const storedCategories = localStorage.getItem('categories')
        if (storedCategories) setCategories(JSON.parse(storedCategories))

        const storedSubcategories = localStorage.getItem('subcategories')
        if (storedSubcategories) setSubcategories(JSON.parse(storedSubcategories))
      } catch (error) {
        console.error('Error loading stored data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStoredData()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('accounts', JSON.stringify(accounts))
      localStorage.setItem('transactions', JSON.stringify(transactions))
      localStorage.setItem('budgets', JSON.stringify(budgets))
      localStorage.setItem('investments', JSON.stringify(investments))
      localStorage.setItem('userProfile', JSON.stringify(userProfile))
      localStorage.setItem('currency', currency)
      localStorage.setItem('categories', JSON.stringify(categories))
      localStorage.setItem('subcategories', JSON.stringify(subcategories))
    }
  }, [accounts, transactions, budgets, investments, userProfile, currency, categories, subcategories, isLoading])

  return {
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
    isLoading,
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const contextValue = useAppContextInternal()

  if (contextValue.isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <AppContext.Provider value={contextValue}>
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