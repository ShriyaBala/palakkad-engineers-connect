
import React from 'react';
import { MapPin, User, Briefcase } from 'lucide-react';
import { useSearchContext } from '@/contexts/SearchContext';

interface SearchSuggestionsProps {
  searchType: 'location' | 'name' | 'occupation';
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ searchType }) => {
  const { suggestions, showSuggestions, handleSuggestionClick } = useSearchContext();

  if (!showSuggestions || suggestions.length === 0) {
    return null;
  }

  const getIcon = () => {
    switch(searchType) {
      case 'location': return MapPin;
      case 'name': return User;
      case 'occupation': return Briefcase;
      default: return MapPin;
    }
  };

  const Icon = getIcon();

  return (
    <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 py-1">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="px-4 py-2 hover:bg-engineering-50 cursor-pointer text-left"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          <Icon className="inline-block mr-2 text-gray-400" size={16} />
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
