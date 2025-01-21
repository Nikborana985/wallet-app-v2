'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const monthlyData = [
  { name: 'Jan', income: 4000, expenses: 3000 },
  { name: 'Feb', income: 3500, expenses: 2800 },
  { name: 'Mar', income: 5000, expenses: 3200 },
  { name: 'Apr', income: 4200, expenses: 3100 },
  { name: 'May', income: 4800, expenses: 3500 },
  { name: 'Jun', income: 5200, expenses: 3800 },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState('monthly')

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Reporting & Analysis</h1>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#8884d8" />
                  <Bar dataKey="expenses" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Download Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>Download Monthly Report (PDF)</Button>
                <Button>Download Yearly Report (Excel)</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

