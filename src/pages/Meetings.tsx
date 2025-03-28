
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MeetingCalendar from '@/components/MeetingCalendar';
import { useUser } from '@/components/UserProvider';

const Meetings = () => {
  const { isAdmin } = useUser();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meeting Scheduler</h1>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin Controls</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <MeetingCalendar />
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">List View</h3>
                <p className="text-muted-foreground">
                  This feature is coming soon. Check back later for a comprehensive list view of meetings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="admin">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">Admin Controls</h3>
                  <p className="text-muted-foreground">
                    As an admin, you'll soon be able to create meeting templates, set team availability, and manage meeting resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Meetings;
