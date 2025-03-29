
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useUser } from '@/components/UserProvider';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Edit, Trash2, RefreshCw, User } from 'lucide-react';

const UserManagement = () => {
  const { allUsers, setUsers } = useUser();
  const { toast } = useToast();
  const [newUserDialog, setNewUserDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'cofounder' | 'user',
    password: ''
  });

  const handleAddUser = () => {
    const newUserId = (allUsers.length + 1).toString();
    const createdUser = {
      id: newUserId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      authProvider: 'password' as 'password' | 'google' | 'microsoft' | 'gmail',
      avatar: `https://ui-avatars.com/api/?name=${newUser.name.replace(' ', '+')}&background=0D8ABC&color=fff`
    };
    
    setUsers([...allUsers, createdUser]);
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`,
    });
    
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      password: ''
    });
    
    setNewUserDialog(false);
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = allUsers.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    );
    
    setUsers(updatedUsers);
    toast({
      title: "User Updated",
      description: `${selectedUser.name}'s information has been updated.`,
    });
    
    setEditUserDialog(false);
  };

  const handleResetPassword = (user: any) => {
    toast({
      title: "Password Reset",
      description: `A password reset link has been sent to ${user.email}.`,
    });
  };

  const handleRemoveUser = (userId: string) => {
    const updatedUsers = allUsers.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    toast({
      title: "User Removed",
      description: "The user has been removed successfully.",
      variant: "destructive"
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Add, edit, or remove users and manage their permissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Users ({allUsers.length})</h3>
          <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Add New User</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account and set their initial permissions.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-user-name">Full Name</Label>
                  <Input 
                    id="new-user-name" 
                    value={newUser.name} 
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
                    placeholder="User's full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-user-email">Email</Label>
                  <Input 
                    id="new-user-email" 
                    type="email"
                    value={newUser.email} 
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
                    placeholder="user@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-user-password">Initial Password</Label>
                  <Input 
                    id="new-user-password" 
                    type="password"
                    value={newUser.password} 
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})} 
                    placeholder="Set a temporary password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>User Role</Label>
                  <RadioGroup 
                    value={newUser.role} 
                    onValueChange={(value) => setNewUser({...newUser, role: value as 'admin' | 'cofounder' | 'user'})}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="role-admin" />
                      <Label htmlFor="role-admin">Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cofounder" id="role-cofounder" />
                      <Label htmlFor="role-cofounder">Co-founder</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="user" id="role-user" />
                      <Label htmlFor="role-user">User</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewUserDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="border rounded-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">User</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {allUsers.map(user => (
                  <tr key={user.id} className="hover:bg-muted/30">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                          ) : (
                            <User className="h-4 w-4 m-2 text-gray-400" />
                          )}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
                        user.role === 'cofounder' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedUser(user);
                            setEditUserDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleResetPassword(user)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit User Dialog */}
        <Dialog open={editUserDialog} onOpenChange={setEditUserDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information and permissions.
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-user-name">Full Name</Label>
                  <Input 
                    id="edit-user-name" 
                    value={selectedUser.name} 
                    onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})} 
                    placeholder="User's full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-user-email">Email</Label>
                  <Input 
                    id="edit-user-email" 
                    type="email"
                    value={selectedUser.email} 
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})} 
                    placeholder="user@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>User Role</Label>
                  <RadioGroup 
                    value={selectedUser.role} 
                    onValueChange={(value) => setSelectedUser({...selectedUser, role: value})}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="edit-role-admin" />
                      <Label htmlFor="edit-role-admin">Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cofounder" id="edit-role-cofounder" />
                      <Label htmlFor="edit-role-cofounder">Co-founder</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="user" id="edit-role-user" />
                      <Label htmlFor="edit-role-user">User</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditUserDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditUser}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </>
  );
};

export default UserManagement;
