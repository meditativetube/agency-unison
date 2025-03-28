
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, TrendingDown, Plus, Filter, Download } from 'lucide-react';

const BudgetCard = ({ 
  title, 
  allocated, 
  spent, 
  department 
}: { 
  title: string; 
  allocated: number; 
  spent: number; 
  department: string; 
}) => {
  const percentage = Math.round((spent / allocated) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{department}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{formatCurrency(spent)}</div>
          <div className="text-sm text-gray-500">of {formatCurrency(allocated)}</div>
        </div>
        <div className="mt-2">
          <Progress value={percentage} />
          <div className="mt-1 text-xs text-gray-500">{percentage}% used</div>
        </div>
      </CardContent>
    </Card>
  );
};

const SalaryCard = ({ 
  name, 
  role, 
  salary, 
  department, 
  trend 
}: { 
  name: string; 
  role: string; 
  salary: number; 
  department: string; 
  trend: 'up' | 'down' | 'neutral';
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-gray-500">{role}</div>
      </div>
      <div className="text-center">
        <div className="text-xs text-gray-500">Department</div>
        <div className="text-sm">{department}</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="text-right">
          <div className="font-medium">{formatCurrency(salary)}</div>
          <div className="text-xs text-gray-500">Annual</div>
        </div>
        {getTrendIcon()}
      </div>
    </div>
  );
};

const Finance = () => {
  // Sample budget data
  const budgets = [
    { title: "Q4 Project Budget", allocated: 50000, spent: 32000, department: "All Departments" },
    { title: "Marketing Campaign", allocated: 15000, spent: 12000, department: "Marketing" },
    { title: "Software Licenses", allocated: 10000, spent: 8000, department: "IT" },
    { title: "Office Equipment", allocated: 5000, spent: 1000, department: "Facilities" },
  ];

  // Sample salary data
  const salaries = [
    { name: "John Smith", role: "Project Manager", salary: 85000, department: "Management", trend: 'up' as const },
    { name: "Emma Davis", role: "UI/UX Designer", salary: 72000, department: "Design", trend: 'neutral' as const },
    { name: "Michael Brown", role: "Frontend Developer", salary: 78000, department: "Engineering", trend: 'up' as const },
    { name: "Sophia Garcia", role: "Marketing Specialist", salary: 65000, department: "Marketing", trend: 'up' as const },
    { name: "David Wilson", role: "Backend Developer", salary: 80000, department: "Engineering", trend: 'neutral' as const },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Finance Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-gray-700" />
              <span className="text-2xl font-bold">$120,000</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Annual budget allocation</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-gray-700" />
              <span className="text-2xl font-bold">$78,500</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Total spent year-to-date</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Salaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-gray-700" />
              <span className="text-2xl font-bold">$42,500</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Monthly payroll expense</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-gray-700" />
              <span className="text-2xl font-bold">$250,000</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Year-to-date client revenue</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="budgets">
        <TabsList>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="salaries">Salaries</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="budgets" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {budgets.map((budget, index) => (
              <BudgetCard key={index} {...budget} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="salaries" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Salaries</CardTitle>
                <CardDescription>Manage your team's compensation</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salaries.map((salary, index) => (
                  <SalaryCard key={index} {...salary} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Expense reports and details will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
