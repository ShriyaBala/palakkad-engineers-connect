
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-engineering-800">
            About Palakkad Engineers Association
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-engineering-600">Our Mission</h2>
                  <p className="text-gray-700 mb-6">
                    The Palakkad Engineers Association (PEA) was established in 1985 with the mission to unite engineering professionals 
                    across all disciplines in the Palakkad district. We strive to foster a community that promotes professional development, 
                    technical innovation, and collaboration among engineers while contributing to the sustainable development of our region.
                  </p>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-engineering-600">Our Vision</h2>
                  <p className="text-gray-700 mb-6">
                    To be the premier organization representing engineering excellence in Palakkad district, serving as a platform for 
                    knowledge exchange, professional networking, and community service. We aim to inspire the next generation of engineers 
                    while addressing the technological challenges facing our society.
                  </p>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-engineering-600">Core Values</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Professional Excellence:</strong> Upholding the highest standards of engineering practice and ethics</li>
                    <li><strong>Innovation:</strong> Encouraging creative solutions to complex problems</li>
                    <li><strong>Collaboration:</strong> Fostering partnerships across disciplines and sectors</li>
                    <li><strong>Integrity:</strong> Maintaining honesty and transparency in all our activities</li>
                    <li><strong>Service:</strong> Contributing to the welfare of our community and environment</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-engineering-600">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-medium">1985</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Members</span>
                      <span className="font-medium">200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Events</span>
                      <span className="font-medium">15+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Local Chapters</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry Partners</span>
                      <span className="font-medium">25+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-engineering-600">Leadership</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Dr. Rajesh Kumar</p>
                      <p className="text-sm text-gray-600">President</p>
                    </div>
                    <div>
                      <p className="font-medium">Er. Priya Nair</p>
                      <p className="text-sm text-gray-600">Secretary</p>
                    </div>
                    <div>
                      <p className="font-medium">Er. Suresh Menon</p>
                      <p className="text-sm text-gray-600">Treasurer</p>
                    </div>
                    <div>
                      <p className="font-medium">Er. Lakshmi Varma</p>
                      <p className="text-sm text-gray-600">Joint Secretary</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="affiliations">Affiliations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-engineering-600">Our History</h3>
                <p className="text-gray-700 mb-4">
                  The Palakkad Engineers Association was established in 1985 by a group of 15 dedicated engineers who sought to create 
                  a platform for professional collaboration in the region. What began as informal monthly meetings at the Palakkad Town Hall 
                  quickly grew into a formal organization with a constitution and elected leadership.
                </p>
                <p className="text-gray-700 mb-4">
                  By 1990, the association had expanded to over 50 members and began organizing its first technical symposiums and workshops. 
                  The 1990s saw rapid growth as the association established partnerships with engineering colleges in the district and launched 
                  its first scholarship program for promising engineering students.
                </p>
                <p className="text-gray-700">
                  Today, with over 200 members from diverse engineering disciplines, PEA stands as one of the most respected professional 
                  organizations in the region, continuing its tradition of excellence, innovation, and community service.
                </p>
              </TabsContent>
              
              <TabsContent value="achievements" className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-engineering-600">Key Achievements</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="bg-engineering-100 text-engineering-800 px-2 py-1 rounded text-sm h-min">2020</span>
                    <p className="text-gray-700">Launched the "Engineers for Sustainable Palakkad" initiative, collaborating with local government on infrastructure projects</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-engineering-100 text-engineering-800 px-2 py-1 rounded text-sm h-min">2018</span>
                    <p className="text-gray-700">Created the annual Engineering Excellence Awards recognizing outstanding contributions in the field</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-engineering-100 text-engineering-800 px-2 py-1 rounded text-sm h-min">2015</span>
                    <p className="text-gray-700">Established the PEA Digital Library providing access to technical resources for all members</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-engineering-100 text-engineering-800 px-2 py-1 rounded text-sm h-min">2010</span>
                    <p className="text-gray-700">Organized the first Palakkad Engineering Expo, now an annual event attracting participants from across Kerala</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-engineering-100 text-engineering-800 px-2 py-1 rounded text-sm h-min">2005</span>
                    <p className="text-gray-700">Launched mentorship program connecting senior engineers with engineering students</p>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="affiliations" className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-engineering-600">Our Affiliations</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-lg">Engineering Council of Kerala</h4>
                    <p className="text-gray-700">Founding member organization since 1995</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Institution of Engineers (India)</h4>
                    <p className="text-gray-700">Affiliated local chapter since 2000</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Kerala Technical University</h4>
                    <p className="text-gray-700">Academic partner for continuing education programs</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Palakkad Municipal Corporation</h4>
                    <p className="text-gray-700">Technical advisory partner for urban development</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Kerala Startup Mission</h4>
                    <p className="text-gray-700">Partner for innovation and entrepreneurship initiatives</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
