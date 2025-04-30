
import React, { useState, useEffect } from 'react';
import { Search, MapPin, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Engineer {
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
const engineersData: Engineer[] = [
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

// Engineering specializations
const specializations = [
  'Civil Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Computer Science',
  'Environmental Engineering',
  'Structural Engineering',
  'Chemical Engineering',
  'Aerospace Engineering',
];

const EnhancedSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Engineer[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchType, setSearchType] = useState<'location' | 'name' | 'occupation'>('location');
  const [specializationFilter, setSpecializationFilter] = useState<string>('');
  const [experienceFilter, setExperienceFilter] = useState<string>('');
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
    if (specializationFilter) {
      results = results.filter(engineer => 
        engineer.specialization === specializationFilter
      );
    }
    
    // Apply experience filter
    if (experienceFilter) {
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
    setSpecializationFilter('');
    setExperienceFilter('');
    setHasSearched(false);
    setSearchResults([]);
  };
  
  const getSearchIcon = () => {
    switch(searchType) {
      case 'location': return <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />;
      case 'name': return <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />;
      case 'occupation': return <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />;
      default: return <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />;
    }
  };

  const getSearchPlaceholder = () => {
    switch(searchType) {
      case 'location': return 'Enter a location in Palakkad...';
      case 'name': return 'Enter engineer name...';
      case 'occupation': return 'Enter occupation or role...';
      default: return 'Search...';
    }
  };

  return (
    <div className="bg-engineering-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center">Find Engineers in Palakkad</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Search for engineering professionals by location, name, or occupation.
          Our AI-powered search helps marketers connect with engineers in the Palakkad region.
        </p>
        
        <Tabs defaultValue="location" className="max-w-2xl mx-auto mb-8" onValueChange={(value) => setSearchType(value as 'location' | 'name' | 'occupation')}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="location">By Location</TabsTrigger>
            <TabsTrigger value="name">By Name</TabsTrigger>
            <TabsTrigger value="occupation">By Occupation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="location">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="relative flex-1">
                {getSearchIcon()}
                <Input
                  type="text"
                  placeholder={getSearchPlaceholder()}
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
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="w-full sm:w-1/2">
                  <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Engineering Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specializations</SelectItem>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-1/2">
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Minimum Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Experience</SelectItem>
                      <SelectItem value="1">1+ Years</SelectItem>
                      <SelectItem value="3">3+ Years</SelectItem>
                      <SelectItem value="5">5+ Years</SelectItem>
                      <SelectItem value="10">10+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 sm:flex-none flex items-center gap-2">
                  <Search size={18} />
                  <span>Search</span>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetFilters} 
                  className="flex-1 sm:flex-none"
                >
                  Reset
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="name">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="relative flex-1">
                {getSearchIcon()}
                <Input
                  type="text"
                  placeholder={getSearchPlaceholder()}
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
                        <User className="inline-block mr-2 text-gray-400" size={16} />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="w-full sm:w-1/2">
                  <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Engineering Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specializations</SelectItem>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-1/2">
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Minimum Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Experience</SelectItem>
                      <SelectItem value="1">1+ Years</SelectItem>
                      <SelectItem value="3">3+ Years</SelectItem>
                      <SelectItem value="5">5+ Years</SelectItem>
                      <SelectItem value="10">10+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 sm:flex-none flex items-center gap-2">
                  <Search size={18} />
                  <span>Search</span>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetFilters} 
                  className="flex-1 sm:flex-none"
                >
                  Reset
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="occupation">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="relative flex-1">
                {getSearchIcon()}
                <Input
                  type="text"
                  placeholder={getSearchPlaceholder()}
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
                        <Briefcase className="inline-block mr-2 text-gray-400" size={16} />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="w-full sm:w-1/2">
                  <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Engineering Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specializations</SelectItem>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-1/2">
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Minimum Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Experience</SelectItem>
                      <SelectItem value="1">1+ Years</SelectItem>
                      <SelectItem value="3">3+ Years</SelectItem>
                      <SelectItem value="5">5+ Years</SelectItem>
                      <SelectItem value="10">10+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 sm:flex-none flex items-center gap-2">
                  <Search size={18} />
                  <span>Search</span>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetFilters} 
                  className="flex-1 sm:flex-none"
                >
                  Reset
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
        
        {hasSearched && searchResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Search Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(engineer => (
                <Card key={engineer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start p-4">
                      <div className="relative">
                        <img 
                          src={engineer.profileImage}
                          alt={engineer.name}
                          className="w-16 h-16 object-cover rounded-full mr-4"
                        />
                        {engineer.verified && (
                          <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{engineer.name}</h3>
                        <p className="text-sm text-gray-600">{engineer.specialization}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <MapPin size={14} className="mr-1" />
                          {engineer.location} ({engineer.distance})
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Briefcase size={14} className="mr-1" />
                          {engineer.occupation} • {engineer.experience} years
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-2 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {engineer.skills?.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-engineering-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 p-4 flex justify-between items-center">
                      <div className="text-sm">
                        {engineer.contactDetails?.email && (
                          <a href={`mailto:${engineer.contactDetails.email}`} className="text-engineering-600 hover:underline">
                            Contact
                          </a>
                        )}
                      </div>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {hasSearched && searchResults.length === 0 && (
          <div className="text-center py-8 mt-4">
            <p className="text-gray-600">No engineers found matching your criteria. Try different search terms or filters.</p>
          </div>
        )}
        
        {!hasSearched && (
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
        )}
      </div>
    </div>
  );
};

export default EnhancedSearch;
