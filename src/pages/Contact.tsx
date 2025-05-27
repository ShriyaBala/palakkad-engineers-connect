
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-engineering-800">
            Contact Us
          </h1>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Have questions about the Palakkad Engineers Association? Want to become a member or 
            collaborate on initiatives? We'd love to hear from you.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-engineering-100 p-3 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-engineering-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 mb-1">Main Office</p>
                <p className="font-medium">+91 495 272 1234</p>
                <p className="text-gray-600 mb-1 mt-3">Membership Services</p>
                <p className="font-medium">+91 495 272 5678</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-engineering-100 p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-engineering-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 mb-1">General Inquiries</p>
                <p className="font-medium">info@palakkadengineers.org</p>
                <p className="text-gray-600 mb-1 mt-3">Membership</p>
                <p className="font-medium">members@palakkadengineers.org</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-engineering-100 p-3 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-engineering-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Visit Us</h3>
                <p className="text-gray-600">Engineers Building</p>
                <p className="text-gray-600">42 Tech Avenue, Civil Station</p>
                <p className="text-gray-600">Palakkad, Kerala 678001</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message here..." rows={5} />
                  </div>
                  
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
            
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-4">Office Hours</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-engineering-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Monday - Friday</p>
                        <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-engineering-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Saturday</p>
                        <p className="text-gray-600">10:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-engineering-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Sunday</p>
                        <p className="text-gray-600">Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125064.13931263746!2d76.60168766031787!3d10.768379094867519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7dc184f33534b%3A0x5f6b3cbeffa05dfc!2sPalakkad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1713778091686!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Palakkad Engineers Association office location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16 p-8 bg-engineering-50 rounded-lg text-center">
            <h3 className="text-xl font-medium mb-3">Emergency Technical Assistance</h3>
            <p className="text-gray-600 mb-4">
              For engineers seeking urgent technical consultation or assistance with critical infrastructure issues
            </p>
            <p className="text-xl font-bold">Hotline: +91 495 272 9999</p>
            <p className="text-sm text-gray-500 mt-2">Available 24/7 for registered members</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
