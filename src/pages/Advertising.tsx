import React from 'react';
import Layout from '@/components/Layout';
import AdvertisingPlans from '@/components/AdvertisingPlans';
import EnhancedAdvertisements from '@/components/EnhancedAdvertisements';
import { Button } from '@/components/ui/button';
import { CheckCircle2, BarChart3, Target, Users } from 'lucide-react';
const Advertising = () => {
  return <Layout>
      <section className="bg-gradient-to-br from-engineering-700 to-engineering-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
              Advertise With The Palakkad Engineering Community
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Reach qualified engineering professionals throughout Palakkad district and grow your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              
              
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Why Advertise With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique advantages for businesses looking to connect with the engineering community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-engineering-100 p-4 rounded-full mb-4">
                <Target className="h-8 w-8 text-engineering-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Targeted Reach</h3>
              <p className="text-gray-600">
                Connect directly with engineering professionals across various specializations in Palakkad district.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-engineering-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-engineering-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Engaged Community</h3>
              <p className="text-gray-600">
                Our platform has 500+ active community members who regularly visit for resources and networking.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-engineering-100 p-4 rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-engineering-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Performance Analytics</h3>
              <p className="text-gray-600">
                Get detailed insights on your ad performance with our comprehensive analytics dashboard.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-engineering-100 p-4 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-engineering-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Quality Exposure</h3>
              <p className="text-gray-600">
                Showcase your brand alongside trusted engineering content and professional resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="section-heading">Featured Advertisement Examples</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              See how different advertisement tiers appear on our platform.
            </p>
          </div>
          
          <EnhancedAdvertisements title="Sample Advertisements" showTierIndicator={true} />
        </div>
      </section>

      <AdvertisingPlans />

      
    </Layout>;
};
export default Advertising;