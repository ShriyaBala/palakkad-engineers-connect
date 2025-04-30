
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import EnhancedAdvertisements from '@/components/EnhancedAdvertisements';
import EnhancedSearch from '@/components/EnhancedSearch';
import FeaturedEngineers from '@/components/FeaturedEngineers';
import EnhancedFlipbook from '@/components/EnhancedFlipbook';
import { engineeringResourcesPages } from '@/components/FlipbookPages';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Book, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading mb-4">Welcome to Palakkad Engineers Connect</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a thriving community of engineering professionals dedicated to fostering 
                connections, sharing knowledge, and advancing the engineering profession in the 
                Palakkad district of Kerala.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our platform offers resources, networking opportunities, and tools to help engineers 
                collaborate, grow professionally, and contribute to our local community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex items-center gap-2">
                  <Users size={18} />
                  <span>Join the Community</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarCheck size={18} />
                  <span>Upcoming Events</span>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-engineering-100 rounded-lg rotate-6"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-kerala-100 rounded-lg -rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800"
                alt="Engineers collaborating" 
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-8">Featured Advertisements</h2>
          <EnhancedAdvertisements />
          <div className="text-center mt-8">
            <Link to="/advertising">
              <Button variant="outline" className="border-engineering-500 text-engineering-600 hover:bg-engineering-50">
                Learn About Advertising With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <EnhancedSearch />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="section-heading mb-4 md:mb-0">Engineering Resources</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText size={18} />
              <span>Browse All Resources</span>
            </Button>
          </div>
          <EnhancedFlipbook title="Engineering Resources" />
        </div>
      </section>
      
      <FeaturedEngineers />
      
      <section className="py-16 bg-engineering-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 font-heading">Join Our Growing Community Today</h2>
          <p className="text-engineering-100 mb-8 max-w-2xl mx-auto">
            Connect with fellow engineers, access valuable resources, and stay updated with the latest 
            developments in the engineering community of Palakkad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-engineering-800 hover:bg-gray-100 flex items-center gap-2">
              <Users size={18} />
              <span>Become a Member</span>
            </Button>
            <Link to="/advertising">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 flex items-center gap-2">
                <FileText size={18} />
                <span>Advertise With Us</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
