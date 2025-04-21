
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  avatar_url: string | null;
}

const UserManagementSection = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [processingUpdate, setProcessingUpdate] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Fetch profiles from the database
      const profilesResponse = await supabase.from("profiles").select("*");
      if (profilesResponse.error) {
        throw profilesResponse.error;
      }
      
      const profiles = profilesResponse.data ?? [];
      
      // For each profile, we need to create a UserProfile object
      // In a real application, you would get emails from auth.users table via server function
      // Here we'll use placeholder emails since we can't directly query auth.users
      const usersData: UserProfile[] = profiles.map((p) => ({
        id: p.id,
        first_name: p.first_name,
        last_name: p.last_name,
        email: `user-${p.id.substring(0, 8)}@example.com`, // Placeholder email
        avatar_url: p.avatar_url,
      }));
      
      setUsers(usersData);
    } catch (error: any) {
      toast.error("Failed to load users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openEditUser = (user: UserProfile) => {
    setEditingUser(user);
    setUserFirstName(user.first_name || "");
    setUserLastName(user.last_name || "");
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    
    try {
      setProcessingUpdate(true);
      
      // Update the profile in the database
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: userFirstName,
          last_name: userLastName,
        })
        .eq("id", editingUser.id);
      
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, first_name: userFirstName, last_name: userLastName }
          : user
      ));
      
      toast.success("User updated successfully");
      setEditingUser(null);
    } catch (error: any) {
      toast.error("Failed to update user: " + error.message);
    } finally {
      setProcessingUpdate(false);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-parkblue"></div>
          <span className="ml-3">Loading users...</span>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => openEditUser(user)} className="mr-2">
                    <Edit className="inline mr-1 h-4 w-4" /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="max-w-md">
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information
          </DialogDescription>
          <div className="space-y-4 mt-4">
            <Input
              type="text"
              placeholder="First Name"
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
              disabled={processingUpdate}
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              disabled={processingUpdate}
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={processingUpdate}>Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleSaveUser} 
              disabled={processingUpdate}
            >
              {processingUpdate ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UserManagementSection;
