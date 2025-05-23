import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, FileText, Video, Mail, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface Marketer {
  id: number;
  name: string;
  phoneNumber: string;
  type: 'video' | 'pdf' | 'basic';
  mediaUrl?: string;
  industry?: string;
  priority: number;
  description?: string;
  email?: string;
  website?: string;
  location?: string;
  specialOffer?: string;
}
const marketers: Marketer[] = [{
  id: 1,
  name: 'Kerala Tiles Market',
  phoneNumber: '+91 9876543210',
  type: 'pdf',
  mediaUrl: '/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0006.jpg',
  industry: 'Tiles',
  priority: 10,
  
}, {
  id: 2,
  name: 'TechAutomation India',
  phoneNumber: '+91 9876543211',
  type: 'pdf',
  mediaUrl: 'https://www.adbanao.com/img/industryimages_new/tiles-sanitary-fittings/tiles-sanitary-fittings.webp',
  industry: 'Automation',
  priority: 9,
  description: 'Smart home and industrial automation solutions. Full installation service available.',
  email: 'techautomation@example.com',
  website: 'www.techautomation.in',
  location: 'Kanjikode Industrial Area',
  specialOffer: 'Free installation on purchases above ₹15,000'
}, {
  id: 3,
  name: 'MetalCraft Industries',
  phoneNumber: '+91 9876543212',
  type: 'pdf',
  mediaUrl: 'https://www.adbanao.com/img/industryimages_new/tiles-sanitary-fittings/tiles-sanitary-fittings.webp',
  priority: 7,
  description: 'Quality metal fabrication and custom metalwork solutions for residential and commercial projects.',
  email: 'info@metalcraft.co.in',
  location: 'Palakkad Town, Market Road'
}, {
  id: 4,
  name: 'Palakkad Builders',
  phoneNumber: '+91 9876543213',
  type: 'pdf',
  mediaUrl: 'https://www.adbanao.com/img/industryimages_new/tiles-sanitary-fittings/tiles-sanitary-fittings.webp',
  industry: 'Tiles',
  priority: 6,
  description: 'Trusted builders with over 15 years of experience in residential and commercial construction.',
  website: 'www.palakkadbuilders.com',
  location: 'Chittur, Main Highway'
}, {
  id: 5,
  name: 'SmartFactory Solutions',
  phoneNumber: '+91 9876543214',
  type: 'pdf',
  mediaUrl: 'https://www.adbanao.com/img/industryimages_new/tiles-sanitary-fittings/tiles-sanitary-fittings.webp',
  industry: 'Manufacturing',
  priority: 8,
  description: 'Advanced factory automation systems and solutions for increased productivity.',
  email: 'contact@smartfactory.in',
  website: 'www.smartfactory.in',
  location: 'Kanjikode, Tech Park Road',
  specialOffer: 'Industrial IoT solutions at special rates'
}, {
  id: 6,
  name: 'DesignPro Architects',
  phoneNumber: '+91 9876543215',
  type: 'pdf',
  mediaUrl: 'https://www.adbanao.com/img/industryimages_new/tiles-sanitary-fittings/tiles-sanitary-fittings.webp',
  industry: 'Architecture',
  priority: 5,
  description: 'Award-winning architectural services for residential and commercial projects.',
  email: 'designs@designpro.com',
  location: 'Ottapalam, College Road'
}];
interface MarketersShowcaseProps {
  title?: string;
}
const MarketersShowcase: React.FC<MarketersShowcaseProps> = ({
  title = "Our Marketing Partners"
}) => {
  // Sort marketers by priority (highest first)
  const sortedMarketers = [...marketers].sort((a, b) => b.priority - a.priority);
  return (
  <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
    <img
      src="/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0006.jpg"
      alt="PDF Advertisement Page"
      style={{ display: 'block' }}
    />
  </section>
);
};
export default MarketersShowcase;