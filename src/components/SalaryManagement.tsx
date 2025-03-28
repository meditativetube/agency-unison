
import React, { useState } from 'react';
import { useUser } from './UserProvider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DollarSign, AlertCircle, Edit, Plus, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from './ui/use-toast';

const SalaryManagement = () => {
  const { currentUser, isAdmin, allUsers, setUsers } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [editingSalaryId, setEditingSalaryId] = useState<string | null>(null);
  const [tempSalary, setTempSalary] = useState<number>(0);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as const,
    salary: 0
  });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const canViewAllSalaries = isAdmin;
  const totalSalaries = allUsers.reduce((sum, user) => sum + (user.salary || 0), 0);
  const annualBudget = totalSalaries * 1.2; // Including benefits and taxes
  const monthlyBudget = annualBudget / 12;

  const handleEditSalary = (userId: string, currentSalary?: number) => {
    setEditingSalaryId(userId);
    setTempSalary(currentSalary || 0);
    setEditMode(true);
  };

  const handleSaveSalary = (userId: string) => {
    setUsers(
      allUsers.map(user => 
        user.id === userId ? { ...user, salary: tempSalary } : user
      )
    );
    setEditingSalaryId(null);
    setEditMode(false);
    toast({
      title: "Salary updated",
      description: "The employee's salary has been updated successfully."
    });
  };

  const handleCancelEdit = () => {
    setEditingSalaryId(null);
    setEditMode(false);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Missing information",
        description: "Please provide name and email for the new team member.",
        variant: "destructive"
      });
      return;
    }

    const newId = (allUsers.length + 1).toString();
    const createdUser = {
      id: newId,
      ...newUser
    };

    setUsers([...allUsers, createdUser]);
    setIsAddUserOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      salary: 0
    });

    toast({
      title: "Team member added",
      description: `${newUser.name} has been added to the team.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="text-2xl font-bold">{formatCurrency(currentUser?.salary)}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Annual salary</div>
          </CardContent>
        </Card>

        {canViewAllSalaries && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Annual Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-2xl font-bold">{formatCurrency(annualBudget)}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Including benefits and taxes</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Payroll</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-2xl font-bold">{formatCurrency(monthlyBudget)}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monthly budget allocation</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {canViewAllSalaries && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Team Salary Management</CardTitle>
                <CardDescription>Manage all team members' salaries</CardDescription>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Team Member</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new team member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="email" className="text-right">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="role" className="text-right">
                        Role
                      </label>
                      <Select 
                        value={newUser.role} 
                        onValueChange={(value: 'admin' | 'cofounder' | 'user') => 
                          setNewUser({...newUser, role: value})
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="cofounder">Cofounder</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="salary" className="text-right">
                        Salary
                      </label>
                      <div className="col-span-3 relative">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="salary"
                          type="number"
                          value={newUser.salary}
                          onChange={(e) => setNewUser({...newUser, salary: parseInt(e.target.value) || 0})}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddUser}>Add Team Member</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <span className="capitalize inline-block px-2 py-1 text-xs rounded-full
                        bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {editingSalaryId === user.id ? (
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            type="number" 
                            value={tempSalary} 
                            onChange={(e) => setTempSalary(parseInt(e.target.value) || 0)} 
                            className="w-32 pl-8"
                          />
                        </div>
                      ) : (
                        formatCurrency(user.salary)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingSalaryId === user.id ? (
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleSaveSalary(user.id)}
                          >
                            <Save className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditSalary(user.id, user.salary)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <AlertCircle className="mr-2 h-4 w-4" />
              Only admins and cofounders can view and manage salary information
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SalaryManagement;
