
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, FileText, Video } from 'lucide-react';

interface Marketer {
  id: number;
  name: string;
  phoneNumber: string;
  type: 'video' | 'pdf' | 'basic';
  mediaUrl?: string;
  industry?: string;
  priority: number; // Higher number means higher priority
}

const marketers: Marketer[] = [
  {
    id: 1,
    name: 'Kerala Tiles Market',
    phoneNumber: '+91 9876543210',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1525896544042-354764aa27e6?auto=format&fit=crop&q=80&w=1200',
    industry: 'Tiles',
    priority: 10
  },
  {
    id: 2,
    name: 'TechAutomation India',
    phoneNumber: '+91 9876543211',
    type: 'video',
    mediaUrl: '/videos/857262-hd_1920_1080_24fps.mp4',
    industry: 'Automation',
    priority: 9
  },
  {
    id: 3,
    name: 'MetalCraft Industries',
    phoneNumber: '+91 9876543212',
    type: 'pdf',
    mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    industry: 'Metal',
    priority: 7
  },
  {
    id: 4,
    name: 'Palakkad Builders',
    phoneNumber: '+91 9876543213',
    type: 'pdf',
    mediaUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200',
    industry: 'Real Estate',
    priority: 6
  },
  {
    id: 5,
    name: 'SmartFactory Solutions',
    phoneNumber: '+91 9876543214',
    type: 'video',
    mediaUrl: '/videos/4017225-uhd_3840_2160_30fps.mp4',
    industry: 'Manufacturing',
    priority: 8
  },
  {
    id: 6,
    name: 'DesignPro Architects',
    phoneNumber: '+91 9876543215',
    type: 'pdf',
    mediaUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80&w=1200',
    industry: 'Architecture',
    priority: 5
  },
  {
    id: 7,
    name: 'Electrical Engineers Association',
    phoneNumber: '+91 9876543216',
    type: 'basic',
    industry: 'Electrical',
    priority: 3
  },
  {
    id: 8,
    name: 'Civil Construction Solutions',
    phoneNumber: '+91 9876543217',
    type: 'basic',
    industry: 'Civil',
    priority: 2
  },
  {
    id: 9,
    name: 'Green Energy Systems',
    phoneNumber: '+91 9876543218',
    type: 'basic',
    industry: 'Energy',
    priority: 1
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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our marketing partners for your advertising needs. Contact them directly to showcase your products and services to our engineering community.
          </p>
          
          <div className="flex justify-center gap-4 mt-4">
            <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300 flex items-center">
              <Video size={16} className="mr-2" /> Premium
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-300 flex items-center">
              <FileText size={16} className="mr-2" /> Standard
            </Badge>
            <Badge className="bg-gray-100 text-gray-800 border border-gray-300 flex items-center">
              <Phone size={16} className="mr-2" /> Basic
            </Badge>
          </div>
        </div>
        
        {/* Premium/Video Marketers - Displayed vertically with larger cards */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-center">Premium Advertisements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumMarketers.map(marketer => {
              const typeDetails = getTypeDetails(marketer.type);
              
              return (
                <Card key={marketer.id} className="overflow-hidden border-2 border-yellow-400 shadow-lg">
                  <div className="relative h-64">
                    {marketer.mediaUrl && marketer.mediaUrl.endsWith('.mp4') ? (
                      <video 
                        src={marketer.mediaUrl} 
                        className="w-full h-full object-cover" 
                        autoPlay 
                        muted 
                        loop
                      />
                    ) : (
                      <img 
                        src={marketer.mediaUrl} 
                        alt={marketer.name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Badge className={`absolute top-2 right-2 ${typeDetails.badgeClass}`}>
                      {typeDetails.label}
                    </Badge>
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
                    <a 
                      href={`tel:${marketer.phoneNumber}`} 
                      className="flex items-center text-engineering-600 font-medium hover:text-engineering-800 transition-colors"
                    >
                      <Phone size={16} className="mr-2" />
                      <span>{marketer.phoneNumber}</span>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Standard/PDF Marketers - Displayed vertically with medium cards */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-center">Standard Advertisements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {standardMarketers.map(marketer => {
              const typeDetails = getTypeDetails(marketer.type);
              
              return (
                <Card key={marketer.id} className="overflow-hidden border border-blue-300">
                  <div className="relative h-48">
                    <img 
                      src={marketer.mediaUrl} 
                      alt={marketer.name} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${typeDetails.badgeClass}`}>
                      {typeDetails.label}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{marketer.name}</h3>
                    {marketer.industry && (
                      <Badge variant="outline" className="mb-2">
                        {marketer.industry}
                      </Badge>
                    )}
                    <a 
                      href={`tel:${marketer.phoneNumber}`} 
                      className="flex items-center text-engineering-500 hover:text-engineering-700 transition-colors"
                    >
                      <Phone size={16} className="mr-2" />
                      <span>{marketer.phoneNumber}</span>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Basic Marketers - Displayed in a single row */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-center">Basic Advertisements</h3>
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
                    <a 
                      href={`tel:${marketer.phoneNumber}`} 
                      className="flex items-center text-gray-700 text-sm hover:text-engineering-600 transition-colors"
                    >
                      <Phone size={14} className="mr-1" />
                      <span>{marketer.phoneNumber}</span>
                    </a>
                    {marketer.industry && (
                      <span className="text-xs text-gray-500 mt-1 block">
                        {marketer.industry}
                      </span>
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
