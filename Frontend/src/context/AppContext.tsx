'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Account = {
  id: number
  name: string
  type: string
  balance: number
  billGenerationDate?: string
  dueDate?: string
  reminder?: boolean
}

type Transaction = {
  remarks: ReactNode
  subcategory: any
  id: number
  date: string
  accountId: number
  accountName: string
  category: string
  amount: number
  isRecurring: boolean
  frequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'
  recurringDate?: string
}

type Budget = {
  id: number
  month: string
  category: string
  subcategory: string
  budgetAmount: number
  actualAmount: number
}

type Investment = {
  id: number
  name: string
  type: string
  amount: number
  purchaseDate: string
}

type UserProfile = {
  name: string
  age: number
  monthlyIncome: number
}

type Category = {
  id: number
  name: string
}

type Subcategory = {
  id: number
  name: string
  type: 'Income' | 'Expense'
  category: string
}

type AppContextType = {
  accounts: Account[]
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>
  transactions: Transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
  budgets: Budget[]
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>
  investments: Investment[]
  setInvestments: React.Dispatch<React.SetStateAction<Investment[]>>
  userProfile: UserProfile
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>
  currency: string
  setCurrency: React.Dispatch<React.SetStateAction<string>>
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  subcategories: Subcategory[]
  setSubcategories: React.Dispatch<React.SetStateAction<Subcategory[]>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', age: 0, monthlyIncome: 0 })
  const [currency, setCurrency] = useState('₹')
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])

  // Load data from localStorage on initial render
  useEffect(() => {
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

    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) setCategories(JSON.parse(storedCategories));

    const storedSubcategories = localStorage.getItem('subcategories');
    if (storedSubcategories) setSubcategories(JSON.parse(storedSubcategories));
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts))
  }, [accounts])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets))
  }, [budgets])

  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments))
  }, [investments])

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile))
  }, [userProfile])

  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('subcategories', JSON.stringify(subcategories));
  }, [subcategories]);

  return (
    <AppContext.Provider value={{
      accounts, setAccounts,
      transactions, setTransactions,
      budgets, setBudgets,
      investments, setInvestments,
      userProfile, setUserProfile,
      currency, setCurrency,
      categories, setCategories,
      subcategories, setSubcategories
    }}>
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