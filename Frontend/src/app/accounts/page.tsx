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

export default function AccountsPage() {
  const { accounts, setAccounts, currency } = useAppContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: '',
    balance: 0,
    billGenerationDate: '',
    dueDate: '',
    reminder: false
  })

  const handleAddAccount = () => {
    setAccounts([...accounts, { id: Date.now(), ...newAccount }])
    setShowAddForm(false)
    setNewAccount({
      name: '',
      type: '',
      balance: 0,
      billGenerationDate: '',
      dueDate: '',
      reminder: false
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setShowAddForm(true)}>Add Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Account</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select onValueChange={(value) => setNewAccount({ ...newAccount, type: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank">Bank</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  Balance
                </Label>
                <Input
                  id="balance"
                  type="number"
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({ ...newAccount, balance: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              {newAccount.type === 'Credit Card' && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="billGenerationDate" className="text-right">
                      Bill Generation Date
                    </Label>
                    <Input
                      id="billGenerationDate"
                      type="date"
                      value={newAccount.billGenerationDate}
                      onChange={(e) => setNewAccount({ ...newAccount, billGenerationDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newAccount.dueDate}
                      onChange={(e) => setNewAccount({ ...newAccount, dueDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reminder" className="text-right">
                      Reminder
                    </Label>
                    <Switch
                      id="reminder"
                      checked={newAccount.reminder}
                      onCheckedChange={(checked) => setNewAccount({ ...newAccount, reminder: checked })}
                    />
                  </div>
                </>
              )}
            </div>
            <Button onClick={handleAddAccount}>Add Account</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell>{currency}{account.balance.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

