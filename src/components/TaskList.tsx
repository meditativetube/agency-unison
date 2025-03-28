
import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

type TaskStatus = 'completed' | 'in-progress' | 'pending';

type Task = {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: TaskStatus;
};

const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case 'completed':
      return <Check className="h-4 w-4 text-green-600" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
  }
};

const getStatusStyles = (status: TaskStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-amber-100 text-amber-800';
    case 'pending':
      return 'bg-red-100 text-red-800';
  }
};

const TaskList = () => {
  // Sample data
  const tasks: Task[] = [
    { id: '1', title: 'Finalize client proposal', assignee: 'John Smith', dueDate: '2023-10-15', status: 'in-progress' },
    { id: '2', title: 'Website design review', assignee: 'Emma Davis', dueDate: '2023-10-12', status: 'completed' },
    { id: '3', title: 'Quarterly report preparation', assignee: 'Michael Brown', dueDate: '2023-10-20', status: 'pending' },
    { id: '4', title: 'Client meeting preparation', assignee: 'Sophia Garcia', dueDate: '2023-10-10', status: 'in-progress' },
    { id: '5', title: 'Project timeline update', assignee: 'John Smith', dueDate: '2023-10-18', status: 'pending' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between border-b pb-3">
              <div className="space-y-1">
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500">Assigned to: {task.assignee}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">Due: {task.dueDate}</div>
                <div className={cn("flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium", getStatusStyles(task.status))}>
                  {getStatusIcon(task.status)}
                  <span>{task.status.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
