import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import API from '@/api/axios';

const Dashboard = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    area: ''
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  // 🔄 Fetch profile on mount
  useEffect(() => {
    API.get('/api/me/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => setProfile(res.data))
      .catch(() => {
        setError('❌ Failed to load profile. Please re-login.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setMsg('');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPwdMsg('');
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.patch('/api/update-profile/', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setMsg('✅ Profile updated successfully!');
    } catch {
      setMsg('❌ Failed to update profile');
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/change-password/', passwordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setPwdMsg('✅ Password changed successfully!');
      setPasswordData({ current_password: '', new_password: '' });
    } catch {
      setPwdMsg('❌ Error changing password. Please check your current password.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h2 className="text-3xl font-bold">👋 Welcome, {profile.name}</h2>

      {/* Profile Update Section */}
      <form onSubmit={updateProfile} className="bg-white shadow rounded p-6 space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Update Profile</h3>

        <div className="space-y-2">
          <Label>Name</Label>
          <Input name="name" value={profile.name} onChange={handleProfileChange} required />
        </div>

        <div className="space-y-2">
          <Label>Phone</Label>
          <Input name="phone" value={profile.phone} onChange={handleProfileChange} required />
        </div>

        <div className="space-y-2">
          <Label>Area</Label>
          <Input name="area" value={profile.area} onChange={handleProfileChange} required />
        </div>

        <div className="space-y-2">
          <Label>Email (read-only)</Label>
          <Input name="email" value={profile.email} readOnly />
        </div>

        {msg && <p className="text-sm text-green-600">{msg}</p>}
        <Button type="submit">Update Profile</Button>
      </form>

      {/* Password Change Section */}
      <form onSubmit={changePassword} className="bg-white shadow rounded p-6 space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Change Password</h3>

        <div className="space-y-2">
          <Label>Current Password</Label>
          <Input
            name="current_password"
            type="password"
            value={passwordData.current_password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>New Password</Label>
          <Input
            name="new_password"
            type="password"
            value={passwordData.new_password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        {pwdMsg && <p className="text-sm text-green-600">{pwdMsg}</p>}
        <Button type="submit" variant="secondary">Change Password</Button>
      </form>
    </div>
  );
};

export default Dashboard;
