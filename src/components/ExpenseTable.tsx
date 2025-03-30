
import React from 'react';
import { FileDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { useToast } from '@/hooks/use-toast';

export type Expense = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  submittedBy: string;
  status: 'approved' | 'pending' | 'rejected';
};

interface ExpenseTableProps {
  expenses: Expense[];
  title?: string;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ 
  expenses, 
  title = "Recent Expenses" 
}) => {
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const exportExpenses = () => {
    const headers = ['Description', 'Category', 'Amount', 'Date', 'Submitted By', 'Status'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => 
        [
          `"${expense.description}"`, 
          `"${expense.category}"`, 
          expense.amount, 
          expense.date, 
          `"${expense.submittedBy}"`,
          `"${expense.status}"`
        ].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: "Expenses have been exported to CSV file.",
    });
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
        <Button variant="outline" size="sm" onClick={exportExpenses}>
          <FileDown className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No expenses found
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.submittedBy}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${expense.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      expense.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-amber-100 text-amber-800'}`
                  }>
                    {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
