
import React from 'react';
import { Plus, Filter, CalendarDays, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Meeting = {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  participants: {
    name: string;
    avatar?: string;
  }[];
  location: string;
};

const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{meeting.title}</h3>
              <div className="text-sm text-gray-500 mt-1">
                {meeting.date} • {meeting.time} ({meeting.duration})
              </div>
            </div>
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {meeting.type}
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Location</div>
            <div className="text-sm">{meeting.location}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Participants</div>
            <div className="flex -space-x-2 overflow-hidden">
              {meeting.participants.map((participant, index) => (
                <Avatar key={index} className="h-8 w-8 border-2 border-white">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback className="text-xs">
                    {getInitials(participant.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {meeting.participants.length > 5 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs">
                  +{meeting.participants.length - 5}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm">Join</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Meetings = () => {
  // Sample meetings data
  const meetings: Meeting[] = [
    {
      id: 1,
      title: "Weekly Team Standup",
      date: "Today",
      time: "10:00 AM",
      duration: "30 mins",
      type: "Recurring",
      location: "Meeting Room A",
      participants: [
        { name: "John Smith" },
        { name: "Emma Davis" },
        { name: "Michael Brown" },
        { name: "Sophia Garcia" },
        { name: "David Wilson" },
        { name: "Olivia Johnson" },
      ]
    },
    {
      id: 2,
      title: "Project Kickoff: Website Redesign",
      date: "Tomorrow",
      time: "2:00 PM",
      duration: "1 hour",
      type: "One-time",
      location: "Conference Room",
      participants: [
        { name: "John Smith" },
        { name: "Emma Davis" },
        { name: "David Wilson" },
      ]
    },
    {
      id: 3,
      title: "Client Presentation: ABC Corp",
      date: "Oct 15, 2023",
      time: "11:00 AM",
      duration: "1.5 hours",
      type: "External",
      location: "Zoom Meeting",
      participants: [
        { name: "John Smith" },
        { name: "Sophia Garcia" },
        { name: "Emma Davis" },
        { name: "External Client" },
      ]
    },
    {
      id: 4,
      title: "Design Review",
      date: "Oct 16, 2023",
      time: "3:30 PM",
      duration: "45 mins",
      type: "Internal",
      location: "Design Studio",
      participants: [
        { name: "Emma Davis" },
        { name: "Michael Brown" },
        { name: "Olivia Johnson" },
      ]
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meeting Scheduler</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Schedule Meeting
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="gap-1">
          <CalendarDays className="h-4 w-4" /> Calendar View
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <List className="h-4 w-4" /> List View
        </Button>
        <div className="flex-1"></div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="my-meetings">My Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Past meetings will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-meetings" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Meetings you're participating in will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Meetings;
