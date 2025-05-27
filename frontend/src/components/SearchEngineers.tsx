
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Engineer {
  id: number;
  name: string;
  specialization: string;
  location: string;
  distance: string;
  profileImage: string;
}

// Mock data for demonstration
const engineersData: Engineer[] = [
  {
    id: 1,
    name: 'Arun Kumar',
    specialization: 'Civil Engineering',
    location: 'Palakkad Town',
    distance: '0.5 km',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
  },
  {
    id: 2,
    name: 'Priya Nair',
    specialization: 'Electrical Engineering',
    location: 'Ottapalam',
    distance: '15 km',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
  },
  {
    id: 3,
    name: 'Suresh Menon',
    specialization: 'Mechanical Engineering',
    location: 'Chittur',
    distance: '12 km',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=256',
  },
];

// Palakkad locations for autocomplete suggestions
const palakkadLocations = [
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

const SearchEngineers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Engineer[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call with the search query
    // For now, we'll just filter the mock data
    const results = engineersData.filter(engineer => 
      engineer.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 1) {
      // Filter locations for suggestions
      const filtered = palakkadLocations.filter(location => 
        location.toLowerCase().includes(value.toLowerCase())
      );
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
    const results = engineersData.filter(engineer => 
      engineer.location.toLowerCase().includes(suggestion.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="bg-engineering-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center">Find Engineers in Palakkad</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Search for engineering professionals in specific areas of Palakkad district.
          Our AI-powered search helps you connect with nearby engineers.
        </p>
        
        <div className="max-w-2xl mx-auto mb-12 relative">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Enter a location in Palakkad..."
                className="pl-10"
                value={searchQuery}
                onChange={handleInputChange}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 py-1">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-engineering-50 cursor-pointer text-left"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <MapPin className="inline-block mr-2 text-gray-400" size={16} />
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Search size={18} />
              <span>Search</span>
            </Button>
          </form>
        </div>
        
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(engineer => (
              <Card key={engineer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start p-4">
                    <img 
                      src={engineer.profileImage}
                      alt={engineer.name}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-medium text-lg">{engineer.name}</h3>
                      <p className="text-sm text-gray-600">{engineer.specialization}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <MapPin size={14} className="mr-1" />
                        {engineer.location} ({engineer.distance})
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 p-4">
                    <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {searchResults.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-600">No engineers found in "{searchQuery}". Try another location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchEngineers;
