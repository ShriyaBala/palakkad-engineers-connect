
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
import { Phone } from 'lucide-react';

interface Marketer {
  id: number;
  name: string;
  phoneNumber: string;
  type: 'image' | 'video';
  mediaUrl: string;
  industry?: string;
}

const marketers: Marketer[] = [
  {
    id: 1,
    name: 'Kerala Tiles Market',
    phoneNumber: '+91 9876543210',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1525896544042-354764aa27e6?auto=format&fit=crop&q=80&w=1200',
    industry: 'Tiles'
  },
  {
    id: 2,
    name: 'TechAutomation India',
    phoneNumber: '+91 9876543211',
    type: 'video',
    mediaUrl: '/videos/857262-hd_1920_1080_24fps.mp4',
    industry: 'Automation'
  },
  {
    id: 3,
    name: 'MetalCraft Industries',
    phoneNumber: '+91 9876543212',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    industry: 'Metal'
  },
  {
    id: 4,
    name: 'Palakkad Builders',
    phoneNumber: '+91 9876543213',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200',
    industry: 'Real Estate'
  },
  {
    id: 5,
    name: 'SmartFactory Solutions',
    phoneNumber: '+91 9876543214',
    type: 'video',
    mediaUrl: '/videos/4017225-uhd_3840_2160_30fps.mp4',
    industry: 'Manufacturing'
  },
  {
    id: 6,
    name: 'DesignPro Architects',
    phoneNumber: '+91 9876543215',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80&w=1200',
    industry: 'Architecture'
  }
];

interface MarketersShowcaseProps {
  title?: string;
}

const MarketersShowcase: React.FC<MarketersShowcaseProps> = ({ 
  title = "Our Marketing Partners" 
}) => {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our marketing partners for your advertising needs. Contact them directly to showcase your products and services to our engineering community.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {marketers.map((marketer) => (
              <CarouselItem key={marketer.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48">
                    {marketer.type === 'image' ? (
                      <img 
                        src={marketer.mediaUrl} 
                        alt={marketer.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video 
                        src={marketer.mediaUrl} 
                        className="w-full h-full object-cover" 
                        autoPlay 
                        muted 
                        loop
                      />
                    )}
                    {marketer.type === 'video' && (
                      <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-xs">
                        Video
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{marketer.name}</h3>
                        {marketer.industry && (
                          <Badge variant="outline" className="ml-2">
                            {marketer.industry}
                          </Badge>
                        )}
                      </div>
                      <a 
                        href={`tel:${marketer.phoneNumber}`} 
                        className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors mt-2"
                      >
                        <Phone size={16} className="mr-2" />
                        <span>{marketer.phoneNumber}</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
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
