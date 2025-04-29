
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-engineering-700 to-engineering-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading leading-tight">
                Connecting Engineers Across <span className="text-kerala-300">Palakkad</span>
              </h1>
              <p className="text-lg text-gray-200 max-w-lg">
                Join our thriving community of engineering professionals to network, share knowledge, 
                and discover opportunities in the Palakkad region.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-engineering-800 hover:bg-gray-100 flex items-center gap-2">
                <Search size={18} />
                <span>Find Engineers</span>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10 flex items-center gap-2">
                <Users size={18} />
                <span>Join Community</span>
              </Button>
              <Button variant="secondary" className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>View Resources</span>
              </Button>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="aspect-square rounded-full bg-engineering-600/30 absolute -top-12 -right-12 w-64 h-64"></div>
            <div className="aspect-square rounded-full bg-kerala-600/20 absolute -bottom-12 -left-12 w-80 h-80"></div>
            <div className="relative z-10 bg-white p-4 rounded-lg shadow-xl transform rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800"
                alt="Engineers collaborating" 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="relative z-20 bg-white p-4 rounded-lg shadow-xl transform -rotate-6 -mt-40 ml-32">
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800" 
                alt="Engineering project" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white font-heading">500+</div>
              <div className="text-sm text-gray-300">Community Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-heading">120+</div>
              <div className="text-sm text-gray-300">Engineering Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-heading">50+</div>
              <div className="text-sm text-gray-300">Resources Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-heading">30+</div>
              <div className="text-sm text-gray-300">Events Per Year</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
