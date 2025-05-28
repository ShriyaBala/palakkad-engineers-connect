import React from 'react';
import Layout from '@/components/Layout';
import Flipbook from '../components/Flipbook';


const Resources = () => (
  <Layout>
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-engineering-800">
          Engineering Directory
        </h1>
        
        <div className="w-full">
          <Flipbook />
        </div>
      </div>
    </div>
  </Layout>
);

export default Resources;
 