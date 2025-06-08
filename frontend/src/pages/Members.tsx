import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import EnhancedSearch from '@/components/EnhancedSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Users, BadgeCheck } from 'lucide-react';

import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import JoinUs from '@/pages/JoinUs'; // Adjust the path if needed



const Members = () => {
  const [showJoinUs, setShowJoinUs] = useState(false);

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Palakkad Engineers Directory</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with qualified engineering professionals across Palakkad district. Our directory 
              helps you find the right expertise for your projects and networking needs.
            </p>
          </div>
          
          <EnhancedSearch />
          
          <div className="mt-20">
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="benefits">Membership Benefits</TabsTrigger>
                <TabsTrigger value="types">Membership Types</TabsTrigger>
                <TabsTrigger value="featured">Featured Members</TabsTrigger>
              </TabsList>
              
              <TabsContent value="benefits">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="h-12 w-12 bg-engineering-100 rounded-full flex items-center justify-center mb-4">
                        <Users className="text-engineering-600" />
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
              </TabsContent>
              
              <TabsContent value="types">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="overflow-hidden">
                    <div className="bg-engineering-600 p-4">
                      <h3 className="text-xl font-semibold text-white">Regular Membership</h3>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <span className="text-3xl font-bold">₹1,200</span>
                        <span className="text-gray-500">/year</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>Full access to member directory</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>Discounted rates for workshops and events</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>Basic listing in the online directory</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>Quarterly newsletter subscription</span>
                        </li>
                      </ul>
                      <Button className="w-full">Apply Now</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden border-2 border-engineering-600">
                    <div className="bg-engineering-600 p-4">
                      <h3 className="text-xl font-semibold text-white">Corporate Membership</h3>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <span className="text-3xl font-bold">₹3,500</span>
                        <span className="text-gray-500">/year</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>All Regular Membership benefits</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>Featured listing with company logo</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>Priority access to industry events</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>Advertising opportunities in newsletter</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-engineering-600 mr-2 shrink-0 mt-0.5" />
                          <span>Ability to post job opportunities</span>
                        </li>
                      </ul>
                      <Button className="w-full">Apply Now</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="featured">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start p-4">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256"
                          alt="Dr. Rajesh Menon"
                          className="w-16 h-16 object-cover rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-lg">Dr. Rajesh Menon</h3>
                          <p className="text-sm text-gray-600">Civil Engineering</p>
                          <p className="text-sm text-gray-600">Project Management Expert</p>
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-600">
                          Over 20 years of experience in infrastructure projects across Kerala. Former advisor to the Kerala State Planning Board.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start p-4">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"
                          alt="Prof. Asha Nair"
                          className="w-16 h-16 object-cover rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-lg">Prof. Asha Nair</h3>
                          <p className="text-sm text-gray-600">Electrical Engineering</p>
                          <p className="text-sm text-gray-600">Renewable Energy Specialist</p>
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-600">
                          Lead researcher on solar energy solutions for rural Kerala. Has published over 30 papers in international journals.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start p-4">
                        <img 
                          src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=256"
                          alt="Jayan Thomas"
                          className="w-16 h-16 object-cover rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-lg">Jayan Thomas</h3>
                          <p className="text-sm text-gray-600">Computer Science</p>
                          <p className="text-sm text-gray-600">AI & Machine Learning Consultant</p>
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-600">
                          Tech entrepreneur with multiple successful startups. Currently working on AI solutions for the healthcare sector.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-engineering-700">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I become a member?</AccordionTrigger>
                <AccordionContent>
                  To become a member of the Palakkad Engineers Association, you need to fill out the membership application form available on our website. You'll need to provide proof of your engineering qualification and pay the applicable membership fee. Once your application is reviewed and approved, you'll receive your membership confirmation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What are the membership fees?</AccordionTrigger>
                <AccordionContent>
                  Regular membership costs ₹1,200 per year. Corporate membership is available for ₹3,500 per year. We also offer lifetime membership options and special rates for fresh graduates. All fees contribute to the association's activities, events, and services.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What benefits do members receive?</AccordionTrigger>
                <AccordionContent>
                  Members enjoy access to our professional network, discounted rates for workshops and conferences, listing in our online directory, subscription to our technical newsletter, job opportunity notifications, and the ability to participate in association committees and leadership roles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How can I update my member profile?</AccordionTrigger>
                <AccordionContent>
                  Once you're a registered member, you'll receive login credentials for our member portal. Through this portal, you can update your personal information, professional details, skills, and contact information at any time. If you encounter any issues, please contact our membership support team.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Are there any networking events for members?</AccordionTrigger>
                <AccordionContent>
                  Yes, we organize monthly meetups, quarterly seminars, and an annual conference for our members. These events provide excellent opportunities to network with fellow engineers, learn from industry experts, and stay updated on the latest trends and technologies in various engineering fields.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
                 <Link
                  to="/join-us"
                  className="bg-engineering-600 text-white px-6 py-3 rounded-md hover:bg-engineering-700 transition-colors inline-block"
                 >
                 Become a Member
                </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {showJoinUs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowJoinUs(false)}
            >
              ✕
            </button>
            <JoinUs />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Members;
