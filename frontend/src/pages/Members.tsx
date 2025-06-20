import React from 'react';
import Layout from '@/components/Layout';
import MemberSearch from '@/components/MemberSearch';
import CommitteeDisplay from '@/components/CommiteeDisplay';

const Members = () => {
  // No access restriction, public page
  const token = localStorage.getItem('token') || '';

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Palakkad Engineers Directory</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with qualified engineering professionals across Palakkad district. Our directory 
              helps you find the right expertise for your projects and networking needs.
            </p>
          </div>
          {/* Member Search Section */}
          <div className="mb-16">
            <MemberSearch token={token} />
          </div>
          {/* Committee Details Section */}
          <div className="mb-16">
            <CommitteeDisplay token={token} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Members;

