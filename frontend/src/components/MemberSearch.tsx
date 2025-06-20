// src/components/MemberSearch.tsx

import React, { useState } from 'react';
import axios from '../api/axios';

const DEFAULT_AVATAR = '/default-avatar.png'; // Place a default avatar in your public folder

const MemberSearch = ({ token }) => {
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const res = await axios.get(`/members/?search=${query}`);
      setMembers(res.data);
      if (res.data.length === 0) {
        setError('No members found matching your search.');
    }
    } catch {
      setError('Sorry, something went wrong. Please try again later.');
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Member Directory</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6 justify-center">
      <input
        type="text"
          placeholder="Search by name, email, or area..."
          className="border p-2 rounded shadow-sm w-full max-w-xs"
        value={query}
          onChange={e => setQuery(e.target.value)}
      />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      {loading && <div className="text-gray-500 mb-2 text-center">Searching...</div>}
      {error && searched && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map(m => (
          <div key={m.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img
              src={m.passport_photo || DEFAULT_AVATAR}
              alt={m.name}
              className="w-20 h-20 rounded-full object-cover border mb-2"
              onError={e => ((e.target as HTMLImageElement).src = DEFAULT_AVATAR)}
            />
            <div className="font-semibold text-lg">{m.name}</div>
            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-1 mb-1">{m.role}</div>
            <div className="text-gray-600 text-sm">{m.area}</div>
            <div className="text-gray-500 text-xs mt-1">{m.email}</div>
            <div className="text-gray-500 text-xs">{m.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberSearch;
