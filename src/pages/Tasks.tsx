
import React, { useState } from 'react';
import { Plus, Filter, ArrowDownAZ, Search, FileDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import TaskList, { Task, TaskStatus } from '@/components/TaskList';
import TaskDialog from '@/components/TaskDialog';
import { toast } from '@/hooks/use-toast';

const Tasks = () => {
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finalize client proposal', assignee: 'John Smith', dueDate: '2023-10-15', status: 'in-progress' },
    { id: '2', title: 'Website design review', assignee: 'Emma Davis', dueDate: '2023-10-12', status: 'completed' },
    { id: '3', title: 'Quarterly report preparation', assignee: 'Michael Brown', dueDate: '2023-10-20', status: 'pending' },
    { id: '4', title: 'Client meeting preparation', assignee: 'Sophia Garcia', dueDate: '2023-10-10', status: 'in-progress' },
    { id: '5', title: 'Project timeline update', assignee: 'John Smith', dueDate: '2023-10-18', status: 'pending' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleCreateTask = (newTask: Omit<Task, 'id'>) => {
    // Generate a unique ID (in a real app, this might come from a backend)
    const id = (tasks.length + 1).toString();
    setTasks([...tasks, { id, ...newTask }]);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    // First filter by search term
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'my-tasks') return matchesSearch && task.assignee === 'John Smith'; // Example - normally would be current user
    if (activeTab === 'completed') return matchesSearch && task.status === 'completed';
    if (activeTab === 'pending') return matchesSearch && task.status === 'pending';
    
    return matchesSearch;
  });

  const exportTasks = () => {
    const headers = ['Title', 'Assignee', 'Due Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredTasks.map(task => 
        [
          `"${task.title}"`, 
          `"${task.assignee}"`, 
          task.dueDate, 
          `"${task.status}"`
        ].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tasks-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: "Tasks have been exported to CSV file.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowTaskDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
          <Button variant="outline" onClick={exportTasks}>
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search tasks..." 
            className="pl-8 w-full" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ArrowDownAZ className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
        </TabsContent>
        <TabsContent value="my-tasks" className="mt-4">
          <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
        </TabsContent>
      </Tabs>
      
      <TaskDialog 
        open={showTaskDialog} 
        onOpenChange={setShowTaskDialog} 
        onTaskCreate={handleCreateTask}
      />
    </div>
  );
};

export default Tasks;
