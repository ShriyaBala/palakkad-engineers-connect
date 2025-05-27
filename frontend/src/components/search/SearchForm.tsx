
import React from 'react';
import { Search, MapPin, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchContext } from '@/contexts/SearchContext';
import SearchSuggestions from './SearchSuggestions';
import { specializations } from '@/contexts/SearchContext';

const SearchForm: React.FC = () => {
  const { 
    searchQuery, 
    handleInputChange, 
    handleSearch, 
    searchType,
    specializationFilter, 
    setSpecializationFilter,
    experienceFilter, 
    setExperienceFilter,
    resetFilters
  } = useSearchContext();

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
        <SearchSuggestions searchType={searchType} />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="w-full sm:w-1/2">
          <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Engineering Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
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
              <SelectItem value="any">Any Experience</SelectItem>
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
  );
};

export default SearchForm;
