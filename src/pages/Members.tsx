
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import EnhancedSearch from '@/components/EnhancedSearch';

const Members = () => {
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-engineering-800">
            Member Directory
          </h1>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Connect with qualified engineering professionals across Palakkad district.
            Use our advanced search tools to find engineers by location, specialization, or name.
          </p>
          
          <EnhancedSearch />
          
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-engineering-700">Membership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-engineering-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-engineering-600">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Professional Networking</h3>
                  <p className="text-gray-600">
                    Connect with fellow engineers, industry leaders, and potential collaborators through 
                    regular meetups, conferences, and our online directory.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-engineering-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-engineering-600">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Continuous Learning</h3>
                  <p className="text-gray-600">
                    Access exclusive technical resources, workshops, webinars, and training 
                    opportunities to stay updated with the latest developments in your field.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-engineering-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-engineering-600">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Recognition & Opportunities</h3>
                  <p className="text-gray-600">
                    Gain visibility through our member spotlight program, awards for excellence, 
                    and exclusive job opportunities shared within our community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-engineering-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-medium mb-4">Join Our Engineering Community</h3>
                <p className="text-gray-600 mb-6">
                  Become a member of Palakkad Engineers Association and connect with 
                  like-minded professionals committed to engineering excellence.
                </p>
                <div className="flex justify-center">
                  <a href="/become-member" className="bg-engineering-600 text-white px-6 py-3 rounded-md hover:bg-engineering-700 transition-colors">
                    Become a Member
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Members;
