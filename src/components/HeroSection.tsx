
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Users, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return <div className="bg-gradient-to-br from-engineering-700 to-engineering-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading leading-tight">
                Palakkad District <span className="text-kerala-300">Engineers Association</span>
              </h1>
              <p className="text-lg text-gray-200 max-w-lg">
                Uniting engineering professionals across Palakkad district to foster innovation, 
                collaboration, and professional growth in our local community.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/members" className="w-full">
                <Button className="bg-white text-engineering-800 hover:bg-gray-100 flex items-center gap-2 w-full">
                  <Users size={18} />
                  <span>Member Directory</span>
                </Button>
              </Link>
              <Link to="/events" className="w-full">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 flex items-center gap-2 w-full">
                  <Calendar size={18} />
                  <span>Upcoming Events</span>
                </Button>
              </Link>
              <Link to="/resources" className="w-full">
                <Button variant="secondary" className="flex items-center gap-2 w-full">
                  <FileText size={18} />
                  <span>Resources</span>
                </Button>
              </Link>
              <Link to="/members" className="w-full">
                <Button className="bg-kerala-600 text-white hover:bg-kerala-700 flex items-center gap-2 w-full">
                  <Search size={18} />
                  <span>Find Engineers</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="relative z-10 bg-white p-3 rounded-lg shadow-xl transform rotate-2">
              <img alt="Engineering project in Palakkad" src="/lovable-uploads/da1bd724-8c2f-444e-bcd8-8b6124249174.jpg" className="w-full h-auto rounded object-fill" />
            </div>
            
            <div className="absolute -bottom-10 left-10 z-0 w-24 h-24 bg-engineering-500/30 rounded-full blur-md"></div>
            <div className="absolute top-10 right-10 z-0 w-32 h-32 bg-kerala-500/20 rounded-full blur-md"></div>
          </div>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-3xl font-bold text-white font-heading">200+</div>
              <div className="text-sm text-gray-300">District Members</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-3xl font-bold text-white font-heading">50+</div>
              <div className="text-sm text-gray-300">Local Companies</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-3xl font-bold text-white font-heading">20+</div>
              <div className="text-sm text-gray-300">Technical Resources</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-3xl font-bold text-white font-heading">15+</div>
              <div className="text-sm text-gray-300">Annual Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default HeroSection;
