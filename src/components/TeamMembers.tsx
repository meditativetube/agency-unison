
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUser } from './UserProvider';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  department: string;
};

const TeamMembers = () => {
  const { isAdmin } = useUser();
  
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
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Team Members</span>
          {isAdmin && (
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">
              Admin Access
            </span>
          )}
        </CardTitle>
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
                <div className="font-medium dark:text-gray-200">{member.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{member.role}</div>
              </div>
              <div className="ml-auto">
                <div className="text-sm text-gray-500 dark:text-gray-400">{member.department}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembers;
