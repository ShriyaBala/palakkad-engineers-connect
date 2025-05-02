import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Events = () => {
  // Dummy data for events
  const upcomingEvents = [{
    id: 1,
    title: "Annual Engineers Conference 2025",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Grand Hotel, Palakkad",
    category: "Conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070",
    attendees: 250,
    description: "Join us for the premier engineering event in Palakkad featuring keynote speakers from across India discussing the latest trends and innovations in engineering."
  }, {
    id: 2,
    title: "Technical Workshop: Advanced IoT Applications",
    date: "June 25, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Engineering College, Palakkad",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1581092921461-eab10380dbba?auto=format&fit=crop&q=80&w=2070",
    attendees: 50,
    description: "A hands-on workshop where participants will learn to design and implement IoT solutions for real-world engineering challenges."
  }, {
    id: 3,
    title: "Monthly Engineers Meetup",
    date: "July 5, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Cafe Engineer, Palakkad Town",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2069",
    attendees: 35,
    description: "An informal gathering of local engineers to network, share experiences, and discuss current projects in a relaxed environment."
  }, {
    id: 4,
    title: "Civil Engineering Symposium",
    date: "July 18, 2025",
    time: "9:30 AM - 4:30 PM",
    location: "Municipal Town Hall, Palakkad",
    category: "Symposium",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=2070",
    attendees: 120,
    description: "A symposium focusing on sustainable urban infrastructure development with case studies from successful projects in Kerala."
  }];
  const pastEvents = [{
    id: 101,
    title: "Renewable Energy Solutions Workshop",
    date: "April 10, 2025",
    location: "Green Energy Center, Palakkad",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1509390144018-eeaf65052242?auto=format&fit=crop&q=80&w=2072"
  }, {
    id: 102,
    title: "Young Engineers Innovation Contest",
    date: "March 22, 2025",
    location: "Palakkad College of Engineering",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
  }, {
    id: 103,
    title: "Industry 4.0 Conference",
    date: "February 15, 2025",
    location: "Tech Hub, Palakkad",
    category: "Conference",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070"
  }];
  return <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-engineering-800">
            Events & Programs
          </h1>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Stay connected with the Palakkad engineering community through our regular events, 
            workshops, conferences, and social gatherings.
          </p>
          
          <div className="mb-12 bg-engineering-700 text-white p-8 rounded-lg">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Featured Event: Annual Engineers Conference 2025</h2>
                <p className="mb-4 text-engineering-100">
                  Join us for the premier engineering event in Palakkad featuring keynote speakers from across India discussing the latest trends and innovations in engineering.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-engineering-300" />
                    <span>June 15, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-engineering-300" />
                    <span>Grand Hotel, Palakkad</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-engineering-300" />
                    <span>250+ attendees expected</span>
                  </div>
                </div>
                <Button className="bg-white text-engineering-700 hover:bg-gray-100">Register Now</Button>
              </div>
              <div className="md:w-1/3">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070" alt="Annual Conference" className="rounded-lg shadow-lg object-cover w-full h-48" />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map(event => <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <span className="bg-engineering-100 text-engineering-800 px-2 py-1 rounded text-xs">
                          {event.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={16} className="mr-2 text-gray-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={16} className="mr-2 text-gray-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users size={16} className="mr-2 text-gray-400" />
                          <span>{event.attendees} expected attendees</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pastEvents.map(event => <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-36 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-base">{event.title}</h3>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {event.category}
                        </span>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-xs text-gray-600">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <MapPin size={14} className="mr-1 text-gray-400" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full text-xs">View Photos</Button>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center p-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium mb-4">Event Calendar Coming Soon</h3>
                    <p className="text-gray-600">
                      We're working on integrating a full calendar feature to help you better plan your attendance at our events.
                      Check back soon for updates!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          
        </div>
      </div>
    </Layout>;
};
export default Events;