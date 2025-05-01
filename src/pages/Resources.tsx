import React from 'react';
import Layout from '@/components/Layout';
import FlipBook from '@/components/FlipBook';
import { Card, CardContent } from '@/components/ui/card';

const Resources = () => (
  <Layout>
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-engineering-800">
          Engineering Resources
        </h1>
        <Card>
          <CardContent className="flex justify-center">
            <FlipBook />
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Resources;
