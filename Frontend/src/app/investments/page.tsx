'use client'

import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

type Investment = {
  id: number
  name: string
  type: string
  amount: number
  purchaseDate: string
}

export default function InvestmentsPage() {
  const { investments, setInvestments, currency } = useAppContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: '',
    amount: 0,
    purchaseDate: ''
  })

  const handleAddInvestment = () => {
    setInvestments([...investments, { id: Date.now(), ...newInvestment }])
    setShowAddForm(false)
    setNewInvestment({
      name: '',
      type: '',
      amount: 0,
      purchaseDate: ''
    })
  }

  const investmentTypes = ['Stocks', 'Bonds', 'Mutual Funds', 'Real Estate', 'Cryptocurrency']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Investments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setShowAddForm(true)}>Add Investment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Investment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newInvestment.name}
                  onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select onValueChange={(value) => setNewInvestment({ ...newInvestment, type: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
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
                  value={newInvestment.amount}
                  onChange={(e) => setNewInvestment({ ...newInvestment, amount: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purchaseDate" className="text-right">
                  Purchase Date
                </Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={newInvestment.purchaseDate}
                  onChange={(e) => setNewInvestment({ ...newInvestment, purchaseDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddInvestment}>Add Investment</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {investments.map((investment: Investment) => (
            <TableRow key={investment.id}>
              <TableCell>{investment.name}</TableCell>
              <TableCell>{investment.type}</TableCell>
              <TableCell>{currency}{investment.amount.toFixed(2)}</TableCell>
              <TableCell>{investment.purchaseDate}</TableCell>
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

