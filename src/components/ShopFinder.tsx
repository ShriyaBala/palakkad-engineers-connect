
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Store, Building, Mail } from 'lucide-react';

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
  email?: string;
  website?: string;
  imageUrl?: string;
  specialOffer?: string;
  rating?: number;
}

const sampleShops: Shop[] = [
  {
    id: 1,
    name: "Kerala Tiles Market",
    category: "Tiles",
    location: "Palakkad Town",
    address: "KP Road, Near Bus Stand",
    phone: "+91 9876543210",
    description: "Wide variety of imported and local tiles. Best prices guaranteed!",
    email: "keralatiles@example.com",
    website: "www.keralatiles.com",
    imageUrl: "https://images.unsplash.com/photo-1525896544042-354764aa27e6?auto=format&fit=crop&q=80&w=1200",
    specialOffer: "20% off on all imported tiles",
    rating: 4.5
  },
  {
    id: 2,
    name: "TechAutomation Store",
    category: "Automation",
    location: "Kanjikode",
    address: "Industrial Area, Phase 2",
    phone: "+91 9876543211",
    description: "Smart home and industrial automation solutions.",
    email: "techautomation@example.com",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    rating: 4.2
  },
  {
    id: 3,
    name: "MetalCraft Shop",
    category: "Hardware",
    location: "Palakkad Town",
    address: "Market Road, Near Temple",
    phone: "+91 9876543212",
    description: "Quality metal fabrication supplies and tools.",
    website: "www.metalcraftshop.com",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    specialOffer: "Buy tools worth ₹5000 and get a free toolbox",
    rating: 4.0
  },
  {
    id: 4,
    name: "Palakkad Builders Mart",
    category: "Construction Materials",
    location: "Chittur",
    address: "Main Highway, Near Petrol Pump",
    phone: "+91 9876543213",
    description: "One-stop shop for all construction needs.",
    email: "info@palakkadbuilders.com",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200",
    rating: 4.7
  },
  {
    id: 5,
    name: "SmartFactory Supplies",
    category: "Electronics",
    location: "Kanjikode",
    address: "Tech Park Road",
    phone: "+91 9876543214",
    description: "Industrial electronics and components.",
    email: "contact@smartfactory.in",
    website: "www.smartfactory.in",
    imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200",
    specialOffer: "Free installation on purchases above ₹10,000",
    rating: 3.9
  },
  {
    id: 6,
    name: "DesignPro Studio",
    category: "Furniture",
    location: "Ottapalam",
    address: "College Road, Near Hospital",
    phone: "+91 9876543215",
    description: "Custom furniture design and manufacturing.",
    website: "www.designprostudio.com",
    imageUrl: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80&w=1200",
    rating: 4.8
  },
  {
    id: 7,
    name: "Electrical World",
    category: "Electrical",
    location: "Shoranur",
    address: "Railway Station Road",
    phone: "+91 9876543216",
    description: "Complete range of electrical supplies.",
    email: "sales@electricalworld.co.in",
    imageUrl: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?auto=format&fit=crop&q=80&w=1200",
    specialOffer: "Special discount on LED lighting",
    rating: 4.1
  },
  {
    id: 8,
    name: "Civil Construction Store",
    category: "Construction Materials",
    location: "Mannarkkad",
    address: "Main Road, Near Bus Stand",
    phone: "+91 9876543217",
    description: "Quality construction materials at competitive prices.",
    email: "info@civilstore.com",
    website: "www.civilstore.com",
    imageUrl: "https://images.unsplash.com/photo-1576942473043-a7f6eefa4a9f?auto=format&fit=crop&q=80&w=1200",
    rating: 4.3
  },
  {
    id: 9,
    name: "Green Energy Shop",
    category: "Electronics",
    location: "Pattambi",
    address: "College Junction",
    phone: "+91 9876543218",
    description: "Solar panels and renewable energy solutions.",
    website: "www.greenenergy.net",
    imageUrl: "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=1200",
    specialOffer: "Government subsidy available on solar installations",
    rating: 4.6
  },
  {
    id: 10,
    name: "Modern Tiles Gallery",
    category: "Tiles",
    location: "Palakkad Town",
    address: "Shopping Complex, 2nd Floor",
    phone: "+91 9876543219",
    description: "Premium collection of designer tiles for all spaces.",
    email: "moderntilespalakkad@gmail.com",
    imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1200",
    specialOffer: "Free design consultation",
    rating: 4.4
  },
  {
    id: 11,
    name: "Safety First Hardware",
    category: "Hardware",
    location: "Alathur",
    address: "Main Market Road",
    phone: "+91 9876543220",
    description: "All kinds of hardware, locks, and safety equipment.",
    email: "safetyfirst@yahoo.com",
    imageUrl: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?auto=format&fit=crop&q=80&w=1200",
    specialOffer: "50% off on second lock purchase",
    rating: 4.2
  },
  {
    id: 12,
    name: "Plumbing Solutions",
    category: "Plumbing",
    location: "Ottapalam",
    address: "Near Post Office",
    phone: "+91 9876543221",
    description: "Complete range of plumbing supplies and fixtures.",
    website: "www.plumbingsolutions.co.in",
    imageUrl: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=1200",
    rating: 3.9
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
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        shop.description?.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Render stars based on rating
  const renderRating = (rating?: number) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center mt-1">
        {Array(5).fill(0).map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < fullStars ? 'text-yellow-400' : i === fullStars && hasHalfStar ? 'text-yellow-400' : 'text-gray-300'}`} 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-500">{rating.toFixed(1)}</span>
      </div>
    );
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
        
        {/* Search Results */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Found {searchResults.length} shops
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(shop => (
              <Card key={shop.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                {shop.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" />
                    {shop.specialOffer && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm rounded-bl-md">
                        {shop.specialOffer}
                      </div>
                    )}
                  </div>
                )}
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{shop.name}</h3>
                    <Badge>{shop.category}</Badge>
                  </div>
                  
                  {renderRating(shop.rating)}
                  
                  <div className="flex items-center text-gray-600 mb-2 mt-2">
                    <MapPin size={16} className="mr-2 text-engineering-600 flex-shrink-0" />
                    <span>{shop.location}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3 flex items-start">
                    <Building size={16} className="mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{shop.address}</span>
                  </div>
                  
                  <div className="space-y-2 mt-auto">
                    {shop.phone && (
                      <a href={`tel:${shop.phone}`} className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors font-medium">
                        <Phone size={16} className="mr-2 flex-shrink-0" />
                        {shop.phone}
                      </a>
                    )}
                    
                    {shop.email && (
                      <a href={`mailto:${shop.email}`} className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors">
                        <Mail size={16} className="mr-2 flex-shrink-0" />
                        {shop.email}
                      </a>
                    )}
                    
                    {shop.website && (
                      <a href={`https://${shop.website}`} target="_blank" rel="noopener noreferrer" className="text-engineering-600 hover:text-engineering-800 transition-colors underline text-sm">
                        {shop.website}
                      </a>
                    )}
                  </div>
                  
                  {shop.description && <p className="mt-3 text-sm text-gray-600">{shop.description}</p>}
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
