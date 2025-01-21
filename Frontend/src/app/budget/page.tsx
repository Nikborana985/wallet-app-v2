'use client'

import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function BudgetPage() {
  const { budgets, setBudgets, currency } = useAppContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBudget, setNewBudget] = useState({
    month: '',
    items: []
  })
  const [selectedMonth, setSelectedMonth] = useState('')

  const handleAddBudget = () => {
    const newBudgetEntry = {
      id: Date.now(),
      month: newBudget.month,
      items: newBudget.items.map(item => ({
        category: item.category,
        subcategory: item.subcategory,
        budgetAmount: item.amount,
        actualAmount: 0 // This should be updated with actual spending data
      }))
    }
    setBudgets([...budgets, newBudgetEntry])
    setShowAddForm(false)
    setNewBudget({
      month: '',
      items: []
    })
  }


  const updateBudgetItem = (index, field, value) => {
    const updatedItems = newBudget.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    )
    setNewBudget({ ...newBudget, items: updatedItems })
  }

  const filteredBudgets = budgets.filter(budget => budget.month === selectedMonth)

  // Sample categories and subcategories data.  Replace with your actual data fetching mechanism.
  const categories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Housing' },
    { id: 3, name: 'Transportation' }
  ];
  const subcategories = [
    { id: 1, category: 'Food', name: 'Groceries' },
    { id: 2, category: 'Food', name: 'Dining Out' },
    { id: 3, category: 'Housing', name: 'Rent' },
    { id: 4, category: 'Housing', name: 'Utilities' },
    { id: 5, category: 'Transportation', name: 'Gas' },
    { id: 6, category: 'Transportation', name: 'Public Transport' }
  ];


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setShowAddForm(true)}>Create Budget</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create Budget</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[80vh]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="month" className="text-right">
                    Month
                  </Label>
                  <Input
                    id="month"
                    type="month"
                    value={newBudget.month}
                    onChange={(e) => setNewBudget({ ...newBudget, month: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.flatMap((category) => 
                      subcategories
                        .filter(sub => sub.category === category.name)
                        .map((subcategory, index) => (
                          <TableRow key={`${category.id}-${subcategory.id}`}>
                            <TableCell>{index === 0 ? category.name : ''}</TableCell>
                            <TableCell>{subcategory.name}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={newBudget.items.find(item => 
                                  item.category === category.name && item.subcategory === subcategory.name
                                )?.amount || 0}
                                onChange={(e) => {
                                  const updatedItems = [...newBudget.items];
                                  const existingItemIndex = updatedItems.findIndex(item => 
                                    item.category === category.name && item.subcategory === subcategory.name
                                  );
                                  if (existingItemIndex !== -1) {
                                    updatedItems[existingItemIndex].amount = Number(e.target.value);
                                  } else {
                                    updatedItems.push({
                                      category: category.name,
                                      subcategory: subcategory.name,
                                      amount: Number(e.target.value)
                                    });
                                  }
                                  setNewBudget({ ...newBudget, items: updatedItems });
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
                {/* <Button onClick={addBudgetItem}>Add Item</Button> */}
              </div>
            </ScrollArea>
            <Button onClick={handleAddBudget}>Create Budget</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        <Select onValueChange={setSelectedMonth}>
          <SelectTrigger>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {[...new Set(budgets.map(budget => budget.month))].map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Actual</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBudgets.flatMap(budget => 
            budget.items.map((item, index) => {
              const percentage = (item.actualAmount / item.budgetAmount) * 100
              const color = percentage > 100 ? 'bg-red-500' : 'bg-green-500'
              return (
                <TableRow key={`${budget.id}-${index}`}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.subcategory}</TableCell>
                  <TableCell>{currency}{item.budgetAmount.toFixed(2)}</TableCell>
                  <TableCell>{currency}{item.actualAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Progress value={percentage} className={`w-full ${color}`} />
                    <span className="text-sm">{percentage.toFixed(2)}%</span>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

