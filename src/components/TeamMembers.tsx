
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  department: string;
};

const TeamMembers = () => {
  // Sample data
  const members: TeamMember[] = [
    { id: '1', name: 'John Smith', role: 'Project Manager', avatarUrl: '', department: 'Management' },
    { id: '2', name: 'Emma Davis', role: 'UI/UX Designer', avatarUrl: '', department: 'Design' },
    { id: '3', name: 'Michael Brown', role: 'Frontend Developer', avatarUrl: '', department: 'Engineering' },
    { id: '4', name: 'Sophia Garcia', role: 'Marketing Specialist', avatarUrl: '', department: 'Marketing' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-gray-500">{member.role}</div>
              </div>
              <div className="ml-auto">
                <div className="text-sm text-gray-500">{member.department}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembers;
