
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Flipbook from '@/components/Flipbook';
import ProjectDeliverable from '@/components/ProjectDeliverable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Resources = () => {
  const [activeTab, setActiveTab] = useState("flipbook");
  
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-engineering-800">
            Engineering Resources
          </h1>
          
          <Tabs 
            defaultValue="flipbook" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="flipbook">Engineer Directory</TabsTrigger>
                <TabsTrigger value="document">Project Deliverable</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="flipbook">
              <div className="w-full">
                <Flipbook />
              </div>
            </TabsContent>
            
            <TabsContent value="document">
              <ProjectDeliverable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
