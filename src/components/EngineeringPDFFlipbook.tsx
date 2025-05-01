
import React from 'react';
import EnhancedFlipbook from './EnhancedFlipbook';
import { engineeringResourcesPages } from './FlipbookPages';
import { toast } from '@/components/ui/use-toast';
import { FileText } from 'lucide-react';

// Set the default PDF URL for the engineering community flipbook
// This would be the path to your pre-loaded PDF file
const DEFAULT_PDF_URL = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

interface FlipbookPage {
  id: number;
  type: 'image' | 'pdf';
  content: React.ReactNode;
}

const EngineeringPDFFlipbook: React.FC = () => {
  // Create the PDF pages from the default PDF URL
  const pdfPages: FlipbookPage[] = [
    {
      id: Date.now(),
      type: 'pdf',
      content: (
        <div className="h-full w-full">
          <iframe 
            src={`${DEFAULT_PDF_URL}#toolbar=0`} 
            className="w-full h-full" 
            title="Engineering Community PDF"
          ></iframe>
        </div>
      )
    }
  ];
  
  // Combine PDF and existing sample pages
  const allPages = [...pdfPages, ...engineeringResourcesPages];
  
  React.useEffect(() => {
    toast({
      title: "Engineering PDF Flipbook",
      description: "Browse through our engineering community resources",
      icon: <FileText className="h-4 w-4" />
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
