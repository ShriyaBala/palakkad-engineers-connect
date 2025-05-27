
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Engineer {
  id: number;
  name: string;
  specialization: string;
  location: string;
  distance: string;
  profileImage: string;
  occupation?: string;
  skills?: string[];
  experience?: number;
  contactDetails?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  verified?: boolean;
}

// Mock data for demonstration - enhanced with more details
export const engineersData: Engineer[] = [
  {
    id: 1,
    name: 'Arun Kumar',
    specialization: 'Civil Engineering',
    location: 'Palakkad Town',
    distance: '0.5 km',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
    occupation: 'Project Manager',
    skills: ['Construction Management', 'AutoCAD', 'Project Planning'],
    experience: 8,
    contactDetails: {
      phone: '+91-9876543210',
      email: 'arun@example.com',
      website: 'arunkumar.com',
    },
    verified: true,
  },
  {
    id: 2,
    name: 'Priya Nair',
    specialization: 'Electrical Engineering',
    location: 'Ottapalam',
    distance: '15 km',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    occupation: 'Electrical System Designer',
    skills: ['Power Systems', 'Circuit Design', 'Renewable Energy'],
    experience: 6,
    contactDetails: {
      phone: '+91-8765432109',
      email: 'priya@example.com',
    },
    verified: true,
  },
  {
    id: 3,
    name: 'Suresh Menon',
    specialization: 'Mechanical Engineering',
    location: 'Chittur',
    distance: '12 km',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=256',
    occupation: 'HVAC Specialist',
    skills: ['HVAC Design', 'Thermodynamics', '3D Modeling'],
    experience: 10,
    contactDetails: {
      email: 'suresh@example.com',
      website: 'sureshmenon.co.in',
    },
    verified: false,
  },
  {
    id: 4,
    name: 'Divya Krishnan',
    specialization: 'Computer Science',
    location: 'Pattambi',
    distance: '22 km',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256',
    occupation: 'Software Developer',
    skills: ['Web Development', 'AI/ML', 'Cloud Computing'],
    experience: 5,
    contactDetails: {
      phone: '+91-7654321098',
      email: 'divya@example.com',
    },
    verified: true,
  },
  {
    id: 5,
    name: 'Rajesh Pillai',
    specialization: 'Environmental Engineering',
    location: 'Mannarkkad',
    distance: '28 km',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    occupation: 'Environmental Consultant',
    skills: ['Waste Management', 'EIA', 'Sustainability'],
    experience: 12,
    contactDetails: {
      phone: '+91-6543210987',
      email: 'rajesh@example.com',
    },
    verified: true,
  },
  {
    id: 6,
    name: 'Lakshmi Varma',
    specialization: 'Structural Engineering',
    location: 'Palakkad Town',
    distance: '1.2 km',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=256',
    occupation: 'Structural Designer',
    skills: ['Structural Analysis', 'Building Codes', 'Seismic Design'],
    experience: 9,
    contactDetails: {
      email: 'lakshmi@example.com',
      website: 'lakshmivarmase.in',
    },
    verified: false,
  },
];

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

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // In a real app, this would be an API call with the search query
    // For now, we'll just filter the mock data based on search type
    let results = [...engineersData];
    
    if (searchQuery) {
      switch (searchType) {
        case 'location':
          results = results.filter(engineer => 
            engineer.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
          break;
        case 'name':
          results = results.filter(engineer => 
            engineer.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          break;
        case 'occupation':
          results = results.filter(engineer => 
            engineer.occupation?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          break;
      }
    }
    
    // Apply specialization filter
    if (specializationFilter && specializationFilter !== 'all') {
      results = results.filter(engineer => 
        engineer.specialization === specializationFilter
      );
    }
    
    // Apply experience filter
    if (experienceFilter && experienceFilter !== 'any') {
      const minExperience = parseInt(experienceFilter);
      results = results.filter(engineer => 
        (engineer.experience || 0) >= minExperience
      );
    }
    
    setSearchResults(results);
    setShowSuggestions(false);
    setHasSearched(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 1) {
      // Filter suggestions based on search type
      let filtered: string[] = [];
      
      switch (searchType) {
        case 'location':
          filtered = palakkadLocations.filter(location => 
            location.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'name':
          filtered = Array.from(new Set(engineersData.map(eng => eng.name)))
            .filter(name => name.toLowerCase().includes(value.toLowerCase()));
          break;
        case 'occupation':
          filtered = Array.from(new Set(engineersData.map(eng => eng.occupation || '')))
            .filter(occ => occ && occ.toLowerCase().includes(value.toLowerCase()));
          break;
      }
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    
    // Auto search when selecting a suggestion
    setTimeout(() => {
      handleSearch();
    }, 100);
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSpecializationFilter('all');
    setExperienceFilter('any');
    setHasSearched(false);
    setSearchResults([]);
  };

  const value = {
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
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
