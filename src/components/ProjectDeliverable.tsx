
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileDown } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProjectDeliverable: React.FC = () => {
  useEffect(() => {
    toast({
      title: "Document Ready",
      description: "The project deliverable document is ready for download.",
    });
  }, []);

  const handleDownload = () => {
    // In a real implementation, this would generate or fetch a Word document
    // For now, we just show a toast notification
    toast({
      title: "Download Started",
      description: "Your document would start downloading in a real implementation.",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-engineering-800">
        Project Deliverable Document
      </h1>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">1. Executive Summary</h2>
          <p className="text-gray-700 mb-4">
            The Palakkad Engineers Connect platform is a comprehensive web application designed to serve 
            the engineering community in Palakkad district, Kerala. It provides a professional network 
            for engineers, a searchable directory, resource sharing, and advertising opportunities. 
            The platform aims to foster collaboration, knowledge sharing, and professional growth within 
            the local engineering ecosystem.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">2. Project Overview</h2>
          <p className="text-gray-700 mb-4">
            <strong>Purpose:</strong> To create a digital hub for the Palakkad engineering community that facilitates 
            networking, resource sharing, and professional development.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Target Audience:</strong> Engineers, engineering firms, educational institutions, and businesses 
            in the Palakkad district of Kerala.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Project Goals:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Create a searchable directory of engineers categorized by specialization, location, and expertise</li>
            <li>Develop a resource center for technical documents and educational materials</li>
            <li>Provide a platform for advertising engineering services and products</li>
            <li>Establish a community network for professional growth and collaboration</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">3. Technology Stack</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Frontend Framework:</strong> React with TypeScript</li>
            <li><strong>Styling:</strong> Tailwind CSS</li>
            <li><strong>UI Components:</strong> shadcn/ui</li>
            <li><strong>Icons:</strong> Lucide React</li>
            <li><strong>Build Tool:</strong> Vite</li>
            <li><strong>PDF Handling:</strong> React-PDF for document rendering</li>
            <li><strong>Data Visualization:</strong> Recharts</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">4. Features and Functionality</h2>
          
          <h3 className="text-lg font-semibold mb-2">4.1 Engineer Directory</h3>
          <p className="text-gray-700 mb-4">
            A comprehensive, searchable database of engineers in the Palakkad district with filtering 
            capabilities by name, location, and specialization.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">4.2 Resource Center</h3>
          <p className="text-gray-700 mb-4">
            An interactive flipbook interface for browsing engineering resources, documentation, and 
            educational materials with zoom and navigation controls.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">4.3 Advertising Platform</h3>
          <p className="text-gray-700 mb-4">
            Multiple advertising tiers with different visibility options for businesses targeting the 
            engineering community.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">4.4 Membership System</h3>
          <p className="text-gray-700 mb-4">
            Different membership tiers (Regular and Corporate) with varying benefits and features.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">4.5 Events Calendar</h3>
          <p className="text-gray-700 mb-4">
            Upcoming engineering events, workshops, and community meetings in the Palakkad area.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">5. User Interface</h2>
          <p className="text-gray-700 mb-4">
            <strong>Design Principles:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Clean, professional appearance with engineering-themed color palette</li>
            <li>Responsive design for optimal viewing on desktop and mobile devices</li>
            <li>Consistent navigation and layout patterns throughout the application</li>
            <li>Accessible components following WCAG guidelines</li>
          </ul>
          
          <p className="text-gray-700 mb-4">
            <strong>Key UI Components:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Navigation bar with main sections (Home, Members, Resources, Events, Advertising)</li>
            <li>Interactive flipbook for browsing engineering resources</li>
            <li>Search interface with multiple filtering options</li>
            <li>Cards for displaying engineer profiles and advertisements</li>
            <li>Tabbed interfaces for organizing content</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">6. Architecture</h2>
          <p className="text-gray-700 mb-4">
            The application follows a component-based architecture with React, organized into the following structure:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Pages:</strong> Main route components (Home, Members, Resources, Advertising)</li>
            <li><strong>Components:</strong> Reusable UI elements organized by feature</li>
            <li><strong>Context:</strong> State management for features like search functionality</li>
            <li><strong>Hooks:</strong> Custom logic for features like mobile detection</li>
            <li><strong>UI:</strong> Base-level UI components from shadcn/ui library</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">7. Deployment Information</h2>
          <p className="text-gray-700 mb-4">
            <strong>Current Deployment:</strong> The application is currently deployed on Lovable's hosting platform.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Domain:</strong> Custom domain setup available for production deployment.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Hosting Requirements:</strong> The application is a static site that can be hosted on any platform 
            that supports static site hosting (Vercel, Netlify, etc.).
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">8. Future Enhancements</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Integration with authentication system for secure member accounts</li>
            <li>Online payment processing for membership fees and advertising packages</li>
            <li>Interactive job board for engineering opportunities</li>
            <li>Forum or discussion section for community engagement</li>
            <li>Mobile application version for improved accessibility</li>
            <li>Analytics dashboard for administrators</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-engineering-600 hover:bg-engineering-700"
        >
          <FileDown size={18} />
          <span>Download Project Deliverable (DOCX)</span>
        </Button>
      </div>
    </div>
  );
};

export default ProjectDeliverable;
