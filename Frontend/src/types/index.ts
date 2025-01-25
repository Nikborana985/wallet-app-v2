export interface Account {
  id: number
  name: string
  type: string
  balance: number
  billGenerationDate?: string
  dueDate?: string
  reminder?: boolean
}

export interface Transaction {
  id: number
  date: string
  accountId: number
  accountName: string
  category: string
  subcategory?: string
  amount: number
  remarks?: string
  isRecurring: boolean
  frequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'
  recurringDate?: string
}

export interface Budget {
  id: number
  month: string
  category: string
  subcategory: string
  budgetAmount: number
  actualAmount: number
}

export interface Investment {
  id: number
  name: string
  type: string
  amount: number
  startDate: string
  maturityDate?: string
  interestRate?: number
  returns?: number
}

export interface UserProfile {
  name: string
  age: number
  monthlyIncome: number
  email?: string
  currency?: string
}

export interface Category {
  id: number
  name: string
  type: 'income' | 'expense' | 'investment'
  icon?: string
}

export interface Subcategory {
  id: number
  categoryId: number
  name: string
  icon?: string
} 