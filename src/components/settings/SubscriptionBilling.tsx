
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Download, CheckCheck, ArrowUpRight } from 'lucide-react';

const SubscriptionBilling = () => {
  const { toast } = useToast();
  
  const currentPlan = {
    name: 'Business Pro',
    price: '$49',
    billing: 'monthly',
    renewalDate: 'June 15, 2023'
  };
  
  const features = [
    'Unlimited tasks and projects',
    'Up to 10 team members',
    'Advanced analytics',
    'Priority support',
    'Custom integrations',
  ];
  
  const invoices = [
    { id: 'INV-001', date: 'May 15, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-002', date: 'April 15, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-003', date: 'March 15, 2023', amount: '$49.00', status: 'Paid' },
  ];

  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: "You'll be redirected to complete the upgrade process.",
    });
  };

  const handleDowngrade = () => {
    toast({
      title: "Plan downgraded",
      description: "Your plan will be changed at the end of the current billing cycle.",
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Subscription & Billing</CardTitle>
        <CardDescription>
          Manage your subscription plan and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Current Plan</h3>
          
          <div className="rounded-md border p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{currentPlan.name}</span>
                  <Badge className="bg-blue-500">Current</Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  {currentPlan.price}/{currentPlan.billing} · Renews on {currentPlan.renewalDate}
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Update Billing</span>
              </Button>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Plan Features:</h4>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCheck className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <Button onClick={handleUpgrade} className="gap-2">
                <ArrowUpRight className="h-4 w-4" />
                <span>Upgrade Plan</span>
              </Button>
              <Button onClick={handleDowngrade} variant="outline">
                Downgrade
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Payment History</h3>
          
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Invoice</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-muted/30">
                      <td className="p-3">{invoice.id}</td>
                      <td className="p-3">{invoice.date}</td>
                      <td className="p-3">{invoice.amount}</td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900/30 dark:text-green-300">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-3 w-3" />
                          <span>PDF</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default SubscriptionBilling;
