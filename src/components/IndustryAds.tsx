
import React from 'react';
import { Building, Hammer, Construction, Truck, Factory, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import EnhancedAdvertisements from './EnhancedAdvertisements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IndustryAds: React.FC = () => {
  const industries = [
    { id: 'all', name: 'All Industries', icon: <Building className="w-5 h-5" /> },
    { id: 'Tiles', name: 'Tiles Market', icon: <Palette className="w-5 h-5" /> },
    { id: 'Metal', name: 'Metal Industry', icon: <Hammer className="w-5 h-5" /> },
    { id: 'Construction', name: 'Construction', icon: <Construction className="w-5 h-5" /> },
    { id: 'Real Estate', name: 'Real Estate', icon: <Building className="w-5 h-5" /> },
    { id: 'Manufacturing', name: 'Manufacturing', icon: <Factory className="w-5 h-5" /> },
    { id: 'Logistics', name: 'Logistics', icon: <Truck className="w-5 h-5" /> },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mb-8">Industry Advertisements</h2>
        
        <Tabs defaultValue="all" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-2">
              {industries.map((industry) => (
                <TabsTrigger 
                  key={industry.id} 
                  value={industry.id}
                  className="flex items-center gap-2"
                >
                  {industry.icon}
                  <span className="hidden md:inline">{industry.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <EnhancedAdvertisements title="All Industry Advertisements" />
          </TabsContent>
          
          {industries.slice(1).map((industry) => (
            <TabsContent key={industry.id} value={industry.id}>
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <EnhancedAdvertisements 
                    title={`${industry.name} Advertisements`} 
                    filter={industry.id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default IndustryAds;
