
import React from 'react';
import { Search, Briefcase } from 'lucide-react';
import { useSearchContext } from '@/contexts/SearchContext';

const SearchInfo: React.FC = () => {
  const { hasSearched } = useSearchContext();

  if (hasSearched) {
    return null;
  }

  return (
    <div className="mt-12 bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">Why Search Our Engineering Directory?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-engineering-100 p-3 rounded-full mb-4">
            <Search size={24} className="text-engineering-600" />
          </div>
          <h4 className="font-medium mb-2">Find Local Expertise</h4>
          <p className="text-sm text-gray-600">
            Connect with qualified engineers in specific locations across Palakkad district
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-engineering-100 p-3 rounded-full mb-4">
            <Briefcase size={24} className="text-engineering-600" />
          </div>
          <h4 className="font-medium mb-2">Business Opportunities</h4>
          <p className="text-sm text-gray-600">
            Discover potential partners, clients or employees for your projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchInfo;
