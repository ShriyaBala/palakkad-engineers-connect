
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Store, Globe, Mail } from 'lucide-react';

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
  phone: string;
  email?: string;
  website?: string;
  mapLink?: string;
}

const sampleShops: Shop[] = [
  {
    id: 1,
    name: "Kerala Tiles Market",
    category: "Tiles",
    location: "Palakkad Town",
    phone: "+91 9876543210",
    email: "contact@keralatiles.com",
    website: "www.keralatiles.com",
    mapLink: "https://maps.google.com/?q=Palakkad+Town+Kerala+India"
  },
  {
    id: 2,
    name: "TechAutomation Store",
    category: "Automation",
    location: "Kanjikode",
    phone: "+91 9876543211",
    email: "info@techautomation.in",
    mapLink: "https://maps.google.com/?q=Kanjikode+Kerala+India"
  },
  {
    id: 3,
    name: "MetalCraft Shop",
    category: "Hardware",
    location: "Palakkad Town",
    phone: "+91 9876543212",
    email: "sales@metalcraftshop.com",
    website: "www.metalcraftshop.com",
    mapLink: "https://maps.google.com/?q=Palakkad+Town+Kerala+India"
  },
  {
    id: 4,
    name: "Palakkad Builders Mart",
    category: "Construction Materials",
    location: "Chittur",
    phone: "+91 9876543213",
    email: "info@buildersmart.co.in",
    mapLink: "https://maps.google.com/?q=Chittur+Kerala+India"
  },
  {
    id: 5,
    name: "SmartFactory Supplies",
    category: "Electronics",
    location: "Kanjikode",
    phone: "+91 9876543214",
    email: "contact@smartfactory.in",
    website: "www.smartfactory.in",
    mapLink: "https://maps.google.com/?q=Kanjikode+Kerala+India"
  },
  {
    id: 6,
    name: "DesignPro Studio",
    category: "Furniture",
    location: "Ottapalam",
    phone: "+91 9876543215",
    email: "hello@designprostudio.com",
    website: "www.designprostudio.com",
    mapLink: "https://maps.google.com/?q=Ottapalam+Kerala+India"
  },
  {
    id: 7,
    name: "Electrical World",
    category: "Electrical",
    location: "Shoranur",
    phone: "+91 9876543216",
    email: "sales@electricalworld.in",
    mapLink: "https://maps.google.com/?q=Shoranur+Kerala+India"
  },
  {
    id: 8,
    name: "Civil Construction Store",
    category: "Construction Materials",
    location: "Mannarkkad",
    phone: "+91 9876543217",
    email: "info@civilstore.com",
    website: "www.civilstore.com",
    mapLink: "https://maps.google.com/?q=Mannarkkad+Kerala+India"
  },
  {
    id: 9,
    name: "Green Energy Shop",
    category: "Electronics",
    location: "Pattambi",
    phone: "+91 9876543218",
    email: "connect@greenenergy.net",
    website: "www.greenenergy.net",
    mapLink: "https://maps.google.com/?q=Pattambi+Kerala+India"
  },
  {
    id: 10,
    name: "Modern Tiles Gallery",
    category: "Tiles",
    location: "Palakkad Town",
    phone: "+91 9876543219",
    email: "info@moderntilesgallery.com",
    mapLink: "https://maps.google.com/?q=Palakkad+Town+Kerala+India"
  },
  {
    id: 11,
    name: "Safety First Hardware",
    category: "Hardware",
    location: "Alathur",
    phone: "+91 9876543220",
    email: "contact@safetyhardware.in",
    mapLink: "https://maps.google.com/?q=Alathur+Kerala+India"
  },
  {
    id: 12,
    name: "Plumbing Solutions",
    category: "Plumbing",
    location: "Ottapalam",
    phone: "+91 9876543221",
    email: "info@plumbingsolutions.co.in",
    website: "www.plumbingsolutions.co.in",
    mapLink: "https://maps.google.com/?q=Ottapalam+Kerala+India"
  }
];

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
      results = results.filter(shop => 
        shop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
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

  // Open map link
  const openMapLink = (mapLink: string) => {
    window.open(mapLink, '_blank');
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Find Shops in Palakkad</h2>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Tabs defaultValue={searchTab} onValueChange={setSearchTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="location">Search by Location</TabsTrigger>
                <TabsTrigger value="category">Search by Category</TabsTrigger>
              </TabsList>
              
              <TabsContent value="location" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-3">
                    <Input 
                      placeholder="Search for shops by name..." 
                      value={searchTerm} 
                      onChange={handleInputChange} 
                      className="w-full"
                    />
                  </div>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {shopCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
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
                    <Input 
                      placeholder="Search for shops by name..." 
                      value={searchTerm} 
                      onChange={handleInputChange} 
                      className="w-full"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {shopCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
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
        
        {/* Simplified Search Results - showing only name and contact */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Found {searchResults.length} shops
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map(shop => (
              <Card key={shop.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-3">{shop.name}</h3>
                  
                  <div className="space-y-3">
                    <div 
                      className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors cursor-pointer"
                      onClick={() => shop.mapLink && openMapLink(shop.mapLink)}
                    >
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span className="underline">{shop.location}</span>
                    </div>

                    <a href={`tel:${shop.phone}`} className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors">
                      <Phone size={16} className="mr-2 flex-shrink-0" />
                      {shop.phone}
                    </a>
                    
                    {shop.email && (
                      <a href={`mailto:${shop.email}`} className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors">
                        <Mail size={16} className="mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{shop.email}</span>
                      </a>
                    )}
                    
                    {shop.website && (
                      <a href={`https://${shop.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors">
                        <Globe size={16} className="mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{shop.website}</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {searchResults.length === 0 && (
            <div className="text-center py-8">
              <Store className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-xl font-semibold text-gray-900">No shops found</p>
              <p className="mt-1 text-gray-500">Try changing your search filters</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopFinder;
