
import React from 'react';
import { Plus, Search, Filter, ArrowDownAZ } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TeamMemberCard = ({ 
  name, 
  role, 
  department, 
  email, 
  phone 
}: { 
  name: string; 
  role: string; 
  department: string; 
  email: string; 
  phone: string;
}) => {
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
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 flex-1">
            <h3 className="font-medium">{name}</h3>
            <div className="text-sm text-gray-500">{role}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {department}
              </div>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <div>{email}</div>
            <div>{phone}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Team = () => {
  // Sample team data
  const teamMembers = [
    {
      name: "John Smith",
      role: "Project Manager",
      department: "Management",
      email: "john@example.com",
      phone: "(123) 456-7890"
    },
    {
      name: "Emma Davis",
      role: "UI/UX Designer",
      department: "Design",
      email: "emma@example.com",
      phone: "(123) 456-7891"
    },
    {
      name: "Michael Brown",
      role: "Frontend Developer",
      department: "Engineering",
      email: "michael@example.com",
      phone: "(123) 456-7892"
    },
    {
      name: "Sophia Garcia",
      role: "Marketing Specialist",
      department: "Marketing",
      email: "sophia@example.com",
      phone: "(123) 456-7893"
    },
    {
      name: "David Wilson",
      role: "Backend Developer",
      department: "Engineering",
      email: "david@example.com",
      phone: "(123) 456-7894"
    },
    {
      name: "Olivia Johnson",
      role: "Content Writer",
      department: "Marketing",
      email: "olivia@example.com",
      phone: "(123) 456-7895"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search team members..." className="pl-8 w-full" />
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
          <TabsTrigger value="all">All Members</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="management" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {teamMembers
              .filter((member) => member.department === "Management")
              .map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="design" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {teamMembers
              .filter((member) => member.department === "Design")
              .map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="engineering" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {teamMembers
              .filter((member) => member.department === "Engineering")
              .map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="marketing" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {teamMembers
              .filter((member) => member.department === "Marketing")
              .map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Team;
