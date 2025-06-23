import React, { useEffect, useState } from "react";
import API from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const AdminDashboard = () => {
  const { toast } = useToast();
  
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [pendingMembers, setPendingMembers] = useState<any[]>([]);
  const [adminInfo, setAdminInfo] = useState<any>(null);
  
  // State for profile management
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
    fetchPendingMembers();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await API.get("/api/admin/dashboard/");
      setDashboardData(response.data);
      setAdminInfo(response.data.admin_info);
      setProfileForm({
        first_name: response.data.admin_info.name.split(' ')[0] || '',
        last_name: response.data.admin_info.name.split(' ').slice(1).join(' ') || '',
        email: response.data.admin_info.email,
        phone: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    }
  };

  const fetchPendingMembers = async () => {
    try {
      const response = await API.get("/api/admin/pending-members/");
      setPendingMembers(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch pending members",
        variant: "destructive",
      });
    }
  };

  // Approve/Reject handlers
  const handleApproveMember = async (userId: number) => {
    try {
      await API.post(`/api/admin/approve-member/${userId}/`);
      toast({
        title: "Success",
        description: "Member approved successfully",
      });
      fetchPendingMembers();
      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve member",
        variant: "destructive",
      });
    }
  };

  const handleRejectMember = async (userId: number) => {
    try {
      await API.post(`/api/admin/reject-member/${userId}/`);
      toast({
        title: "Success",
        description: "Member rejected",
      });
      fetchPendingMembers();
      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject member",
        variant: "destructive",
      });
    }
  };

  const handleBulkApprove = async () => {
    const selectedMembers = pendingMembers.filter(m => m.selected);
    if (selectedMembers.length === 0) {
      toast({
        title: "Warning",
        description: "Please select members to approve",
        variant: "destructive",
      });
      return;
    }

    try {
      await API.post("/api/admin/bulk-approve/", {
        user_ids: selectedMembers.map(m => m.id)
      });
      toast({
        title: "Success",
        description: `Approved ${selectedMembers.length} members`,
      });
      fetchPendingMembers();
      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve members",
        variant: "destructive",
      });
    }
  };

  // Profile management handlers
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/api/admin/update-profile/", profileForm);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setShowProfileModal(false);
      fetchDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    try {
      await API.post("/api/admin/change-password/", {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password
      });
      toast({
        title: "Success",
        description: "Password changed successfully",
      });
      setShowPasswordModal(false);
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to change password",
        variant: "destructive",
      });
    }
  };

  const toggleMemberSelection = (userId: number) => {
    setPendingMembers(prev => 
      prev.map(member => 
        member.id === userId 
          ? { ...member, selected: !member.selected }
          : member
      )
    );
  };

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={() => setShowProfileModal(true)} variant="outline">
              Edit Profile
            </Button>
            <Button onClick={() => setShowPasswordModal(true)} variant="outline">
              Change Password
            </Button>
          </div>
        </div>

        {/* Admin Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome, {adminInfo?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{dashboardData.pending_members}</div>
                <div className="text-sm text-gray-600">Pending Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{dashboardData.total_members}</div>
                <div className="text-sm text-gray-600">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{dashboardData.total_area_admins}</div>
                <div className="text-sm text-gray-600">Area Admins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{dashboardData.total_unit_admins}</div>
                <div className="text-sm text-gray-600">Unit Admins</div>
                  </div>
                  </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                  Pending Member Approvals
                  {pendingMembers.length > 0 && (
                    <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
                      Approve Selected ({pendingMembers.filter(m => m.selected).length})
                    </Button>
                  )}
              </CardTitle>
            </CardHeader>
            <CardContent>
                {pendingMembers.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">No pending members to approve.</div>
                ) : (
                  <div className="space-y-4">
                    {pendingMembers.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={member.selected || false}
                            onChange={() => toggleMemberSelection(member.id)}
                            className="rounded"
                          />
                    <div>
                            <div className="font-semibold">{member.name || member.username}</div>
                            <div className="text-sm text-gray-600">{member.email}</div>
                            <div className="text-xs text-gray-500">
                              Area: {member.area || 'Not specified'} | 
                              Unit: {member.unit || 'Not specified'}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700" 
                            onClick={() => handleApproveMember(member.id)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleRejectMember(member.id)}
                          >
                            Reject
                          </Button>
                    </div>
                    </div>
                ))}
                  </div>
                )}
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm({...profileForm, first_name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm({...profileForm, last_name: e.target.value})}
                      required
                    />
                  </div>
                    <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      required
                    />
                    </div>
                    <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">Update Profile</Button>
                    <Button type="button" variant="outline" onClick={() => setShowProfileModal(false)}>
                      Cancel
                    </Button>
                    </div>
                </form>
            </CardContent>
          </Card>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input
                      id="current_password"
                      type="password"
                      value={passwordForm.current_password}
                      onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                      required
                    />
                    </div>
                    <div>
                    <Label htmlFor="new_password">New Password</Label>
                    <Input
                      id="new_password"
                      type="password"
                      value={passwordForm.new_password}
                      onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
                      required
                    />
                    </div>
                  <div>
                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                    <Input
                      id="confirm_password"
                      type="password"
                      value={passwordForm.confirm_password}
                      onChange={(e) => setPasswordForm({...passwordForm, confirm_password: e.target.value})}
                      required
                    />
        </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">Change Password</Button>
                    <Button type="button" variant="outline" onClick={() => setShowPasswordModal(false)}>
                      Cancel
                    </Button>
                </div>
              </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;