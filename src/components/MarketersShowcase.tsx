
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, FileText, Video, Mail, Globe, MapPin } from 'lucide-react';

interface Marketer {
  id: number;
  name: string;
  phoneNumber: string;
  type: 'video' | 'pdf' | 'basic';
  mediaUrl?: string;
  industry?: string;
  priority: number; // Higher number means higher priority
  description?: string;
  email?: string;
  website?: string;
  location?: string;
  specialOffer?: string;
}

const marketers: Marketer[] = [
  {
    id: 1,
    name: 'Kerala Tiles Market',
    phoneNumber: '+91 9876543210',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1525896544042-354764aa27e6?auto=format&fit=crop&q=80&w=1200',
    industry: 'Tiles',
    priority: 10,
    description: 'Premium quality tiles imported from Italy, Spain and local manufacturers. Best prices guaranteed!',
    email: 'keralatiles@example.com',
    website: 'www.keralatiles.com',
    location: 'Palakkad Town, Near Bus Stand',
    specialOffer: '20% off on all imported tiles'
  },
  {
    id: 2,
    name: 'TechAutomation India',
    phoneNumber: '+91 9876543211',
    type: 'video',
    mediaUrl: '/videos/857262-hd_1920_1080_24fps.mp4',
    industry: 'Automation',
    priority: 9,
    description: 'Smart home and industrial automation solutions. Full installation service available.',
    email: 'techautomation@example.com',
    website: 'www.techautomation.in',
    location: 'Kanjikode Industrial Area',
    specialOffer: 'Free installation on purchases above ₹15,000'
  },
  {
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
  },
  {
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
  },
  {
    id: 5,
    name: 'SmartFactory Solutions',
    phoneNumber: '+91 9876543214',
    type: 'video',
    mediaUrl: '/videos/4017225-uhd_3840_2160_30fps.mp4',
    industry: 'Manufacturing',
    priority: 8,
    description: 'Advanced factory automation systems and solutions for increased productivity.',
    email: 'contact@smartfactory.in',
    website: 'www.smartfactory.in',
    location: 'Kanjikode, Tech Park Road',
    specialOffer: 'Industrial IoT solutions at special rates'
  },
  {
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
  },
  {
    id: 7,
    name: 'Electrical Engineers Association',
    phoneNumber: '+91 9876543216',
    type: 'basic',
    industry: 'Electrical',
    priority: 3,
    description: 'Professional network of certified electrical engineers in Palakkad.',
    location: 'Shoranur'
  },
  {
    id: 8,
    name: 'Civil Construction Solutions',
    phoneNumber: '+91 9876543217',
    type: 'basic',
    industry: 'Civil',
    priority: 2,
    location: 'Mannarkkad'
  },
  {
    id: 9,
    name: 'Green Energy Systems',
    phoneNumber: '+91 9876543218',
    type: 'basic',
    industry: 'Energy',
    priority: 1,
    location: 'Pattambi'
  }
];

interface MarketersShowcaseProps {
  title?: string;
}

const MarketersShowcase: React.FC<MarketersShowcaseProps> = ({
  title = "Our Marketing Partners"
}) => {
  // Sort marketers by priority (highest first)
  const sortedMarketers = [...marketers].sort((a, b) => b.priority - a.priority);

  // Separate marketers by type for vertical display
  const premiumMarketers = sortedMarketers.filter(m => m.type === 'video');
  const standardMarketers = sortedMarketers.filter(m => m.type === 'pdf');
  const basicMarketers = sortedMarketers.filter(m => m.type === 'basic');

  const getTypeDetails = (type: string) => {
    switch (type) {
      case 'video':
        return {
          label: 'Premium',
          icon: <Video size={16} className="mr-2 text-yellow-500" />,
          badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-300'
        };
      case 'pdf':
        return {
          label: 'Standard',
          icon: <FileText size={16} className="mr-2 text-blue-500" />,
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-300'
        };
      default:
        return {
          label: 'Basic',
          icon: <Phone size={16} className="mr-2 text-gray-500" />,
          badgeClass: 'bg-gray-100 text-gray-800 border-gray-300'
        };
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {title && <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>}
        
        {/* Premium/Video Marketers - Displayed vertically with larger cards */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-6 text-engineering-700">Premium Advertisers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumMarketers.map(marketer => {
              const typeDetails = getTypeDetails(marketer.type);
              return (
                <Card key={marketer.id} className="overflow-hidden border-2 border-yellow-400 shadow-lg">
                  <div className="relative h-64">
                    {marketer.mediaUrl && marketer.mediaUrl.endsWith('.mp4') ? (
                      <video src={marketer.mediaUrl} className="w-full h-full object-cover" autoPlay muted loop />
                    ) : (
                      <img src={marketer.mediaUrl} alt={marketer.name} className="w-full h-full object-cover" />
                    )}
                    <Badge className={`absolute top-2 right-2 ${typeDetails.badgeClass}`}>
                      {typeDetails.label}
                    </Badge>
                    {marketer.specialOffer && (
                      <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white p-2 text-sm font-semibold text-center">
                        {marketer.specialOffer}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{marketer.name}</h3>
                    </div>
                    {marketer.industry && (
                      <Badge variant="outline" className="mb-3">
                        {marketer.industry}
                      </Badge>
                    )}
                    
                    {marketer.description && (
                      <p className="text-gray-600 mb-3 text-sm">{marketer.description}</p>
                    )}
                    
                    <div className="space-y-2">
                      {marketer.location && (
                        <div className="flex items-start text-gray-600">
                          <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{marketer.location}</span>
                        </div>
                      )}
                      
                      <a href={`tel:${marketer.phoneNumber}`} className="flex items-center text-engineering-600 font-medium hover:text-engineering-800 transition-colors">
                        <Phone size={16} className="mr-2 flex-shrink-0" />
                        <span>{marketer.phoneNumber}</span>
                      </a>
                      
                      {marketer.email && (
                        <a href={`mailto:${marketer.email}`} className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors">
                          <Mail size={16} className="mr-2 flex-shrink-0" />
                          <span className="text-sm">{marketer.email}</span>
                        </a>
                      )}
                      
                      {marketer.website && (
                        <a href={`https://${marketer.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors">
                          <Globe size={16} className="mr-2 flex-shrink-0" />
                          <span className="text-sm">{marketer.website}</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Standard/PDF Marketers - Displayed vertically with medium cards */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-engineering-700">Standard Advertisers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {standardMarketers.map(marketer => {
              const typeDetails = getTypeDetails(marketer.type);
              return (
                <Card key={marketer.id} className="overflow-hidden border border-blue-300 h-full flex flex-col">
                  <div className="relative h-48">
                    <img src={marketer.mediaUrl} alt={marketer.name} className="w-full h-full object-cover" />
                    <Badge className={`absolute top-2 right-2 ${typeDetails.badgeClass}`}>
                      {typeDetails.label}
                    </Badge>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-1">{marketer.name}</h3>
                    {marketer.industry && (
                      <Badge variant="outline" className="mb-2">
                        {marketer.industry}
                      </Badge>
                    )}
                    
                    {marketer.description && (
                      <p className="text-gray-600 mb-3 text-sm flex-grow">{marketer.description}</p>
                    )}
                    
                    <div className="space-y-2 mt-auto">
                      {marketer.location && (
                        <div className="flex items-start text-gray-600">
                          <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{marketer.location}</span>
                        </div>
                      )}
                      
                      <a href={`tel:${marketer.phoneNumber}`} className="flex items-center text-engineering-500 hover:text-engineering-700 transition-colors">
                        <Phone size={16} className="mr-2 flex-shrink-0" />
                        <span>{marketer.phoneNumber}</span>
                      </a>
                      
                      {marketer.email && (
                        <a href={`mailto:${marketer.email}`} className="flex items-center text-engineering-500 hover:text-engineering-700 transition-colors">
                          <Mail size={16} className="mr-2 flex-shrink-0" />
                          <span className="text-sm">{marketer.email}</span>
                        </a>
                      )}
                      
                      {marketer.website && (
                        <a href={`https://${marketer.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-engineering-500 hover:text-engineering-700 transition-colors">
                          <Globe size={16} className="mr-2 flex-shrink-0" />
                          <span className="text-sm">{marketer.website}</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Basic Marketers - Displayed in a single row */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-engineering-700">Basic Listings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {basicMarketers.map(marketer => {
              const typeDetails = getTypeDetails(marketer.type);
              return (
                <Card key={marketer.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-medium">{marketer.name}</h3>
                      <Badge variant="outline" className={typeDetails.badgeClass.replace('bg-', '')}>
                        Basic
                      </Badge>
                    </div>
                    <a href={`tel:${marketer.phoneNumber}`} className="flex items-center text-gray-700 text-sm hover:text-engineering-600 transition-colors">
                      <Phone size={14} className="mr-1 flex-shrink-0" />
                      <span>{marketer.phoneNumber}</span>
                    </a>
                    {marketer.industry && (
                      <span className="text-xs text-gray-500 mt-1 block">
                        {marketer.industry}
                      </span>
                    )}
                    {marketer.location && (
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin size={12} className="mr-1 flex-shrink-0" />
                        <span>{marketer.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketersShowcase;
