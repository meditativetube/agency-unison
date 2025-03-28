
import React from 'react';
import { ArrowUp, ArrowDown, Users, CheckSquare, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon 
}: { 
  title: string;
  value: string;
  change?: { value: string; positive: boolean };
  icon: React.ElementType;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-100 p-1 text-blue-600">
          <Icon className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs flex items-center gap-1 mt-1">
            {change.positive ? (
              <>
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="h-3 w-3" />
                  {change.value}%
                </span>
                <span className="text-gray-500">from last month</span>
              </>
            ) : (
              <>
                <span className="text-red-600 flex items-center">
                  <ArrowDown className="h-3 w-3" />
                  {change.value}%
                </span>
                <span className="text-gray-500">from last month</span>
              </>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Team Members"
        value="12"
        change={{ value: "10", positive: true }}
        icon={Users}
      />
      <MetricCard
        title="Active Tasks"
        value="24"
        change={{ value: "15", positive: true }}
        icon={CheckSquare}
      />
      <MetricCard
        title="Upcoming Meetings"
        value="8"
        change={{ value: "5", positive: false }}
        icon={Calendar}
      />
      <MetricCard
        title="Budget Utilization"
        value="78%"
        change={{ value: "12", positive: true }}
        icon={DollarSign}
      />
    </div>
  );
};

export default DashboardMetrics;
