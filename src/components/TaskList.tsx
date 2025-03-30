
import React, { useState } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { useToast } from '@/hooks/use-toast';

export type TaskStatus = 'completed' | 'in-progress' | 'pending';

export type Task = {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: TaskStatus;
};

export const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case 'completed':
      return <Check className="h-4 w-4 text-green-600" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
  }
};

export const getStatusStyles = (status: TaskStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-amber-100 text-amber-800';
    case 'pending':
      return 'bg-red-100 text-red-800';
  }
};

interface TaskListProps {
  tasks: Task[];
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange }) => {
  const { toast } = useToast();
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    if (onStatusChange) {
      onStatusChange(taskId, newStatus);
      setOpenPopoverId(null);
      toast({
        title: "Status updated",
        description: `Task status has been updated to ${newStatus.replace('-', ' ')}.`,
      });
    }
  };

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
                <Popover 
                  open={openPopoverId === task.id} 
                  onOpenChange={(open) => setOpenPopoverId(open ? task.id : null)}
                >
                  <PopoverTrigger asChild>
                    <div 
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium cursor-pointer", 
                        getStatusStyles(task.status)
                      )}
                    >
                      {getStatusIcon(task.status)}
                      <span>{task.status.replace('-', ' ')}</span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="end">
                    <RadioGroup 
                      defaultValue={task.status}
                      onValueChange={(value) => handleStatusChange(task.id, value as TaskStatus)}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="completed" id={`completed-${task.id}`} />
                        <label htmlFor={`completed-${task.id}`} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Check className="h-4 w-4 text-green-600" /> Completed
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-progress" id={`in-progress-${task.id}`} />
                        <label htmlFor={`in-progress-${task.id}`} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Clock className="h-4 w-4 text-amber-500" /> In Progress
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pending" id={`pending-${task.id}`} />
                        <label htmlFor={`pending-${task.id}`} className="flex items-center gap-2 text-sm cursor-pointer">
                          <AlertCircle className="h-4 w-4 text-red-500" /> Pending
                        </label>
                      </div>
                    </RadioGroup>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
