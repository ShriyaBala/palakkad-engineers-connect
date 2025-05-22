
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedAdvertisements from '@/components/EnhancedAdvertisements';
import MarketersShowcase from '@/components/MarketersShowcase';
import ShopFinder from '@/components/ShopFinder';
import { Button } from '@/components/ui/button';
import { FileText, Search, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      {/* Main Advertisement Section */}
      <section className="py-8 bg-gradient-to-r from-engineering-50 to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              LENSFED Palakkad District Advertisements
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with engineering professionals, suppliers, and service providers in Palakkad district.
              Find the right business for your needs.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Link to="/advertising">
                <Button className="bg-engineering-600 text-white hover:bg-engineering-700 flex items-center gap-2">
                  <FileText size={18} />
                  <span>Advertise With Us</span>
                </Button>
              </Link>
              <Link to="/engineers">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search size={18} />
                  <span>Find Engineers</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Featured Carousel Advertisement */}
          <EnhancedAdvertisements title="Featured Advertisements" />
        </div>
      </section>
      
      {/* Marketers Showcase - Vertical Layout */}
      <MarketersShowcase title="Connect with our Marketing Partners" />
      
      {/* Shop Finder Section */}
      <ShopFinder />
      
      {/* Brief Call to Action */}
      <section className="py-10 bg-engineering-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Looking for the right engineering professional?</h2>
          <p className="text-engineering-100 mb-6 max-w-2xl mx-auto">
            Browse our comprehensive directory of qualified engineers in Palakkad district.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/members">
              <Button className="bg-white text-engineering-800 hover:bg-gray-100">
                View Member Directory
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Upcoming Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
