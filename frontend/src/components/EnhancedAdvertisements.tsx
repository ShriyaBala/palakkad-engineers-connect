import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Advertisement {
  id: number;
  type: 'image' | 'video';
  src: string;
  title?: string;
  tier?: 'premium' | 'standard' | 'basic';
}

const advertisements: Advertisement[] = [
  {
    id: 1,
    type: 'image',
    src: '/resources/WhatsApp Image 2025-05-28 at 12.33.42_55b4be14.jpg',
    
  },
  {
    id: 2,
    type: 'video',
    src: '/videos/WhatsApp Video 2025-05-28 at 12.33.42_e9909f36.mp4',
    
  }
];

interface EnhancedAdvertisementsProps {
  title?: string;
  showTierIndicator?: boolean;
  autoplayInterval?: number;
  filter?: string;
}

const EnhancedAdvertisements: React.FC<EnhancedAdvertisementsProps> = ({
  title = 'Featured Advertisements',
  showTierIndicator = true,
  autoplayInterval = 5000,
  filter
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredAds = filter
    ? advertisements.filter(ad => ad.title?.toLowerCase().includes(filter.toLowerCase()))
    : advertisements;

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === filteredAds.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? filteredAds.length - 1 : prevIndex - 1
    );
  };

  // Only auto-advance if not video
  useEffect(() => {
    const currentAd = filteredAds[currentIndex];
    if (currentAd?.type !== 'video' && isPlaying) {
      autoplayTimerRef.current = setInterval(nextSlide, autoplayInterval);
      return () => {
        if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      };
    } else {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    }
  }, [currentIndex, isPlaying, autoplayInterval, filteredAds]);

  useEffect(() => {
    // Reset video state on slide change
    const currentAd = filteredAds[currentIndex];
    if (currentAd?.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
    if (currentAd?.type !== 'video') setIsVideoPlaying(false);
  }, [currentIndex, filteredAds]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    nextSlide();
  };

  const toggleAutoplay = () => {
    setIsPlaying(prev => !prev);
  };

  const getTierStyles = (tier?: string) => {
    switch (tier) {
      case 'premium':
        return {
          badge: 'bg-advertise-premium text-black hover:bg-yellow-500',
          class: 'border-advertise-premium shadow-[0_0_15px_rgba(255,215,0,0.3)] relative z-10',
          label: 'Premium'
        };
      case 'standard':
        return {
          badge: 'bg-advertise-standard text-black hover:bg-gray-400',
          class: 'border-advertise-standard relative z-0',
          label: 'Standard'
        };
      default:
        return {
          badge: 'bg-advertise-basic text-black hover:bg-amber-700',
          class: 'border-advertise-basic relative z-0',
          label: 'Basic'
        };
    }
  };

  if (filteredAds.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <p className="text-gray-500">No advertisements available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden bg-white shadow-md rounded-lg">
        <div className="text-center py-6">
          {showTierIndicator && (
            <div className="flex justify-center gap-3 mb-4"></div>
          )}
        </div>
        <div className="relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {filteredAds.map((ad, idx) => {
              const tierStyle = getTierStyles(ad.tier);
              return (
                <div
                  key={ad.id}
                  className={`min-w-full border-t-4 ${tierStyle.class} relative`}
                >
                  {ad.type === 'video' ? (
                    <div className="relative flex flex-col items-center justify-center h-full">
                      <video
                        key={currentIndex === idx ? ad.src : undefined}
                        ref={el => {
                          if (idx === currentIndex) videoRef.current = el;
                        }}
                        src={ad.src}
                        className="w-full h-[400px] object-cover"
                        controls
                        playsInline
                        preload="auto"
                        onPlay={handleVideoPlay}
                        onEnded={handleVideoEnd}
                        onPause={() => setIsVideoPlaying(false)}
                        onError={e => {
                          console.error("Video error:", e);
                          if (videoRef.current) {
                            videoRef.current.load();
                          }
                        }}
                      />
                      {ad.tier && (
                        <div className="absolute top-4 right-4">
                          <Badge className={tierStyle.badge}>
                            {tierStyle.label}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center justify-center h-full">
                      <img
                        src={ad.src}
                        alt={ad.title}
                        className="w-full h-[400px] object-cover"
                      />
                      {ad.tier && (
                        <div className="absolute top-4 right-4">
                          <Badge className={tierStyle.badge}>
                            {tierStyle.label}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
          {filteredAds.map((_, index) => {
            const tierStyle = getTierStyles(filteredAds[index].tier);
            return (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors border ${
                  index === currentIndex
                    ? `bg-white border-white ${
                        filteredAds[index].tier === 'premium' &&
                        'animate-pulse-highlight'
                      }`
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
    </>
  );
};

export default EnhancedAdvertisements;