
import React from 'react';
import EnhancedFlipbook from './EnhancedFlipbook';
import { engineeringResourcesPages } from './FlipbookPages';
import { toast } from '@/components/ui/use-toast';

interface EngineeringPDFFlipbookProps {
  pdfUrl?: string;
}

const EngineeringPDFFlipbook: React.FC<EngineeringPDFFlipbookProps> = ({ pdfUrl }) => {
  // Sample PDF pages for demonstration
  const pdfPages = pdfUrl ? [
    {
      id: Date.now(),
      type: 'pdf' as const,
      content: (
        <div className="h-full w-full">
          <iframe 
            src={`${pdfUrl}#toolbar=0`} 
            className="w-full h-full" 
            title="Engineering Community PDF"
          ></iframe>
        </div>
      )
    }
  ] : [];
  
  // Combine PDF and existing pages
  const allPages = [...pdfPages, ...engineeringResourcesPages];
  
  React.useEffect(() => {
    if (!pdfUrl && allPages.length > 0) {
      toast({
        title: "PDF Flipbook Ready",
        description: "You can view sample engineering resources now. Upload your own PDF for a custom experience."
      });
    } else if (pdfUrl) {
      toast({
        title: "PDF Loaded Successfully",
        description: "Your engineering community PDF has been loaded into the flipbook."
      });
    }
  }, [pdfUrl]);

  return (
    <EnhancedFlipbook 
      title="Engineering Community Resources" 
      defaultPages={allPages}
      allowUpload={true}
    />
  );
};

export default EngineeringPDFFlipbook;
