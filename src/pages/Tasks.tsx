
import React from 'react';
import { Plus, Filter, ArrowDownAZ, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const Tasks = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search tasks..." className="pl-8 w-full" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ArrowDownAZ className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start justify-between border-b pb-4 last:border-0">
                    <div className="space-y-1">
                      <div className="font-medium">Task Title {i + 1}</div>
                      <div className="text-sm text-gray-500">This is a description for this task. It includes details about what needs to be done.</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Design</div>
                        <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Frontend</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-sm text-gray-500">Due: Oct 15, 2023</div>
                      <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">In Progress</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-tasks" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Your assigned tasks will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Completed tasks will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Pending tasks will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
