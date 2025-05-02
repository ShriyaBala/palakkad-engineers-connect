
import React from 'react';
import Layout from '@/components/Layout';
import PDFFlipbook from '@/components/PDFFlipbook';
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
            <PDFFlipbook 
              pdfUrl="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
              title="Engineering Documentation"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Resources;
