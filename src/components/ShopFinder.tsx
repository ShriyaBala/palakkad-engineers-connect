import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Store } from 'lucide-react';

// Shop categories for selection
const shopCategories = ["All Categories", "Tiles", "Electrical", "Plumbing", "Hardware", "Paint", "Furniture", "Construction Materials", "Home Appliances", "Electronics", "Automation"];

// Locations for selection
const locations = ["All Locations", "Palakkad Town", "Kanjikode", "Ottapalam", "Chittur", "Mannarkkad", "Shoranur", "Pattambi", "Alathur"];

// Sample shop data
interface Shop {
  id: number;
  name: string;
  category: string;
  location: string;
  address: string;
  phone: string;
  description?: string;
}
const sampleShops: Shop[] = [{
  id: 1,
  name: "Kerala Tiles Market",
  category: "Tiles",
  location: "Palakkad Town",
  address: "KP Road, Near Bus Stand",
  phone: "+91 9876543210",
  description: "Wide variety of imported and local tiles."
}, {
  id: 2,
  name: "TechAutomation Store",
  category: "Automation",
  location: "Kanjikode",
  address: "Industrial Area, Phase 2",
  phone: "+91 9876543211",
  description: "Smart home and industrial automation solutions."
}, {
  id: 3,
  name: "MetalCraft Shop",
  category: "Hardware",
  location: "Palakkad Town",
  address: "Market Road, Near Temple",
  phone: "+91 9876543212",
  description: "Quality metal fabrication supplies and tools."
}, {
  id: 4,
  name: "Palakkad Builders Mart",
  category: "Construction Materials",
  location: "Chittur",
  address: "Main Highway, Near Petrol Pump",
  phone: "+91 9876543213",
  description: "One-stop shop for all construction needs."
}, {
  id: 5,
  name: "SmartFactory Supplies",
  category: "Electronics",
  location: "Kanjikode",
  address: "Tech Park Road",
  phone: "+91 9876543214",
  description: "Industrial electronics and components."
}, {
  id: 6,
  name: "DesignPro Studio",
  category: "Furniture",
  location: "Ottapalam",
  address: "College Road, Near Hospital",
  phone: "+91 9876543215",
  description: "Custom furniture design and manufacturing."
}, {
  id: 7,
  name: "Electrical World",
  category: "Electrical",
  location: "Shoranur",
  address: "Railway Station Road",
  phone: "+91 9876543216",
  description: "Complete range of electrical supplies."
}, {
  id: 8,
  name: "Civil Construction Store",
  category: "Construction Materials",
  location: "Mannarkkad",
  address: "Main Road, Near Bus Stand",
  phone: "+91 9876543217",
  description: "Quality construction materials at competitive prices."
}, {
  id: 9,
  name: "Green Energy Shop",
  category: "Electronics",
  location: "Pattambi",
  address: "College Junction",
  phone: "+91 9876543218",
  description: "Solar panels and renewable energy solutions."
}];
const ShopFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchTab, setSearchTab] = useState('location');
  const [searchResults, setSearchResults] = useState<Shop[]>(sampleShops);

  // Handle search
  const handleSearch = () => {
    let results = sampleShops;

    // Filter by search term if provided
    if (searchTerm.trim() !== '') {
      results = results.filter(shop => shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || shop.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by category if not "All Categories"
    if (selectedCategory !== 'All Categories') {
      results = results.filter(shop => shop.category === selectedCategory);
    }

    // Filter by location if not "All Locations"
    if (selectedLocation !== 'All Locations') {
      results = results.filter(shop => shop.location === selectedLocation);
    }
    setSearchResults(results);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSearchResults(sampleShops);
  };
  return <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Find Shops in Palakkad</h2>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Tabs defaultValue={searchTab} onValueChange={setSearchTab} className="w-full">
              
              
              <TabsContent value="location" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-3">
                    <Input placeholder="Search for shops..." value={searchTerm} onChange={handleInputChange} className="w-full" />
                  </div>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {shopCategories.map(category => <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-2">
                    <Button onClick={handleSearch} className="flex-1">Search</Button>
                    <Button variant="outline" onClick={clearFilters}>Clear</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="category" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-3">
                    <Input placeholder="Search for shops..." value={searchTerm} onChange={handleInputChange} className="w-full" />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {shopCategories.map(category => <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-2">
                    <Button onClick={handleSearch} className="flex-1">Search</Button>
                    <Button variant="outline" onClick={clearFilters}>Clear</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Search Results */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Found {searchResults.length} shops
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map(shop => <Card key={shop.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{shop.name}</h3>
                    <Badge>{shop.category}</Badge>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-2 text-engineering-600" />
                    <span>{shop.location}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    {shop.address}
                  </div>
                  
                  <a href={`tel:${shop.phone}`} className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors font-medium">
                    <Phone size={16} className="mr-2" />
                    {shop.phone}
                  </a>
                  
                  {shop.description && <p className="mt-2 text-sm text-gray-600">{shop.description}</p>}
                </CardContent>
              </Card>)}
          </div>
          
          {searchResults.length === 0 && <div className="text-center py-8">
              <Store className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-xl font-semibold text-gray-900">No shops found</p>
              <p className="mt-1 text-gray-500">Try changing your search filters</p>
            </div>}
        </div>
      </div>
    </section>;
};
export default ShopFinder;