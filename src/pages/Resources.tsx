import React from 'react';
import Layout from '@/components/Layout';
import PDFFlipbook from '@/components/PDFFlipbook';
import { Card, CardContent } from '@/components/ui/card';

const Resources = () => {
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-engineering-800">
            Engineering Resources
          </h1>
          
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardContent className="p-6">
                <PDFFlipbook 
                  pdfUrl="/resources/directory inner.pdf"
                  title="Engineering Directory"
                />
              </CardContent>
            </Card>
            
            {/* You can add more resource cards here */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources; 