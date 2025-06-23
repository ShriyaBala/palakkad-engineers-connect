// src/components/MemberSearch.tsx

import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const DEFAULT_AVATAR = '/placeholder.svg'; // Using the existing placeholder

const MemberSearch = ({ token }) => {
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Load all members on component mount
  useEffect(() => {
    loadAllMembers();
  }, []);

  const loadAllMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/members/all/');
      setMembers(res.data);
      setSearched(false);
      setInitialLoadComplete(true);
    } catch (err) {
      console.error('Error loading members:', err);
      setError('Failed to load members. Please try again later.');
      setMembers([]);
      setInitialLoadComplete(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      loadAllMembers();
      return;
    }
    
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const res = await axios.get(`/members/?search=${encodeURIComponent(query)}`);
      setMembers(res.data);
      if (res.data.length === 0) {
        setError('No members found matching your search.');
      }
    } catch (err) {
      console.error('Error searching members:', err);
      setError('Sorry, something went wrong. Please try again later.');
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    loadAllMembers();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Member Directory</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by name, email, area, unit, qualification, or skills..."
          className="border p-2 rounded shadow-sm w-full max-w-xs"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        {searched && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            disabled={loading}
          >
            Clear
          </button>
        )}
      </form>
      
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-2">Loading members...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={loadAllMembers}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      )}
      
      {!loading && !error && initialLoadComplete && members.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500">
            <p className="text-lg mb-2">No members found.</p>
            {searched ? (
              <p className="text-sm">Try adjusting your search criteria or contact an administrator.</p>
            ) : (
              <p className="text-sm">The member directory is currently empty. Please check back later.</p>
            )}
          </div>
        </div>
      )}
      
      {!loading && !error && members.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {members.map(member => (
              <div key={member.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border hover:shadow-lg transition-shadow">
                {/* Photo */}
                <img
                  src={DEFAULT_AVATAR}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 mb-3"
                  onError={e => ((e.target as HTMLImageElement).src = DEFAULT_AVATAR)}
                />
                
                {/* Name */}
                <div className="font-semibold text-base text-center mb-2 text-gray-800">
                  {member.name}
                </div>
                
                {/* Contact - Email */}
                <div className="text-gray-600 text-sm text-center mb-1">
                  📧 {member.email}
                </div>
                
                {/* Contact - Phone */}
                {member.phone && (
                  <div className="text-gray-600 text-sm text-center mb-2">
                    📞 {member.phone}
                  </div>
                )}
                
                {/* Area */}
                {member.area && (
                  <div className="text-gray-500 text-xs text-center bg-gray-100 px-2 py-1 rounded-full">
                    📍 {member.area}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center text-gray-500 mt-6">
            <p>Showing {members.length} member{members.length !== 1 ? 's' : ''}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberSearch;
