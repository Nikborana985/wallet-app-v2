'use client'

import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TransactionsPage() {
  const { transactions, setTransactions, accounts, categories, subcategories, currency } = useAppContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showTransferForm, setShowTransferForm] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    accountId: 0,
    accountName: '',
    category: '',
    subcategory: '',
    amount: 0,
    isRecurring: false,
    frequency: 'Monthly' as 'Daily' | 'Weekly' | 'Monthly' | 'Yearly',
    recurringDate: '',
    remarks: ''
  })
  const [transfer, setTransfer] = useState({
    sourceAccountId: 0,
    sourceAccountName: '',
    destinationAccountId: 0,
    destinationAccountName: '',
    amount: 0,
    remarks: ''
  })
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    account: '',
    accountName: '',
    category: '',
    subcategory: '',
    minAmount: '',
    maxAmount: ''
  })
  const [editTransaction, setEditTransaction] = useState(null)

  const handleAddTransaction = () => {
    setTransactions([...transactions, { id: Date.now(), ...newTransaction }])
    setShowAddForm(false)
    setNewTransaction({
      date: '',
      accountId: 0,
      accountName: '',
      category: '',
      subcategory: '',
      amount: 0,
      isRecurring: false,
      frequency: 'Monthly',
      recurringDate: '',
      remarks: ''
    })
  }

  const handleTransfer = () => {
    const sourceTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      accountId: transfer.sourceAccountId,
      accountName: transfer.sourceAccountName,
      category: 'Transfer',
      subcategory: 'Transfer Out',
      amount: -transfer.amount,
      isRecurring: false,
      remarks: transfer.remarks
    }
    const destinationTransaction = {
      id: Date.now() + 1,
      date: new Date().toISOString().split('T')[0],
      accountId: transfer.destinationAccountId,
      accountName: transfer.destinationAccountName,
      category: 'Transfer',
      subcategory: 'Transfer In',
      amount: transfer.amount,
      isRecurring: false,
      remarks: transfer.remarks
    }
    setTransactions([...transactions, sourceTransaction, destinationTransaction])
    setShowTransferForm(false)
    setTransfer({
      sourceAccountId: 0,
      sourceAccountName: '',
      destinationAccountId: 0,
      destinationAccountName: '',
      amount: 0,
      remarks: ''
    })
  }

  const clearFilters = () => {
    setFilter({
      startDate: '',
      endDate: '',
      account: '',
      accountName: '',
      category: '',
      subcategory: '',
      minAmount: '',
      maxAmount: ''
    })
  }

  const filteredTransactions = transactions.filter(t => {
    return (
      (!filter.startDate || t.date >= filter.startDate) &&
      (!filter.endDate || t.date <= filter.endDate) &&
      (!filter.account || t.accountId.toString() === filter.account) &&
      (!filter.accountName || t.accountName.toLowerCase().includes(filter.accountName.toLowerCase())) &&
      (!filter.category || t.category.toLowerCase().includes(filter.category.toLowerCase())) &&
      (!filter.subcategory || t.subcategory.toLowerCase().includes(filter.subcategory.toLowerCase())) &&
      (!filter.minAmount || t.amount >= Number(filter.minAmount)) &&
      (!filter.maxAmount || t.amount <= Number(filter.maxAmount))
    )
  })

  const exportToExcel = () => {
    // Implementation for exporting to Excel
    console.log('Exporting to Excel:', filteredTransactions)
  }

  const handleEdit = (transaction) => {
    setEditTransaction(transaction)
  }

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const handleSaveEdit = () => {
    setTransactions(transactions.map(t => t.id === editTransaction.id ? editTransaction : t))
    setEditTransaction(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setShowAddForm(true)}>Add Transaction</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="account" className="text-right">
                    Account
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const account = accounts.find(a => a.id === Number(value))
                      setNewTransaction({
                        ...newTransaction,
                        accountId: Number(value),
                        accountName: account ? account.name : ''
                      })
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value, subcategory: '' })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subcategory" className="text-right">
                    Subcategory
                  </Label>
                  <Select
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, subcategory: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {newTransaction.category && subcategories
                        .filter(sub => sub.category === newTransaction.category)
                        .map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.name}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="remarks" className="text-right">
                    Remarks
                  </Label>
                  <Input
                    id="remarks"
                    value={newTransaction.remarks}
                    onChange={(e) => setNewTransaction({ ...newTransaction, remarks: e.target.value })}
                    className="col-span-3"
                    maxLength={255}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recurring" className="text-right">
                    Recurring
                  </Label>
                  <Switch
                    id="recurring"
                    checked={newTransaction.isRecurring}
                    onCheckedChange={(checked) => setNewTransaction({ ...newTransaction, isRecurring: checked })}
                  />
                </div>
                {newTransaction.isRecurring && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="frequency" className="text-right">
                        Frequency
                      </Label>
                      <Select
                        onValueChange={(value) => setNewTransaction({ ...newTransaction, frequency: value as 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recurringDate" className="text-right">
                        Recurring Date
                      </Label>
                      <Input
                        id="recurringDate"
                        type="date"
                        value={newTransaction.recurringDate}
                        onChange={(e) => setNewTransaction({ ...newTransaction, recurringDate: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </>
                )}
              </div>
              <Button onClick={handleAddTransaction}>Add Transaction</Button>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setShowTransferForm(true)}>Add Transfer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Transfer</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sourceAccount" className="text-right">
                    From Account
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const account = accounts.find(a => a.id === Number(value))
                      setTransfer({
                        ...transfer,
                        sourceAccountId: Number(value),
                        sourceAccountName: account ? account.name : ''
                      })
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select source account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="destinationAccount" className="text-right">
                    To Account
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const account = accounts.find(a => a.id === Number(value))
                      setTransfer({
                        ...transfer,
                        destinationAccountId: Number(value),
                        destinationAccountName: account ? account.name : ''
                      })
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transferAmount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="transferAmount"
                    type="number"
                    value={transfer.amount}
                    onChange={(e) => setTransfer({ ...transfer, amount: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transferRemarks" className="text-right">
                    Remarks
                  </Label>
                  <Input
                    id="transferRemarks"
                    value={transfer.remarks}
                    onChange={(e) => setTransfer({ ...transfer, remarks: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleTransfer}>Add Transfer</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account">Account</Label>
            <Select onValueChange={(value) => setFilter({ ...filter, account: value })}>
              <SelectTrigger id="account">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setFilter({ ...filter, category: value })}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select onValueChange={(value) => setFilter({ ...filter, subcategory: value })}>
              <SelectTrigger id="subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {filter.category && subcategories
                  .filter(sub => sub.category === filter.category)
                  .map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.name}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="minAmount">Min Amount</Label>
            <Input
              id="minAmount"
              type="number"
              value={filter.minAmount}
              onChange={(e) => setFilter({ ...filter, minAmount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxAmount">Max Amount</Label>
            <Input
              id="maxAmount"
              type="number"
              value={filter.maxAmount}
              onChange={(e) => setFilter({ ...filter, maxAmount: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.accountName}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.subcategory}</TableCell>
              <TableCell className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                {currency}{Math.abs(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell>{transaction.remarks}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(transaction)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(transaction.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>
      {editTransaction && (
        <Dialog open={!!editTransaction} onOpenChange={() => setEditTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Add form fields similar to the add transaction form, but with editTransaction state */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={editTransaction.date}
                  onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="account" className="text-right">
                  Account
                </Label>
                <Select
                  onValueChange={(value) => {
                    const account = accounts.find(a => a.id === Number(value))
                    setEditTransaction({
                      ...editTransaction,
                      accountId: Number(value),
                      accountName: account ? account.name : ''
                    })
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  onValueChange={(value) => setEditTransaction({ ...editTransaction, category: value, subcategory: '' })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subcategory" className="text-right">
                  Subcategory
                </Label>
                <Select
                  onValueChange={(value) => setEditTransaction({ ...editTransaction, subcategory: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {editTransaction.category && subcategories
                      .filter(sub => sub.category === editTransaction.category)
                      .map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.name}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={editTransaction.amount}
                  onChange={(e) => setEditTransaction({ ...editTransaction, amount: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="remarks" className="text-right">
                  Remarks
                </Label>
                <Input
                  id="remarks"
                  value={editTransaction.remarks}
                  onChange={(e) => setEditTransaction({ ...editTransaction, remarks: e.target.value })}
                  className="col-span-3"
                  maxLength={255}
                />
              </div>
            </div>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

