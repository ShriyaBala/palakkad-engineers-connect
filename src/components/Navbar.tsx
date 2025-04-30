
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow-sm bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-engineering-600 flex items-center justify-center">
              <span className="text-white font-bold">PE</span>
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl text-engineering-800">
              Palakkad Engineers
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors">
              Home
            </Link>
            <Link to="/advertising" className="text-gray-600 hover:text-engineering-600 transition-colors">
              Advertise
            </Link>
            <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors">
              Resources
            </Link>
            <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors">
              Events
            </Link>
            <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors">
              About Us
            </Link>
            <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors">
              Contact
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button size="sm" variant="outline">Log in</Button>
            <Button size="sm">Join Us</Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors px-4 py-2">
                Home
              </Link>
              <Link to="/advertising" className="text-gray-600 hover:text-engineering-600 transition-colors px-4 py-2">
                Advertise
              </Link>
              <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors px-4 py-2">
                Resources
              </Link>
              <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors px-4 py-2">
                Events
              </Link>
              <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors px-4 py-2">
                About Us
              </Link>
              <Link to="/" className="text-gray-600 hover:text-engineering-600 transition-colors px-4 py-2">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 px-4 pt-2">
                <Button size="sm" variant="outline" className="w-full">Log in</Button>
                <Button size="sm" className="w-full">Join Us</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
