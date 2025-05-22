
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
import { Phone, Video, FilePdf } from 'lucide-react';

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
          icon: <FilePdf size={16} className="mr-2 text-blue-500" />,
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
              <FilePdf size={16} className="mr-2" /> Standard
            </Badge>
            <Badge className="bg-gray-100 text-gray-800 border border-gray-300 flex items-center">
              <Phone size={16} className="mr-2" /> Basic
            </Badge>
          </div>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sortedMarketers.map((marketer) => {
              const typeDetails = getTypeDetails(marketer.type);
              
              return (
                <CarouselItem key={marketer.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className={`overflow-hidden h-full ${marketer.type === 'video' ? 'border-2 border-yellow-400 shadow-lg' : marketer.type === 'pdf' ? 'border border-blue-300' : ''}`}>
                    {(marketer.type === 'video' || marketer.type === 'pdf') && (
                      <div className="relative h-48">
                        {marketer.type === 'video' && marketer.mediaUrl && marketer.mediaUrl.endsWith('.mp4') ? (
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
                    )}
                    <CardContent className={`p-4 ${marketer.type === 'basic' ? 'pt-6' : ''}`}>
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-semibold ${marketer.type === 'video' ? 'text-xl' : marketer.type === 'pdf' ? 'text-lg' : 'text-base'}`}>
                            {marketer.name}
                          </h3>
                          {marketer.type === 'basic' && (
                            <Badge variant="outline" className={typeDetails.badgeClass}>
                              {typeDetails.label}
                            </Badge>
                          )}
                        </div>
                        {marketer.industry && marketer.type !== 'basic' && (
                          <Badge variant="outline" className="self-start mb-2">
                            {marketer.industry}
                          </Badge>
                        )}
                        <a 
                          href={`tel:${marketer.phoneNumber}`} 
                          className={`flex items-center ${marketer.type === 'video' ? 'text-engineering-600 font-medium mt-3' : marketer.type === 'pdf' ? 'text-engineering-500 mt-2' : 'text-gray-700 mt-1'} hover:text-engineering-800 transition-colors`}
                        >
                          <Phone size={16} className="mr-2" />
                          <span>{marketer.phoneNumber}</span>
                        </a>
                        {marketer.industry && marketer.type === 'basic' && (
                          <span className="text-sm text-gray-500 mt-1">
                            {marketer.industry}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-2">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default MarketersShowcase;
