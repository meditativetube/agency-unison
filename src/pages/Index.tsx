
import React from 'react';
import DashboardMetrics from '@/components/DashboardMetrics';
import TaskList, { Task } from '@/components/TaskList';
import TeamMembers from '@/components/TeamMembers';
import MeetingScheduler from '@/components/MeetingScheduler';
import SalaryOverview from '@/components/SalaryOverview';
import { useUser } from '@/components/UserProvider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const { currentUser, isAdmin } = useUser();

  // Sample tasks for the TaskList component
  const dashboardTasks: Task[] = [
    { id: '1', title: 'Review project proposal', assignee: 'John Smith', dueDate: '2023-10-15', status: 'in-progress' },
    { id: '2', title: 'Team standup meeting', assignee: 'Emma Davis', dueDate: '2023-10-12', status: 'completed' },
    { id: '3', title: 'Client presentation', assignee: 'Michael Brown', dueDate: '2023-10-20', status: 'pending' },
  ];

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {currentUser?.name} ({currentUser?.role})
        </div>
      </div>
      
      {!isAdmin && (
        <Alert variant="default" className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
          <AlertTitle>Limited Access</AlertTitle>
          <AlertDescription>
            You have limited access to the system. Some features are only available to admins and cofounders.
          </AlertDescription>
        </Alert>
      )}
      
      <DashboardMetrics />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TaskList tasks={dashboardTasks} />
        </div>
        <div>
          <TeamMembers />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {isAdmin ? (
          <>
            <MeetingScheduler />
            <SalaryOverview />
          </>
        ) : (
          <MeetingScheduler />
        )}
      </div>
      
      {isAdmin && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Admin Controls</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            As an admin or cofounder, you have full access to all system controls and financial information.
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
