import React from 'react';
import { useSearchContext } from '@/contexts/SearchContext';
import EngineerCard from './EngineerCard';
import { Loader2 } from 'lucide-react';

const SearchResults: React.FC = () => {
  const { searchResults, hasSearched, searchQuery, loading } = useSearchContext();

  if (!hasSearched) {
    return null;
  }

  if (loading) {
    return (
      <div className="text-center py-8 mt-4">
        <Loader2 className="animate-spin mx-auto mb-4" size={32} />
        <p className="text-gray-600">Searching for engineers...</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-8 mt-4">
        <p className="text-gray-600">No engineers found matching your criteria. Try different search terms or filters.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">
        Search Results ({searchResults.length} {searchResults.length === 1 ? 'engineer' : 'engineers'} found)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map(engineer => (
          <EngineerCard key={engineer.id} engineer={engineer} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
