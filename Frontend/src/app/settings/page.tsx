'use client'

import { useAppContext } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  const { userProfile, setUserProfile, currency, setCurrency } = useAppContext()

  const handleProfileChange = (field: string, value: string | number) => {
    setUserProfile({ ...userProfile, [field]: value })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userName" className="text-right">
              Name
            </Label>
            <Input
              id="userName"
              value={userProfile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userAge" className="text-right">
              Age
            </Label>
            <Input
              id="userAge"
              type="number"
              value={userProfile.age}
              onChange={(e) => handleProfileChange('age', Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userIncome" className="text-right">
              Monthly Income
            </Label>
            <Input
              id="userIncome"
              type="number"
              value={userProfile.monthlyIncome}
              onChange={(e) => handleProfileChange('monthlyIncome', Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch id="darkMode" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              Currency
            </Label>
            <Input
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="col-span-3"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button>Export Data (CSV)</Button>
          <Button>Import Data</Button>
          <Button variant="destructive">Reset All Data</Button>
        </CardContent>
      </Card>
    </div>
  )
}

