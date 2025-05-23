
import React from 'react';
import EnhancedFlipbook, { FlipbookPage } from './EnhancedFlipbook';
import { engineeringResourcesPages } from './FlipbookPages';
import { toast } from '@/components/ui/use-toast';
import { FileText } from 'lucide-react';

// Set the default PDF URL for the engineering community flipbook
// This would be the path to your pre-loaded PDF file
const DEFAULT_PDF_URL = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

const EngineeringPDFFlipbook: React.FC = () => {
  // Create the PDF pages from the default PDF URL
  const pdfPages: FlipbookPage[] = [
    {
      url: DEFAULT_PDF_URL,
      title: "Engineering Community PDF"
    }
  ];
  
  // Create dummy pages that match the FlipbookPage interface
  const dummyPages: FlipbookPage[] = [
    {
      url: "/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0001.jpg",
      title: "Directory Page 1"
    },
    {
      url: "/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0002.jpg",
      title: "Directory Page 2"
    }
  ];
  
  // Combine PDF and existing pages
  const allPages = [...pdfPages, ...dummyPages];
  
  React.useEffect(() => {
    toast({
      title: "Engineering PDF Flipbook",
      description: "Browse through our engineering community resources",
    });
  }, []);

  return (
    <EnhancedFlipbook 
      title="Engineering Community Resources" 
      defaultPages={allPages}
      allowUpload={false} // Disable uploads since we pre-load the PDF
    />
  );
};

export default EngineeringPDFFlipbook;
