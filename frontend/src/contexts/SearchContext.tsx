import React, { createContext, useState, useContext, ReactNode } from 'react';
import API from '@/api/axios';

export interface Engineer {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string;
  unit: string;
  qualification: string;
  skills: string;
  licenseNo: string;
  panchayath: string;
  is_approved: boolean;
  is_member: boolean;
  passport_photo?: string;
  role: string;
}

// Palakkad locations for autocomplete suggestions
export const palakkadLocations = [
  'Palakkad Town',
  'Ottapalam',
  'Chittur',
  'Mannarkkad',
  'Alathur',
  'Pattambi',
  'Shoranur',
  'Kollengode',
  'Vadakkanchery',
  'Malampuzha',
];

// Engineering specializations
export const specializations = [
  'Civil Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Computer Science',
  'Environmental Engineering',
  'Structural Engineering',
  'Chemical Engineering',
  'Aerospace Engineering',
];

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: Engineer[];
  setSearchResults: React.Dispatch<React.SetStateAction<Engineer[]>>;
  suggestions: string[];
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  searchType: 'location' | 'name' | 'occupation';
  setSearchType: React.Dispatch<React.SetStateAction<'location' | 'name' | 'occupation'>>;
  specializationFilter: string;
  setSpecializationFilter: React.Dispatch<React.SetStateAction<string>>;
  experienceFilter: string;
  setExperienceFilter: React.Dispatch<React.SetStateAction<string>>;
  hasSearched: boolean;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (e?: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (suggestion: string) => void;
  resetFilters: () => void;
  loading: boolean;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Engineer[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchType, setSearchType] = useState<'location' | 'name' | 'occupation'>('location');
  const [specializationFilter, setSpecializationFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('any');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    try {
      // Call the real API
      const response = await API.get('/api/search-members/', {
        params: {
          search: searchQuery,
          search_type: searchType,
          specialization: specializationFilter !== 'all' ? specializationFilter : '',
          experience: experienceFilter !== 'any' ? experienceFilter : ''
        }
      });
      
      setSearchResults(response.data);
      setHasSearched(true);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      // Generate suggestions based on search type
      let filteredSuggestions: string[] = [];
      
      switch (searchType) {
        case 'location':
          filteredSuggestions = palakkadLocations.filter(location =>
            location.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'name':
          // For names, we could have a predefined list or just show recent searches
          filteredSuggestions = [];
          break;
        case 'occupation':
          filteredSuggestions = specializations.filter(spec =>
            spec.toLowerCase().includes(value.toLowerCase())
          );
          break;
      }
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSuggestions([]);
    setShowSuggestions(false);
    setSpecializationFilter('all');
    setExperienceFilter('any');
    setHasSearched(false);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchResults,
      setSearchResults,
      suggestions,
      setSuggestions,
      showSuggestions,
      setShowSuggestions,
      searchType,
      setSearchType,
      specializationFilter,
      setSpecializationFilter,
      experienceFilter,
      setExperienceFilter,
      hasSearched,
      setHasSearched,
      handleSearch,
      handleInputChange,
      handleSuggestionClick,
      resetFilters,
      loading
    }}>
      {children}
    </SearchContext.Provider>
  );
};
