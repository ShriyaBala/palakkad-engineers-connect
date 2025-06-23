import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { UserX, UserCheck, RefreshCw } from 'lucide-react';

const PendingMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPendingMembers = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get('/api/admin/pending-members/');
      setMembers(response.data);
    } catch (error) {
      console.error('Failed to fetch pending members', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleApprove = async (userId: number) => {
    try {
      await axios.post(`/api/admin/approve-member/${userId}/`);
      fetchPendingMembers(); // Refresh list
    } catch (err) {
      alert('Approval failed');
    }
  };

  const handleReject = async (userId: number) => {
    try {
      await axios.post(`/api/admin/reject-member/${userId}/`);
      fetchPendingMembers(); // Refresh list
    } catch (err) {
      alert('Rejection failed');
    }
  };

  useEffect(() => {
    fetchPendingMembers();
  }, []);

  if (loading) return <p className="p-4 text-blue-600">Loading members...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Pending Members</h2>
          <button
            onClick={fetchPendingMembers}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <RefreshCw className={refreshing ? 'animate-spin' : ''} size={16} />
            Refresh
          </button>
        </div>

        {members.length === 0 ? (
          <p className="text-gray-500">No pending members.</p>
        ) : (
          <div className="grid gap-4">
            {members.map((member: any) => (
              <div
                key={member.id}
                className="bg-white p-4 rounded-xl shadow border flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(member.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    <UserCheck className="w-4 h-4 inline mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(member.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    <UserX className="w-4 h-4 inline mr-1" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingMembersPage;
