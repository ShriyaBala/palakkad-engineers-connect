
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface Advertisement {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  description: string;
  link: string;
  tier: 'premium' | 'standard' | 'basic';
  company?: string;
  location?: string;
  validUntil?: string;
}

// Enhanced advertisements with tier information
const advertisements: Advertisement[] = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1581092436484-26c1ce9f3644?auto=format&fit=crop&q=80&w=1200',
    title: 'Engineering Conference 2025',
    description: 'Join the largest engineering conference in Kerala. Network with experts and industry leaders.',
    link: '#',
    tier: 'premium',
    company: 'Kerala Engineering Association',
    location: 'Palakkad Town',
    validUntil: '2025-06-30',
  },
  {
    id: 2,
    type: 'video',
    src: 'https://player.vimeo.com/external/373503310.sd.mp4?s=20ae075343bbd512fb23cba16b9f9ad600e5715d&profile_id=164&oauth2_token_id=57447761',
    title: 'Civil Engineering Workshop',
    description: 'Learn advanced civil engineering techniques with hands-on training from industry experts.',
    link: '#',
    tier: 'premium',
    company: 'BuildRight Institute',
    location: 'Kanjikode',
    validUntil: '2025-05-15',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200',
    title: 'Engineering Job Fair',
    description: 'Find your next engineering opportunity at our upcoming job fair. Bring your resume!',
    link: '#',
    tier: 'standard',
    company: 'Tech Recruiters Inc.',
    location: 'Ottapalam',
    validUntil: '2025-04-20',
  },
  {
    id: 4,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=1200',
    title: 'Tech Expo 2025',
    description: 'Showcase your engineering innovations at the annual tech expo.',
    link: '#',
    tier: 'standard',
    company: 'Innovation Kerala',
    location: 'Palakkad Town',
    validUntil: '2025-07-10',
  },
  {
    id: 5,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&q=80&w=1200',
    title: 'Engineering Supplies Sale',
    description: 'Special discounts on engineering tools and equipment. Limited time offer!',
    link: '#',
    tier: 'basic',
    company: 'ToolMart Kerala',
    location: 'Chittur',
    validUntil: '2025-03-25',
  },
];

interface EnhancedAdvertisementsProps {
  title?: string;
  showTierIndicator?: boolean;
  autoplayInterval?: number;
}

const EnhancedAdvertisements: React.FC<EnhancedAdvertisementsProps> = ({ 
  title = 'Featured Advertisements',
  showTierIndicator = true,
  autoplayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1
    );
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    pauseAutoplay();
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    if (isPlaying) {
      restartAutoplay();
    }
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      pauseAutoplay();
    } else {
      restartAutoplay();
    }
    setIsPlaying(!isPlaying);
  };

  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const restartAutoplay = () => {
    pauseAutoplay();
    autoplayTimerRef.current = setInterval(nextSlide, autoplayInterval);
  };

  const visitAdvertisement = () => {
    const currentAd = advertisements[currentIndex];
    toast({
      title: `Visiting ${currentAd.title}`,
      description: `Redirecting to advertiser's website...`,
    });
    window.open(currentAd.link, '_blank');
  };

  useEffect(() => {
    // Initialize autoplay
    if (isPlaying) {
      autoplayTimerRef.current = setInterval(nextSlide, autoplayInterval);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplayInterval, isPlaying]);

  useEffect(() => {
    // Handle video playing logic when slides change
    const currentAd = advertisements[currentIndex];
    if (currentAd.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
      }
    }
    
    // Reset video playing state when changing to non-video slide
    if (currentAd.type !== 'video') {
      setIsVideoPlaying(false);
    }
  }, [currentIndex]);

  const getTierStyles = (tier: string) => {
    switch(tier) {
      case 'premium':
        return { 
          badge: 'bg-advertise-premium text-black hover:bg-yellow-500',
          class: 'border-advertise-premium shadow-[0_0_15px_rgba(255,215,0,0.3)]',
          label: 'Premium'
        };
      case 'standard':
        return { 
          badge: 'bg-advertise-standard text-black hover:bg-gray-400',
          class: 'border-advertise-standard',
          label: 'Standard'
        };
      default:
        return { 
          badge: 'bg-advertise-basic text-black hover:bg-amber-700',
          class: 'border-advertise-basic',
          label: 'Basic'
        };
    }
  };

  return (
    <div className="relative overflow-hidden bg-white shadow-md rounded-lg">
      <div className="text-center py-6">
        <h2 className="section-heading">{title}</h2>
        {showTierIndicator && (
          <div className="flex justify-center gap-3 mb-4">
            <Badge className="bg-advertise-premium text-black">Premium</Badge>
            <Badge className="bg-advertise-standard text-black">Standard</Badge>
            <Badge className="bg-advertise-basic text-black">Basic</Badge>
          </div>
        )}
      </div>
      
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {advertisements.map((ad) => {
            const tierStyle = getTierStyles(ad.tier);
            
            return (
              <div 
                key={ad.id} 
                className={`min-w-full border-t-4 ${tierStyle.class}`}
              >
                {ad.type === 'image' ? (
                  <img
                    src={ad.src}
                    alt={ad.title}
                    className="w-full h-[400px] object-cover"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={ad.src}
                    className="w-full h-[400px] object-cover"
                    controls={false}
                    muted={false}
                    onPlay={handleVideoPlay}
                    onEnded={handleVideoEnd}
                    onPause={() => setIsVideoPlaying(false)}
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{ad.title}</h3>
                    {showTierIndicator && (
                      <Badge className={tierStyle.badge}>
                        {tierStyle.label}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="mb-4">{ad.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-300">
                    {ad.company && (
                      <span>{ad.company}</span>
                    )}
                    {ad.location && (
                      <span>• {ad.location}</span>
                    )}
                    {ad.validUntil && (
                      <span>• Valid until {new Date(ad.validUntil).toLocaleDateString()}</span>
                    )}
                  </div>
                  
                  <Button
                    onClick={visitAdvertisement}
                    className="inline-block bg-white text-engineering-800 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors max-w-max flex items-center gap-2"
                  >
                    Learn More
                    <ExternalLink size={16} />
                  </Button>
                </div>
                
                {ad.type === 'video' && (
                  <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-white text-xs">
                    Video Ad
                  </div>
                )}
                
                {ad.tier === 'premium' && (
                  <div className="absolute top-0 left-0 w-full h-full border-2 border-advertise-premium pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>
        
        <Button
          variant="ghost"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </Button>
        
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </Button>
        
        <div className="absolute bottom-20 right-6 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8"
            onClick={toggleAutoplay}
          >
            {isPlaying && !isVideoPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {advertisements.map((_, index) => {
            const tierStyle = getTierStyles(advertisements[index].tier);
            
            return (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors border ${
                  index === currentIndex 
                    ? `bg-white border-white ${advertisements[index].tier === 'premium' && 'animate-pulse-highlight'}` 
                    : `bg-white/40 border-transparent hover:bg-white/70`
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            );
          })}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
        Interested in advertising? Contact us to learn about our different advertising tiers.
      </div>
    </div>
  );
};

export default EnhancedAdvertisements;
