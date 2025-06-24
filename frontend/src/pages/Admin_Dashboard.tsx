import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Settings,
  Eye,
  Activity,
  RefreshCw,
} from 'lucide-react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get('/api/admin/dashboard/');
      setDashboardData(response.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Unauthorized. Please login again.');
        localStorage.clear();
      } else if (err.response?.status === 403) {
        setError('Access denied. Admin only.');
      } else {
        setError('Something went wrong while fetching data.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <Shield className="text-red-500 w-8 h-8 mx-auto mb-2" />
          <h2 className="text-lg font-bold mb-2">Access Error</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Main Dashboard
          </button>
        </div>
      </div>
    );
  }

  const {
    pending_members,
    total_members,
    total_area_admins,
    total_unit_admins,
    admin_info,
  } = dashboardData || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome, {admin_info?.name}</p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={refreshing ? 'animate-spin' : ''} size={16} />
            Refresh
          </button>
        </div>

        {/* Admin Info */}
        <div className="bg-blue-600 text-white rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold">{admin_info?.name}</h2>
          <p>{admin_info?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-blue-800 rounded-full text-xs uppercase tracking-wide">
            {admin_info?.role}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Pending Members"
            value={pending_members}
            icon={UserX}
            color="bg-orange-500"
          />
          <StatCard
            title="Total Members"
            value={total_members}
            icon={UserCheck}
            color="bg-green-500"
          />
          <StatCard
            title="Area Admins"
            value={total_area_admins}
            icon={Shield}
            color="bg-blue-500"
          />
          <StatCard
            title="Unit Admins"
            value={total_unit_admins}
            icon={Settings}
            color="bg-purple-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => (window.location.href = '/admin/pending-members')}
              className="p-4 border rounded-lg flex items-center gap-4 hover:shadow cursor-pointer"
            >
              <Eye className="text-blue-600 w-6 h-6" />
              <div>
                <p className="font-semibold">Review Pending Members</p>
                <p className="text-sm text-gray-600">{pending_members} waiting</p>
              </div>
            </div>
            <div
              onClick={() => (window.location.href = '/admin/total-members')}
              className="p-4 border rounded-lg flex items-center gap-4 hover:shadow cursor-pointer"
            >
              <Users className="text-blue-600 w-6 h-6" />
              <div>
                <p className="font-semibold">Total Members</p>
                <p className="text-sm text-gray-600">{total_members} approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;