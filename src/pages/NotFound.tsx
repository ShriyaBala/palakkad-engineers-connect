
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold text-engineering-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Button asChild className="flex items-center gap-2">
          <Link to="/">
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
        </Button>
        <div className="mt-12">
          <img
            src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&q=80&w=500"
            alt="Engineers working"
            className="rounded-lg shadow-md opacity-75"
          />
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
