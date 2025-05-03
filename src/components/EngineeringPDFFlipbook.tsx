
import React from 'react';
import EnhancedFlipbook from './EnhancedFlipbook';
import { toast } from '@/components/ui/use-toast';
import { FileText } from 'lucide-react';
import { FlipbookPage } from './flipbook/PageDisplay';

// Set the default PDF URL for the engineering community flipbook
const DEFAULT_PDF_URL = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

const EngineeringPDFFlipbook: React.FC = () => {
  // Create sample pages for the flipbook
  const defaultPages: FlipbookPage[] = [
    {
      url: DEFAULT_PDF_URL,
      title: "Engineering Community PDF"
    }
  ];
  
  React.useEffect(() => {
    toast({
      title: "Engineering PDF Flipbook",
      description: "Browse through our engineering community resources",
    });
  }, []);

  return (
    <EnhancedFlipbook 
      title="Engineering Community Resources" 
      defaultPages={defaultPages}
      allowUpload={false} // Disable uploads since we pre-load the PDF
    />
  );
};

export default EngineeringPDFFlipbook;
