import React from 'react';
import Layout from '@/components/Layout';
import EnhancedAdvertisements from '@/components/EnhancedAdvertisements';
import MarketersShowcase from '@/components/MarketersShowcase';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SimpleLineAd from '@/components/SimpleLineAd';
import ShopFinder from '@/components/ShopFinder';
const Index = () => {
  return <Layout>
      {/* Hero Section with Association Logo */}
      <HeroSection />
      
      {/* Main Advertisement Section */}
      <section className="py-12 bg-gradient-to-r from-engineering-50 to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-3 mt-4 mb-8">
            <Link to="/advertising">
              <Button
  variant="outline"
  className="border-engineering-600 text-engineering-600 hover:bg-engineering-50 flex items-center gap-2"
>
  <FileText size={18} />
  <span>Advertise With Us</span>
</Button>
            </Link>
            <Button variant="outline" className="border-engineering-600 text-engineering-600 hover:bg-engineering-50 flex items-center gap-2" onClick={() => {
            const shopFinderSection = document.getElementById('shop-finder-section');
            if (shopFinderSection) {
              shopFinderSection.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }}>
              <Search size={18} />
              <span>Find Shops</span>
            </Button>
          </div>
          
          {/* Featured Carousel Advertisement */}
          <EnhancedAdvertisements />
        </div>
      </section>
      
      {/* Simple one-line advertisement */}
      <div className="marquee-ad bg-sky-600">
       <div className="marquee-ad-content">
        <SimpleLineAd
         shopName="Kerala Tiles Market"
         phoneNumber="+91 9876543210"
         email="contact@keralatiles.com"
        />
       </div>
      </div>


      
      <section className="flex justify-center items-center py-8 bg-gradient-to-r from-gray-50 to-gray-100">
    
      {/* Marketers Showcase - Book/PDF Style Layout */}
      <MarketersShowcase/>
      </section>
      
      {/* Simple one-line advertisement */}
  <div className="marquee-ad bg-sky-700">
    <div className="marquee-ad-content">
      <SimpleLineAd shopName="Automobile Shop" phoneNumber="+91 9652143210" email="contact@automobiles.com" />
    </div>
  </div>
      

      {/* Shop Finder Section */}
      <section id="shop-finder-section" className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <ShopFinder />
        </div>
      </section>
</Layout>;
};
export default Index;