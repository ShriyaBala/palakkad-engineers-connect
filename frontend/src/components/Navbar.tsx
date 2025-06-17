import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
    setRole(localStorage.getItem('role'));
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(prev => (prev === dropdown ? null : dropdown));
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="shadow-sm bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-md flex items-center justify-center">
              <img
                alt="LENSFED"
                className="h-8 w-8 object-contain"
                src="/lovable-uploads/1cf1e315-d53c-496f-a41f-75635c3a7166.jpg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-engineering-800">LENSFED</span>
              <span className="text-xs text-gray-500">Palakkad</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-engineering-600 transition-colors px-2 py-1">Home</Link>

            {/* Dropdowns */}
            <Dropdown label="About" toggleDropdown={toggleDropdown} activeDropdown={activeDropdown} id="about">
              <Link to="/about" className="block px-4 py-2 hover:bg-gray-50">About Us</Link>
            </Dropdown>

            <Dropdown label="Members" toggleDropdown={toggleDropdown} activeDropdown={activeDropdown} id="members">
              <Link to="/members" className="block px-4 py-2 hover:bg-gray-50">Members</Link>
            </Dropdown>

            <Link to="/events" className="text-gray-700 hover:text-engineering-600 transition-colors px-2 py-1">Events</Link>
            <Link to="/resources" className="text-gray-700 hover:text-engineering-600 transition-colors px-2 py-1">Resources</Link>
            <Link to="/advertising" className="text-gray-700 hover:text-engineering-600 transition-colors px-2 py-1">Advertise</Link>
            <Link to="/contact" className="text-gray-700 hover:text-engineering-600 transition-colors px-2 py-1">Contact</Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button size="sm" variant="outline">Dashboard</Button>
                </Link>
                {role === 'admin' && (
                  <Link to="/admin-dashboard">
                    <Button size="sm" variant="secondary">Admin Dashboard</Button>
                  </Link>
                )}
                <Button size="sm" variant="destructive" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" variant="outline">Log in</Button>
                </Link>
                <Link to="/join" className="bg-engineering-600 text-white px-6 py-3 rounded-md hover:bg-engineering-700 transition-colors inline-block">
                  Join Us
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-1">
              <Link to="/" className="text-gray-700 hover:text-engineering-600 transition-colors px-4 py-2">Home</Link>

              {/* About Dropdown */}
              <MobileDropdown
                label="About"
                id="mobile-about"
                activeDropdown={activeDropdown}
                toggleDropdown={toggleDropdown}
              >
                <Link to="/about" className="block py-2 hover:text-engineering-600">About Us</Link>
              </MobileDropdown>
              {/* Members Mobile Dropdown */}
<button
  onClick={() => toggleDropdown('mobile-members')}
  className="flex items-center justify-between px-4 py-2 text-gray-700 hover:text-engineering-600 w-full"
>
  <span>Members</span>
  <ChevronDown
    size={16}
    className={activeDropdown === 'mobile-members' ? 'rotate-180 transition-transform' : 'transition-transform'}
  />
</button>
{activeDropdown === 'mobile-members' && (
  <div className="pl-6 space-y-1">
    <Link to="/members" className="block py-2 hover:text-engineering-600">Members</Link>
  </div>
)}


              <Link to="/events" className="text-gray-700 hover:text-engineering-600 transition-colors px-4 py-2">Events</Link>
              <Link to="/resources" className="text-gray-700 hover:text-engineering-600 transition-colors px-4 py-2">Resources</Link>
              <Link to="/advertising" className="text-gray-700 hover:text-engineering-600 transition-colors px-4 py-2">Advertise</Link>
              <Link to="/contact" className="text-gray-700 hover:text-engineering-600 transition-colors px-4 py-2">Contact</Link>

              <div className="flex flex-col space-y-2 px-4 pt-4 border-t mt-2">
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard">
                      <Button size="sm" variant="outline" className="w-full">Dashboard</Button>
                    </Link>
                    {role === 'admin' && (
                      <Link to="/admin-dashboard">
                        <Button size="sm" variant="secondary" className="w-full">Admin Dashboard</Button>
                      </Link>
                    )}
                    <Button size="sm" variant="destructive" className="w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button size="sm" variant="outline" className="w-full">Log in</Button>
                    </Link>
                    <Link to="/join">
  <Button size="sm" className="w-full">Join Us</Button>
</Link>

                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// 🧩 Desktop Dropdown Component
const Dropdown = ({ label, children, toggleDropdown, activeDropdown, id }) => (
  <div className="relative">
    <button
      className="flex items-center space-x-1 text-gray-700 hover:text-engineering-600 transition-colors px-2 py-1"
      onClick={() => toggleDropdown(id)}
    >
      <span>{label}</span>
      <ChevronDown size={16} />
    </button>
    {activeDropdown === id && (
      <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-48 z-50">
        {children}
      </div>
    )}
  </div>
);

// 🧩 Mobile Dropdown Component
const MobileDropdown = ({ label, children, toggleDropdown, activeDropdown, id }) => (
  <>
    <button
      className="flex items-center justify-between text-gray-700 hover:text-engineering-600 transition-colors px-4 py-2 text-left w-full"
      onClick={() => toggleDropdown(id)}
    >
      <span>{label}</span>
      <ChevronDown
        size={16}
        className={activeDropdown === id ? 'rotate-180 transition-transform' : 'transition-transform'}
      />
    </button>
    {activeDropdown === id && (
      <div className="pl-6 space-y-1">{children}</div>
    )}
  </>
);

export default Navbar;
