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
import { ScrollArea } from '@/components/ui/scroll-area'

export default function MastersPage() {
  const { accounts, setAccounts, categories, setCategories, subcategories, setSubcategories, currency } = useAppContext()
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: '',
    balance: 0,
    billGenerationDate: '',
    dueDate: '',
    reminder: false
  })
  const [newCategory, setNewCategory] = useState({ name: '' })
  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    type: '',
    category: ''
  })
  const [editItem, setEditItem] = useState(null)

  const handleAddAccount = () => {
    setAccounts([...accounts, { id: Date.now(), ...newAccount }])
    setNewAccount({
      name: '',
      type: '',
      balance: 0,
      billGenerationDate: '',
      dueDate: '',
      reminder: false
    })
  }

  const handleAddCategory = () => {
    setCategories([...categories, { id: Date.now(), ...newCategory }])
    setNewCategory({ name: '' })
  }

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, { id: Date.now(), ...newSubcategory }])
    setNewSubcategory({
      name: '',
      type: '',
      category: ''
    })
  }

  const handleEdit = (item, type) => {
    // Create a complete copy of the item with all required fields
    const editItemData = {
      ...item,
      type,
      name: item.name || '',
      type: item.type || '',
      category: item.category || '',
      balance: item.balance || 0,
      billGenerationDate: item.billGenerationDate || '',
      dueDate: item.dueDate || '',
      reminder: item.reminder || false
    }
    setEditItem(editItemData)
  }

  const handleSaveEdit = () => {
    if (editItem.type === 'account') {
      setAccounts(accounts.map(account => account.id === editItem.id ? editItem : account))
    } else if (editItem.type === 'category') {
      setCategories(categories.map(category => category.id === editItem.id ? editItem : category))
    } else if (editItem.type === 'subcategory') {
      setSubcategories(subcategories.map(subcategory => subcategory.id === editItem.id ? editItem : subcategory))
    }
    setEditItem(null)
  }

  const handleDelete = (id, type) => {
    if (type === 'account') {
      setAccounts(accounts.filter(account => account.id !== id))
    } else if (type === 'category') {
      setCategories(categories.filter(category => category.id !== id))
    } else if (type === 'subcategory') {
      setSubcategories(subcategories.filter(subcategory => subcategory.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Masters</h1>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Accounts</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Account</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh]">
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
                          <Select
                            onValueChange={(value) => setNewAccount({ ...newAccount, billGenerationDate: value })}
                            value={newAccount.billGenerationDate}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(31)].map((_, i) => (
                                <SelectItem key={i} value={`${i + 1}`}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="dueDate" className="text-right">
                            Due Date
                          </Label>
                          <Select
                            onValueChange={(value) => setNewAccount({ ...newAccount, dueDate: value })}
                            value={newAccount.dueDate}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(31)].map((_, i) => (
                                <SelectItem key={i} value={`${i + 1}`}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                </ScrollArea>
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
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(account, 'account')}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(account.id, 'account')}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Categories</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Category</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh]">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="categoryName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="categoryName"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </ScrollArea>
                <Button onClick={handleAddCategory}>Add Category</Button>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(category, 'category')}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id, 'category')}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Subcategories</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Subcategory</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Subcategory</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh]">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subcategoryName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="subcategoryName"
                        value={newSubcategory.name}
                        onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subcategoryType" className="text-right">
                        Type
                      </Label>
                      <Select onValueChange={(value) => setNewSubcategory({ ...newSubcategory, type: value })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Income">Income</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subcategoryCategory" className="text-right">
                        Category
                      </Label>
                      <Select onValueChange={(value) => setNewSubcategory({ ...newSubcategory, category: value })}>
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
                  </div>
                </ScrollArea>
                <Button onClick={handleAddSubcategory}>Add Subcategory</Button>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subcategories.map((subcategory) => (
                <TableRow key={subcategory.id}>
                  <TableCell>{subcategory.name}</TableCell>
                  <TableCell>{subcategory.type}</TableCell>
                  <TableCell>{subcategory.category}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(subcategory, 'subcategory')}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(subcategory.id, 'subcategory')}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {editItem && (
        <Dialog key={editItem?.id} open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editItem.type}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[80vh]">
              <div className="grid gap-4 py-4">
                {editItem.type === 'account' && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="editName"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editType" className="text-right">
                        Type
                      </Label>
                      <Select
                        defaultValue={editItem.type}
                        onValueChange={(value) => setEditItem({ ...editItem, type: value })}
                      >
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
                      <Label htmlFor="editBalance" className="text-right">
                        Balance
                      </Label>
                      <Input
                        id="editBalance"
                        type="number"
                        value={editItem.balance}
                        onChange={(e) => setEditItem({ ...editItem, balance: Number(e.target.value) })}
                        className="col-span-3"
                      />
                    </div>
                    {editItem.type === 'Credit Card' && (
                      <>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editBillGenerationDate" className="text-right">
                            Bill Generation Date
                          </Label>
                          <Select
                            value={editItem.billGenerationDate}
                            onValueChange={(value) => setEditItem({ ...editItem, billGenerationDate: value })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(31)].map((_, i) => (
                                <SelectItem key={i} value={`${i + 1}`}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editDueDate" className="text-right">
                            Due Date
                          </Label>
                          <Select
                            value={editItem.dueDate}
                            onValueChange={(value) => setEditItem({ ...editItem, dueDate: value })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(31)].map((_, i) => (
                                <SelectItem key={i} value={`${i + 1}`}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editReminder" className="text-right">
                            Reminder
                          </Label>
                          <Switch
                            id="editReminder"
                            checked={editItem.reminder}
                            onCheckedChange={(checked) => setEditItem({ ...editItem, reminder: checked })}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
                {editItem.type === 'category' && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="editCategoryName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="editCategoryName"
                      value={editItem.name}
                      onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                )}
                {editItem.type === 'subcategory' && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editSubcategoryName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="editSubcategoryName"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editSubcategoryType" className="text-right">
                        Type
                      </Label>
                      <Select
                        defaultValue={editItem.type}
                        onValueChange={(value) => setEditItem({ ...editItem, type: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type">{editItem.type}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Income">Income</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editSubcategoryCategory" className="text-right">
                        Category
                      </Label>
                      <Select
                        defaultValue={editItem.category}
                        onValueChange={(value) => setEditItem({ ...editItem, category: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category">{editItem.category}</SelectValue>
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
                  </>
                )}
              </div>
            </ScrollArea>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

