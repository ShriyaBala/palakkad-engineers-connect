
import React from 'react';
import Layout from '@/components/Layout';
import PDFFlipbook from '@/components/PDFFlipbook';
import EngineeringPDFFlipbook from '@/components/EngineeringPDFFlipbook';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Resources = () => {
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-engineering-800">
            Engineering Resources
          </h1>
          
          <Tabs defaultValue="directory" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="directory">Engineering Directory</TabsTrigger>
              <TabsTrigger value="resources">Community Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="directory" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <PDFFlipbook 
                    pdfUrl="/resources/directory inner.pdf"
                    title="Engineering Directory"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <EngineeringPDFFlipbook />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
