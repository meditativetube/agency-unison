
import React from 'react';
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

type SalaryData = {
  department: string;
  allocated: number;
  spent: number;
};

const SalaryOverview = () => {
  // Sample data
  const salaryData: SalaryData[] = [
    { department: 'Management', allocated: 30000, spent: 25000 },
    { department: 'Design', allocated: 25000, spent: 20000 },
    { department: 'Engineering', allocated: 45000, spent: 40000 },
    { department: 'Marketing', allocated: 20000, spent: 10000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculatePercentage = (spent: number, allocated: number) => {
    return Math.round((spent / allocated) * 100);
  };

  const totalAllocated = salaryData.reduce((acc, item) => acc + item.allocated, 0);
  const totalSpent = salaryData.reduce((acc, item) => acc + item.spent, 0);
  const totalPercentage = calculatePercentage(totalSpent, totalAllocated);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Salary & Budget</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-100 p-1 text-blue-600">
          <DollarSign className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Total Budget</div>
              <div className="text-right">
                <div className="text-lg font-bold">{formatCurrency(totalSpent)}</div>
                <div className="text-xs text-gray-500">of {formatCurrency(totalAllocated)}</div>
              </div>
            </div>
            <Progress className="mt-2" value={totalPercentage} />
          </div>

          <div className="space-y-2">
            {salaryData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{item.department}</div>
                  <div className="text-right">
                    <div className="text-sm">{formatCurrency(item.spent)}</div>
                    <div className="text-xs text-gray-500">of {formatCurrency(item.allocated)}</div>
                  </div>
                </div>
                <Progress 
                  className="mt-1" 
                  value={calculatePercentage(item.spent, item.allocated)} 
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryOverview;
