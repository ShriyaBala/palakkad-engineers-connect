
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedAdvertisements from '@/components/EnhancedAdvertisements';
import MarketersShowcase from '@/components/MarketersShowcase';
import ShopFinder from '@/components/ShopFinder';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import IndustryAds from '@/components/IndustryAds';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Association Logo */}
      <HeroSection />
      
      {/* Main Advertisement Section */}
      <section className="py-8 bg-gradient-to-r from-engineering-50 to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-3 mt-4 mb-8">
            <Link to="/advertising">
              <Button className="bg-engineering-600 text-white hover:bg-engineering-700 flex items-center gap-2">
                <FileText size={18} />
                <span>Advertise With Us</span>
              </Button>
            </Link>
            <Link to="#shopfinder">
              <Button variant="outline" className="border-engineering-600 text-engineering-600 hover:bg-engineering-50 flex items-center gap-2">
                <Search size={18} />
                <span>Find Shops</span>
              </Button>
            </Link>
          </div>
          
          {/* Featured Carousel Advertisement */}
          <EnhancedAdvertisements />
        </div>
      </section>
      
      {/* Marketers Showcase - Book/PDF Style Layout */}
      <MarketersShowcase title="Connect with our Marketing Partners" />
      
      {/* Shop Finder Section */}
      <div id="shopfinder">
        <ShopFinder />
      </div>
    </Layout>
  );
};

export default Index;
