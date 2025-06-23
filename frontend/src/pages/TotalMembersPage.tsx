import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';

const TotalMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMembers = async () => {
    try {
      const res = await axios.get('/api/members/all/');
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching members', err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((member: any) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Total Members</h2>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="space-y-4">
          {filteredMembers.length === 0 ? (
            <p>No members found.</p>
          ) : (
            filteredMembers.map((member: any) => (
              <div key={member.id} className="p-4 bg-white rounded shadow border">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-sm text-gray-500 capitalize">{member.role}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalMembersPage;
