// src/components/CommitteeDisplay.tsx

import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const years = [2025, 2024, 2023, 2022, 2021];

interface CommitteeMember {
  role: string;
  member: {
    name: string;
    area: string;
  };
}

const CommitteeDisplay = ({ token }: { token: string }) => {
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommittee = async (year: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/committees/${year}/`, {
        headers: token ? { Authorization: `Token ${token}` } : {},
      });
      setCommittee(res.data);
    } catch (err) {
      setError('Error fetching committee');
      setCommittee([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommittee(selectedYear);
    // eslint-disable-next-line
  }, [selectedYear]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Committee Members</h2>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        className="border p-2 mb-4"
      >
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      {loading && <div className="text-gray-500 mb-2">Loading...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {committee.length === 0 && !loading && (
          <li className="text-gray-500">No committee data found.</li>
        )}
        {committee.map((c, index) => (
          <li key={index} className="p-2 border-b">
            <strong>{c.role}</strong> - {c.member.name} ({c.member.area})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitteeDisplay;
