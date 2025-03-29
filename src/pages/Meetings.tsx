
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MeetingCalendar from '@/components/MeetingCalendar';
import { useUser } from '@/components/UserProvider';
import { useIsMobile } from '@/hooks/use-mobile';

const Meetings = () => {
  const { isAdmin } = useUser();
  const isMobile = useIsMobile();

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Meeting Scheduler</h1>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="w-full md:w-auto flex">
          <TabsTrigger value="calendar" className="flex-1 md:flex-none">Calendar View</TabsTrigger>
          <TabsTrigger value="list" className="flex-1 md:flex-none">List View</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin" className="flex-1 md:flex-none">Admin Controls</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <MeetingCalendar />
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="text-center py-8 md:py-10">
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
              <CardContent className="p-4 md:p-6">
                <div className="text-center py-8 md:py-10">
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
