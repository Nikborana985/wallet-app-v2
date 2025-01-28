'use client'

import { useState, useEffect } from 'react'
import { useAppContext } from '@/context/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'

interface BudgetAccumulator {
  [key: string]: {
    budget: number;
    actual: number;
  };
}

export function DashboardContent() {
  const { accounts, transactions, budgets, currency } = useAppContext()
  const [spendingTrendPeriod, setSpendingTrendPeriod] = useState('Monthly')
  const [spendingTrendData, setSpendingTrendData] = useState([
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 4800 },
    { name: 'Jun', amount: 5200 },
  ])

  useEffect(() => {
    // This is a mock implementation. In a real app, you'd fetch data based on the selected period.
    if (spendingTrendPeriod === 'Daily') {
      setSpendingTrendData([
        { name: 'Mon', amount: 400 },
        { name: 'Tue', amount: 300 },
        { name: 'Wed', amount: 500 },
        { name: 'Thu', amount: 450 },
        { name: 'Fri', amount: 480 },
        { name: 'Sat', amount: 520 },
        { name: 'Sun', amount: 380 },
      ])
    } else if (spendingTrendPeriod === 'Weekly') {
      setSpendingTrendData([
        { name: 'Week 1', amount: 2000 },
        { name: 'Week 2', amount: 2200 },
        { name: 'Week 3', amount: 1800 },
        { name: 'Week 4', amount: 2500 },
      ])
    } else if (spendingTrendPeriod === 'Yearly') {
      setSpendingTrendData([
        { name: '2020', amount: 48000 },
        { name: '2020', amount: 48000 },
        { name: '2021', amount: 52000 },
        { name: '2022', amount: 55000 },
        { name: '2023', amount: 58000 },
      ])
    }
  }, [spendingTrendPeriod])

  const accountGroups = {
    Cash: accounts.filter(a => a.type === 'Cash'),
    Bank: accounts.filter(a => a.type === 'Bank'),
    CreditCards: accounts.filter(a => a.type === 'Credit Card'),
  }

  const totalBalances = {
    Cash: accountGroups.Cash.reduce((sum, account) => sum + account.balance, 0),
    Bank: accountGroups.Bank.reduce((sum, account) => sum + account.balance, 0),
    CreditCards: accountGroups.CreditCards.reduce((sum, account) => sum + account.balance, 0),
  }

  const categoryBudgets = budgets.reduce<BudgetAccumulator>((acc, budget) => {
    if (!acc[budget.category]) {
      acc[budget.category] = { budget: 0, actual: 0 }
    }
    acc[budget.category].budget += budget.budgetAmount
    acc[budget.category].actual += budget.actualAmount
    return acc
  }, {})


  const upcomingBills = [
    { name: 'Credit Card A', dueDate: '2023-07-15', amount: 500 },
    { name: 'Rent', dueDate: '2023-07-01', amount: 1200 },
    { name: 'Utilities', dueDate: '2023-07-10', amount: 150 },
  ]

  const [notifications, setNotifications] = useState([
    { id: 1, date: '2023-06-28', message: 'Credit card bill due in 3 days' },
    { id: 2, date: '2023-06-27', message: 'You\'ve exceeded your dining out budget' },
    { id: 3, date: '2023-06-26', message: 'New investment opportunity: Tech stocks on the rise' },
  ])

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <motion.div 
        className="col-span-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Account Group Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              {Object.entries(accountGroups).map(([groupName, groupAccounts]) => (
                <motion.div 
                  key={groupName}
                  className="flex-1 p-4 bg-secondary rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-bold text-lg mb-2">{groupName}</h3>
                  <p className="text-2xl font-bold">{currency}{totalBalances[groupName as keyof typeof totalBalances].toFixed(2)}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-sm text-blue-500 mt-2">View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{groupName} Accounts</DialogTitle>
                      </DialogHeader>
                      <ul className="mt-2 space-y-1">
                        {groupAccounts.map(account => (
                          <li key={account.id} className="flex justify-between text-sm">
                            <span>{account.name}</span>
                            <span>{currency}{account.balance.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        className="col-span-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Category-wise Budget vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(categoryBudgets).map(([category, data]) => ({
                category,
                budget: data.budget,
                actual: data.actual,
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        className="col-span-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select value={spendingTrendPeriod} onValueChange={setSpendingTrendPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="col-span-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bill Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingBills.map((bill, index) => (
                  <TableRow key={index}>
                    <TableCell>{bill.name}</TableCell>
                    <TableCell>{bill.dueDate}</TableCell>
                    <TableCell>{currency}{bill.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="col-span-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Notification Center</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {notifications.map((notification, index) => (
                <motion.li 
                  key={notification.id} 
                  className="flex justify-between items-center bg-secondary p-2 rounded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div>
                    <span className="font-bold mr-2">{index + 1}.</span>
                    <span className="text-sm text-muted-foreground mr-2">{notification.date}</span>
                    {notification.message}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

