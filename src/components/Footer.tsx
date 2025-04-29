
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading">Palakkad Engineers Connect</h2>
            <p className="text-gray-300 text-sm">
              A digital hub connecting engineers across the Palakkad district, fostering collaboration, knowledge sharing, and community building.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/engineers" className="text-gray-300 hover:text-white transition-colors">Find Engineers</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/ads" className="text-gray-300 hover:text-white transition-colors">Advertisements</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Contact Information</h3>
            <p className="text-gray-300 mb-2">Palakkad, Kerala, India</p>
            <p className="text-gray-300 mb-2">info@palakkadengineers.org</p>
            <div className="mt-4">
              <a href="mailto:info@palakkadengineers.org" className="inline-flex items-center text-engineering-300 hover:text-engineering-200 transition-colors">
                <Mail size={16} className="mr-2" />
                <span>Send us an email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Palakkad Engineers Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
