
import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
};

const MeetingScheduler = () => {
  // Sample data
  const upcomingMeetings: Meeting[] = [
    { 
      id: '1', 
      title: 'Project Kickoff', 
      date: '2023-10-12', 
      time: '10:00 AM', 
      participants: ['John Smith', 'Emma Davis', 'Michael Brown'] 
    },
    { 
      id: '2', 
      title: 'Client Presentation', 
      date: '2023-10-15', 
      time: '2:00 PM', 
      participants: ['John Smith', 'Sophia Garcia'] 
    },
    { 
      id: '3', 
      title: 'Weekly Team Sync', 
      date: '2023-10-16', 
      time: '9:30 AM', 
      participants: ['John Smith', 'Emma Davis', 'Michael Brown', 'Sophia Garcia'] 
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <div key={meeting.id} className="border-b pb-3 last:border-0">
              <div className="font-medium">{meeting.title}</div>
              <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meeting.time}</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-500">Participants:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {meeting.participants.map((participant, index) => (
                    <span 
                      key={index} 
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingScheduler;
