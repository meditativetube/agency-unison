
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExpenseTable, { Expense } from '@/components/ExpenseTable';
import SalaryOverview from '@/components/SalaryOverview';
import SalaryManagement from '@/components/SalaryManagement';

const Finance = () => {
  // Sample expense data
  const expenses: Expense[] = [
    {
      id: '1',
      description: 'Office supplies',
      category: 'Office Expenses',
      amount: 120.50,
      date: '2023-10-05',
      submittedBy: 'John Smith',
      status: 'approved'
    },
    {
      id: '2',
      description: 'Client lunch',
      category: 'Entertainment',
      amount: 85.75,
      date: '2023-10-08',
      submittedBy: 'Emma Davis',
      status: 'pending'
    },
    {
      id: '3',
      description: 'Software subscription',
      category: 'Software',
      amount: 299.99,
      date: '2023-10-01',
      submittedBy: 'Michael Brown',
      status: 'approved'
    },
    {
      id: '4',
      description: 'Travel expenses',
      category: 'Travel',
      amount: 450.25,
      date: '2023-09-28',
      submittedBy: 'Sophia Garcia',
      status: 'rejected'
    },
    {
      id: '5',
      description: 'Conference tickets',
      category: 'Professional Development',
      amount: 599.00,
      date: '2023-09-25',
      submittedBy: 'John Smith',
      status: 'approved'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Finance</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <SalaryOverview />
        <SalaryManagement />
      </div>
      
      <div className="space-y-6">
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
};

export default Finance;
