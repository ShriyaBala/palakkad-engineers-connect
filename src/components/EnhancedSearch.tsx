
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchProvider, useSearchContext } from '@/contexts/SearchContext';
import SearchForm from './search/SearchForm';
import SearchResults from './search/SearchResults';
import SearchInfo from './search/SearchInfo';

const SearchTabs = () => {
  const { searchType, setSearchType } = useSearchContext();

  return (
    <Tabs 
      defaultValue={searchType} 
      className="max-w-2xl mx-auto mb-8" 
      onValueChange={(value) => setSearchType(value as 'location' | 'name' | 'occupation')}
    >
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="location">By Location</TabsTrigger>
        <TabsTrigger value="name">By Name</TabsTrigger>
        <TabsTrigger value="occupation">By Occupation</TabsTrigger>
      </TabsList>
      
      <TabsContent value="location">
        <SearchForm />
      </TabsContent>
      
      <TabsContent value="name">
        <SearchForm />
      </TabsContent>
      
      <TabsContent value="occupation">
        <SearchForm />
      </TabsContent>
    </Tabs>
  );
};

const EnhancedSearch: React.FC = () => {
  return (
    <div className="bg-engineering-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center">Find Engineers in Palakkad</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Search for engineering professionals by location, name, or occupation.
          Our AI-powered search helps marketers connect with engineers in the Palakkad region.
        </p>
        
        <SearchProvider>
          <SearchTabs />
          <SearchResults />
          <SearchInfo />
        </SearchProvider>
      </div>
    </div>
  );
};

export default EnhancedSearch;
