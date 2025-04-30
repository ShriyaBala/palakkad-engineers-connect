
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import EnhancedAdvertisements from '@/components/EnhancedAdvertisements';
import EnhancedSearch from '@/components/EnhancedSearch';
import FeaturedEngineers from '@/components/FeaturedEngineers';
import EnhancedFlipbook from '@/components/EnhancedFlipbook';
import IndustryAds from '@/components/IndustryAds';
import { Button } from '@/components/ui/button';
import { CalendarCheck, MapPin, FileText, Users, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Monthly Technical Meetup",
      date: "May 15, 2025",
      location: "Palakkad Town Hall",
      type: "Workshop"
    },
    {
      id: 2,
      title: "Civil Engineering Symposium",
      date: "May 22, 2025",
      location: "Engineering College, Palakkad",
      type: "Conference"
    },
    {
      id: 3,
      title: "Electrical Engineers Association Meeting",
      date: "May 29, 2025",
      location: "Hotel Indraprastha, Palakkad",
      type: "Meeting"
    }
  ];

  return (
    <Layout>
      <HeroSection />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-engineering-50 border-engineering-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-engineering-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-engineering-600" />
                  </div>
                  <h2 className="text-xl font-bold">Member Services</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Access exclusive benefits, networking opportunities, and professional development resources 
                  as a member of Palakkad Engineers Association.
                </p>
                <Link to="/become-member">
                  <Button variant="outline" className="w-full">Join Now</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-kerala-50 border-kerala-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-kerala-100 p-3 rounded-full">
                    <Bell className="h-6 w-6 text-kerala-600" />
                  </div>
                  <h2 className="text-xl font-bold">Latest Updates</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Stay informed about the latest developments, news, and announcements 
                  from the Palakkad Engineering community.
                </p>
                <Link to="/news">
                  <Button variant="outline" className="w-full">View Updates</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-bold">Find Engineers</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Easily search for qualified engineering professionals in Palakkad district
                  by location, specialization, or expertise.
                </p>
                <Link to="/engineers">
                  <Button variant="outline" className="w-full">Search Directory</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="section-heading mb-4 md:mb-0">Upcoming Events</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarCheck size={18} />
              <span>View All Events</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <span className="bg-engineering-100 text-engineering-800 px-2 py-1 rounded text-xs">
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <CalendarCheck size={16} className="mr-2 text-engineering-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-engineering-600" />
                    <span>{event.location}</span>
                  </div>
                  <Button variant="ghost" className="w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-8">Featured Advertisements</h2>
          <EnhancedAdvertisements />
          <div className="text-center mt-8">
            <Link to="/advertising">
              <Button variant="outline" className="border-engineering-500 text-engineering-600 hover:bg-engineering-50">
                Learn About Advertising With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Add the new IndustryAds component for industry-specific advertisements */}
      <IndustryAds />
      
      <EnhancedSearch />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="section-heading mb-4 md:mb-0">Engineering Resources</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText size={18} />
              <span>Browse All Resources</span>
            </Button>
          </div>
          <EnhancedFlipbook title="District Engineering Resources" />
        </div>
      </section>
      
      <FeaturedEngineers />
      
      <section className="py-16 bg-engineering-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 font-heading">Join Our Palakkad District Engineers Community</h2>
          <p className="text-engineering-100 mb-8 max-w-2xl mx-auto">
            Connect with fellow engineers, access valuable resources, and stay updated with the latest 
            developments in the engineering community of Palakkad district.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-engineering-800 hover:bg-gray-100 flex items-center gap-2">
              <Users size={18} />
              <span>Become a Member</span>
            </Button>
            <Link to="/advertising">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 flex items-center gap-2">
                <FileText size={18} />
                <span>Advertise With Us</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
