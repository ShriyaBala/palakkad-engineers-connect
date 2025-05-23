import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, FileText, Video, Mail, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface Marketer {
  id: number;
  name: string;
  phoneNumber: string;
  type: 'video' | 'pdf' | 'basic';
  mediaUrl?: string;
  industry?: string;
  priority: number;
  description?: string;
  email?: string;
  website?: string;
  location?: string;
  specialOffer?: string;
}
const marketers: Marketer[] = [{
  id: 1,
  name: 'Kerala Tiles Market',
  phoneNumber: '+91 9876543210',
  type: 'pdf',
  mediaUrl: 'https://images.unsplash.com/photo-1525896544042-354764aa27e6?auto=format&fit=crop&q=80&w=1200',
  industry: 'Tiles',
  priority: 10,
  description: 'Premium quality tiles imported from Italy, Spain and local manufacturers. Best prices guaranteed!',
  email: 'keralatiles@example.com',
  website: 'www.keralatiles.com',
  location: 'Palakkad Town, Near Bus Stand',
  specialOffer: '20% off on all imported tiles'
}, {
  id: 2,
  name: 'TechAutomation India',
  phoneNumber: '+91 9876543211',
  type: 'pdf',
  mediaUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200',
  industry: 'Automation',
  priority: 9,
  description: 'Smart home and industrial automation solutions. Full installation service available.',
  email: 'techautomation@example.com',
  website: 'www.techautomation.in',
  location: 'Kanjikode Industrial Area',
  specialOffer: 'Free installation on purchases above ₹15,000'
}, {
  id: 3,
  name: 'MetalCraft Industries',
  phoneNumber: '+91 9876543212',
  type: 'pdf',
  mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
  industry: 'Metal',
  priority: 7,
  description: 'Quality metal fabrication and custom metalwork solutions for residential and commercial projects.',
  email: 'info@metalcraft.co.in',
  location: 'Palakkad Town, Market Road'
}, {
  id: 4,
  name: 'Palakkad Builders',
  phoneNumber: '+91 9876543213',
  type: 'pdf',
  mediaUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200',
  industry: 'Real Estate',
  priority: 6,
  description: 'Trusted builders with over 15 years of experience in residential and commercial construction.',
  website: 'www.palakkadbuilders.com',
  location: 'Chittur, Main Highway'
}, {
  id: 5,
  name: 'SmartFactory Solutions',
  phoneNumber: '+91 9876543214',
  type: 'pdf',
  mediaUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200',
  industry: 'Manufacturing',
  priority: 8,
  description: 'Advanced factory automation systems and solutions for increased productivity.',
  email: 'contact@smartfactory.in',
  website: 'www.smartfactory.in',
  location: 'Kanjikode, Tech Park Road',
  specialOffer: 'Industrial IoT solutions at special rates'
}, {
  id: 6,
  name: 'DesignPro Architects',
  phoneNumber: '+91 9876543215',
  type: 'pdf',
  mediaUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80&w=1200',
  industry: 'Architecture',
  priority: 5,
  description: 'Award-winning architectural services for residential and commercial projects.',
  email: 'designs@designpro.com',
  location: 'Ottapalam, College Road'
}];
interface MarketersShowcaseProps {
  title?: string;
}
const MarketersShowcase: React.FC<MarketersShowcaseProps> = ({
  title = "Our Marketing Partners"
}) => {
  // Sort marketers by priority (highest first)
  const sortedMarketers = [...marketers].sort((a, b) => b.priority - a.priority);
  return <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {title && <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>}
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="lg:w-1/2">
            {/* First page of the book */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform -rotate-1 mb-6">
              <div className="h-6 bg-engineering-600"></div>
              <div className="p-6 mx-[4px] my-px px-[29px] py-[27px] rounded-none">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-2xl font-bold">{sortedMarketers[0].name}</h3>
                  <Badge className="mt-2">{sortedMarketers[0].industry}</Badge>
                </div>
                
                <div className="relative">
                  <img src={sortedMarketers[0].mediaUrl} alt={sortedMarketers[0].name} className="w-full h-48 object-cover mb-4 rounded-md" />
                  {sortedMarketers[0].specialOffer && <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-6">
                      {sortedMarketers[0].specialOffer}
                    </div>}
                </div>
                
                <p className="text-gray-700 mb-4">{sortedMarketers[0].description}</p>
                
                <div className="grid grid-cols-1 gap-2 mb-4 border-t border-gray-100 pt-4">
                  <div className="flex items-start">
                    <MapPin size={18} className="mr-2 text-engineering-600 flex-shrink-0 mt-1" />
                    <span>{sortedMarketers[0].location}</span>
                  </div>
                  <a href={`tel:${sortedMarketers[0].phoneNumber}`} className="flex items-center text-engineering-600 hover:text-engineering-800">
                    <Phone size={18} className="mr-2" />
                    <span>{sortedMarketers[0].phoneNumber}</span>
                  </a>
                  {sortedMarketers[0].email && <a href={`mailto:${sortedMarketers[0].email}`} className="flex items-center text-engineering-600 hover:text-engineering-800">
                      <Mail size={18} className="mr-2" />
                      <span>{sortedMarketers[0].email}</span>
                    </a>}
                  {sortedMarketers[0].website && <a href={`https://${sortedMarketers[0].website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-engineering-600 hover:text-engineering-800">
                      <Globe size={18} className="mr-2" />
                      <span>{sortedMarketers[0].website}</span>
                    </a>}
                </div>
                
                <div className="text-right text-sm text-gray-500">Page 1</div>
              </div>
            </div>
            
            {/* Third page */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform rotate-1 mt-6">
              <div className="h-6 bg-engineering-600"></div>
              <div className="p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-2xl font-bold">{sortedMarketers[2].name}</h3>
                  <Badge className="mt-2">{sortedMarketers[2].industry}</Badge>
                </div>
                
                <div className="relative">
                  <img src={sortedMarketers[2].mediaUrl} alt={sortedMarketers[2].name} className="w-full h-48 object-cover mb-4 rounded-md" />
                  {sortedMarketers[2].specialOffer && <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-6">
                      {sortedMarketers[2].specialOffer}
                    </div>}
                </div>
                
                <p className="text-gray-700 mb-4">{sortedMarketers[2].description}</p>
                
                <div className="grid grid-cols-1 gap-2 mb-4 border-t border-gray-100 pt-4">
                  <div className="flex items-start">
                    <MapPin size={18} className="mr-2 text-engineering-600 flex-shrink-0 mt-1" />
                    <span>{sortedMarketers[2].location}</span>
                  </div>
                  <a href={`tel:${sortedMarketers[2].phoneNumber}`} className="flex items-center text-engineering-600 hover:text-engineering-800">
                    <Phone size={18} className="mr-2" />
                    <span>{sortedMarketers[2].phoneNumber}</span>
                  </a>
                  {sortedMarketers[2].email && <a href={`mailto:${sortedMarketers[2].email}`} className="flex items-center text-engineering-600 hover:text-engineering-800">
                      <Mail size={18} className="mr-2" />
                      <span>{sortedMarketers[2].email}</span>
                    </a>}
                  {sortedMarketers[2].website && <a href={`https://${sortedMarketers[2].website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-engineering-600 hover:text-engineering-800">
                      <Globe size={18} className="mr-2" />
                      <span>{sortedMarketers[2].website}</span>
                    </a>}
                </div>
                
                <div className="text-right text-sm text-gray-500">Page 3</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            {/* Second page */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform rotate-1 mb-6">
              <div className="h-6 bg-engineering-600"></div>
              <div className="p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-2xl font-bold">{sortedMarketers[1].name}</h3>
                  <Badge className="mt-2">{sortedMarketers[1].industry}</Badge>
                </div>
                
                <div className="relative">
                  <img src={sortedMarketers[1].mediaUrl} alt={sortedMarketers[1].name} className="w-full h-48 object-cover mb-4 rounded-md" />
                  {sortedMarketers[1].specialOffer && <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-6">
                      {sortedMarketers[1].specialOffer}
                    </div>}
                </div>
                
                <p className="text-gray-700 mb-4">{sortedMarketers[1].description}</p>
                
                <div className="grid grid-cols-1 gap-2 mb-4 border-t border-gray-100 pt-4">
                  <div className="flex items-start">
                    <MapPin size={18} className="mr-2 text-engineering-600 flex-shrink-0 mt-1" />
                    <span>{sortedMarketers[1].location}</span>
                  </div>
                  <a href={`tel:${sortedMarketers[1].phoneNumber}`} className="flex items-center text-engineering-600 hover:text-engineering-800">
                    <Phone size={18} className="mr-2" />
                    <span>{sortedMarketers[1].phoneNumber}</span>
                  </a>
                  {sortedMarketers[1].email && <a href={`mailto:${sortedMarketers[1].email}`} className="flex items-center text-engineering-600 hover:text-engineering-800">
                      <Mail size={18} className="mr-2" />
                      <span>{sortedMarketers[1].email}</span>
                    </a>}
                  {sortedMarketers[1].website && <a href={`https://${sortedMarketers[1].website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-engineering-600 hover:text-engineering-800">
                      <Globe size={18} className="mr-2" />
                      <span>{sortedMarketers[1].website}</span>
                    </a>}
                </div>
                
                <div className="text-right text-sm text-gray-500">Page 2</div>
              </div>
            </div>
            
            {/* Fourth page */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform -rotate-1 mt-6">
              <div className="h-6 bg-engineering-600"></div>
              <div className="p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-2xl font-bold">{sortedMarketers[3].name}</h3>
                  <Badge className="mt-2">{sortedMarketers[3].industry}</Badge>
                </div>
                
                <div className="relative">
                  <img src={sortedMarketers[3].mediaUrl} alt={sortedMarketers[3].name} className="w-full h-48 object-cover mb-4 rounded-md" />
                  {sortedMarketers[3].specialOffer && <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-6">
                      {sortedMarketers[3].specialOffer}
                    </div>}
                </div>
                
                <p className="text-gray-700 mb-4">{sortedMarketers[3].description}</p>
                
                <div className="grid grid-cols-1 gap-2 mb-4 border-t border-gray-100 pt-4">
                  <div className="flex items-start">
                    <MapPin size={18} className="mr-2 text-engineering-600 flex-shrink-0 mt-1" />
                    <span>{sortedMarketers[3].location}</span>
                  </div>
                  <a href={`tel:${sortedMarketers[3].phoneNumber}`} className="flex items-center text-engineering-600 hover:text-engineering-800">
                    <Phone size={18} className="mr-2" />
                    <span>{sortedMarketers[3].phoneNumber}</span>
                  </a>
                  {sortedMarketers[3].email && <a href={`mailto:${sortedMarketers[3].email}`} className="flex items-center text-engineering-600 hover:text-engineering-800">
                      <Mail size={18} className="mr-2" />
                      <span>{sortedMarketers[3].email}</span>
                    </a>}
                  {sortedMarketers[3].website && <a href={`https://${sortedMarketers[3].website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-engineering-600 hover:text-engineering-800">
                      <Globe size={18} className="mr-2" />
                      <span>{sortedMarketers[3].website}</span>
                    </a>}
                </div>
                
                <div className="text-right text-sm text-gray-500">Page 4</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          
        </div>
      </div>
    </section>;
};
export default MarketersShowcase;