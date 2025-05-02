import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
interface Engineer {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  specialization: string[];
  profileImage: string;
  featured: boolean;
}
const engineers: Engineer[] = [{
  id: 1,
  name: 'Rajesh Menon',
  title: 'Senior Civil Engineer',
  company: 'Kerala State Construction Corp',
  location: 'Palakkad Town',
  specialization: ['Structural Design', 'Project Management'],
  profileImage: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80&w=256',
  featured: true
}, {
  id: 2,
  name: 'Anita Krishnan',
  title: 'Electrical Engineer',
  company: 'Kerala State Electricity Board',
  location: 'Chittur',
  specialization: ['Power Systems', 'Renewable Energy'],
  profileImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256',
  featured: true
}, {
  id: 3,
  name: 'Mohammed Hasan',
  title: 'Software Engineer',
  company: 'Tech Innovators',
  location: 'Palakkad Town',
  specialization: ['Full-Stack Development', 'AI/ML'],
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
  featured: true
}, {
  id: 4,
  name: 'Lakshmi Varma',
  title: 'Mechanical Engineer',
  company: 'Precision Manufacturing Ltd',
  location: 'Kanjikode',
  specialization: ['Product Design', 'CAD/CAM'],
  profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
  featured: true
}, {
  id: 5,
  name: 'Satheesh Kumar',
  title: 'Environmental Engineer',
  company: 'EcoSolutions Kerala',
  location: 'Ottapalam',
  specialization: ['Waste Management', 'Sustainability'],
  profileImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=256',
  featured: false
}, {
  id: 6,
  name: 'Priya Nair',
  title: 'Chemical Engineer',
  company: 'Kerala Chemicals Ltd',
  location: 'Shoranur',
  specialization: ['Process Engineering', 'Quality Control'],
  profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
  featured: false
}, {
  id: 7,
  name: 'Thomas Philip',
  title: 'Agricultural Engineer',
  company: 'Kerala Agricultural Research',
  location: 'Alathur',
  specialization: ['Irrigation Systems', 'Sustainable Farming'],
  profileImage: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&q=80&w=256',
  featured: false
}, {
  id: 8,
  name: 'Divya Menon',
  title: 'Aerospace Engineer',
  company: 'Hindustan Aeronautics Limited',
  location: 'Palakkad Town',
  specialization: ['Aerodynamics', 'Aircraft Systems'],
  profileImage: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&q=80&w=256',
  featured: false
}];
const FeaturedEngineers: React.FC = () => {
  // Filter engineers to show only featured ones in the main display
  const featuredEngineers = engineers.filter(engineer => engineer.featured);
  return <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mb-8">Featured Engineers</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Meet some of the outstanding engineering professionals from our community 
          who are making significant contributions to their fields.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEngineers.map(engineer => <Card key={engineer.id} className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-48 overflow-hidden relative">
                <img src={engineer.profileImage} alt={engineer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {engineer.featured && <div className="absolute top-2 right-2">
                    <Badge className="bg-engineering-600">Featured</Badge>
                  </div>}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg">{engineer.name}</h3>
                <p className="text-sm text-engineering-700 font-medium">{engineer.title}</p>
                <p className="text-xs text-gray-600 mb-2">{engineer.company}</p>
                
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <MapPin size={12} className="mr-1" />
                  <span>{engineer.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {engineer.specialization.map((spec, index) => <span key={index} className="px-2 py-1 bg-engineering-50 text-engineering-700 rounded-full text-xs">
                      {spec}
                    </span>)}
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-engineering-100 text-gray-600 hover:text-engineering-700 transition-colors">
                    <Mail size={16} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-engineering-100 text-gray-600 hover:text-engineering-700 transition-colors">
                    <Linkedin size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>)}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/members" className="text-engineering-600 hover:text-engineering-800 font-medium underline">
            View all engineers →
          </Link>
        </div>

        
      </div>
    </div>;
};
export default FeaturedEngineers;