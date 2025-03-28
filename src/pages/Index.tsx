
import React from 'react';
import DashboardMetrics from '@/components/DashboardMetrics';
import TaskList from '@/components/TaskList';
import TeamMembers from '@/components/TeamMembers';
import MeetingScheduler from '@/components/MeetingScheduler';
import SalaryOverview from '@/components/SalaryOverview';

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back, Admin
        </div>
      </div>
      
      <DashboardMetrics />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TaskList />
        </div>
        <div>
          <TeamMembers />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <MeetingScheduler />
        <SalaryOverview />
      </div>
    </div>
  );
};

export default Index;
