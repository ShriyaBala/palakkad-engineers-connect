
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Advertisement {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  description: string;
  link: string;
}

const advertisements: Advertisement[] = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1581092436484-26c1ce9f3644?auto=format&fit=crop&q=80&w=1200',
    title: 'Engineering Conference 2025',
    description: 'Join the largest engineering conference in Kerala',
    link: '#',
  },
  {
    id: 2,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200',
    title: 'Civil Engineering Workshop',
    description: 'Learn advanced civil engineering techniques',
    link: '#',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=1200',
    title: 'Tech Expo 2025',
    description: 'Showcase your engineering innovations',
    link: '#',
  },
];

const AdvertisementSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white shadow-md rounded-lg">
      <div className="section-heading text-center py-6">Featured Advertisements</div>
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {advertisements.map((ad) => (
            <div key={ad.id} className="min-w-full">
              {ad.type === 'image' ? (
                <img
                  src={ad.src}
                  alt={ad.title}
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <video
                  src={ad.src}
                  className="w-full h-[400px] object-cover"
                  controls
                  autoPlay
                  muted
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{ad.title}</h3>
                <p className="mb-4">{ad.description}</p>
                <a
                  href={ad.link}
                  className="inline-block bg-white text-engineering-800 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors max-w-max"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
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
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {advertisements.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSlider;
