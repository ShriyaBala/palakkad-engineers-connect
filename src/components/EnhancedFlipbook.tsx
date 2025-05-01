
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Import refactored components
import ZoomControls from './flipbook/ZoomControls';
import UploadControls from './flipbook/UploadControls';
import NavigationControls from './flipbook/NavigationControls';
import PageDisplay from './flipbook/PageDisplay';
import EmptyFlipbook from './flipbook/EmptyFlipbook';

interface FlipbookPage {
  id: number;
  type: 'image' | 'pdf';
  content: React.ReactNode | string;
}

interface EnhancedFlipbookProps {
  title: string;
  defaultPages?: FlipbookPage[];
  allowUpload?: boolean;
}

const EnhancedFlipbook: React.FC<EnhancedFlipbookProps> = ({
  title,
  defaultPages = [],
  allowUpload = true
}) => {
  const [pages, setPages] = useState<FlipbookPage[]>(defaultPages);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const zoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };
  
  const zoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const handleAddPages = (newPages: FlipbookPage[]) => {
    setPages([...pages, ...newPages]);
  };
  
  const removePage = (pageId: number) => {
    const newPages = pages.filter(page => page.id !== pageId);
    setPages(newPages);

    // Adjust current page if needed
    if (currentPage >= newPages.length) {
      setCurrentPage(Math.max(0, newPages.length - 1));
    }
    
    toast({
      title: "Page removed",
      description: "The page has been removed from the flipbook"
    });
  };
  
  const downloadCurrentPage = () => {
    const currentPageContent = pages[currentPage];
    if (!currentPageContent) return;

    // For image content that has a URL in it
    const imgElement = document.querySelector('.flipbook-page-content img') as HTMLImageElement;
    if (imgElement && imgElement.src) {
      const a = document.createElement('a');
      a.href = imgElement.src;
      a.download = `engineer-community-page-${currentPage + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // For PDF content
    const iframeElement = document.querySelector('.flipbook-page-content iframe') as HTMLIFrameElement;
    if (iframeElement && iframeElement.src) {
      window.open(iframeElement.src, '_blank');
      return;
    }
    
    toast({
      title: "Download failed",
      description: "Could not download the current page",
      variant: "destructive"
    });
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mb-8">{title}</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <ZoomControls 
            zoomLevel={zoomLevel}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
          />
          
          {allowUpload && (
            <UploadControls onAddPages={handleAddPages} />
          )}
          
          {pages.length > 0 && (
            <Button onClick={downloadCurrentPage} variant="outline" size="sm" className="flex items-center gap-1">
              <Download size={16} />
              <span>Download</span>
            </Button>
          )}
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          {pages.length === 0 ? (
            <EmptyFlipbook allowUpload={allowUpload} />
          ) : (
            <PageDisplay
              currentPage={currentPage}
              totalPages={pages.length}
              zoomLevel={zoomLevel}
              content={pages[currentPage].content}
              allowPageRemoval={allowUpload}
              onRemovePage={() => removePage(pages[currentPage].id)}
            />
          )}
          
          {pages.length > 0 && (
            <NavigationControls 
              currentPage={currentPage}
              totalPages={pages.length}
              onNextPage={nextPage}
              onPrevPage={prevPage}
              onPageSelect={setCurrentPage}
              pages={pages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedFlipbook;
