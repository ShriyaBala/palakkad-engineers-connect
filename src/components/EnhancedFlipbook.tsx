
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import NavigationControls from './flipbook/NavigationControls';
import PageDisplay from './flipbook/PageDisplay';
import EmptyFlipbook from './flipbook/EmptyFlipbook';
import ZoomControls from './flipbook/ZoomControls';
import UploadControls from './flipbook/UploadControls';

interface FlipbookPage {
  url: string;
  title?: string;
}

interface EnhancedFlipbookProps {
  title?: string;
  defaultPages?: FlipbookPage[];
  allowUpload?: boolean; 
}

const EnhancedFlipbook: React.FC<EnhancedFlipbookProps> = ({ 
  title = "Engineering Directory", 
  defaultPages = [], 
  allowUpload = true
}) => {
  const [pages, setPages] = useState<FlipbookPage[]>(defaultPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const flipbookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset to first page when pages change
    setCurrentPage(1);
  }, [pages]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newPages: FlipbookPage[] = [];
    
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      newPages.push({
        url,
        title: file.name
      });
    });
    
    setPages((prev) => [...prev, ...newPages]);
  };

  const handleRemovePage = () => {
    if (pages.length === 0) return;
    
    const newPages = [...pages];
    newPages.splice(currentPage - 1, 1);
    
    setPages(newPages);
    setCurrentPage((prev) => Math.min(prev, newPages.length || 1));
  };

  if (pages.length === 0) {
    return <EmptyFlipbook onFileUpload={handleFileUpload} allowUpload={allowUpload} />;
  }

  return (
    <Card className="w-full overflow-hidden border shadow-md">
      <CardContent className="p-0">
        <div className="bg-engineering-600 text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex space-x-2">
            <NavigationControls 
              currentPage={currentPage} 
              totalPages={pages.length} 
              onPrevPage={handlePrevPage} 
              onNextPage={handleNextPage} 
            />
          </div>
        </div>
        
        <div ref={flipbookRef} className="relative w-full bg-gray-100 flex justify-center p-4">
          <PageDisplay 
            page={pages[currentPage - 1]} 
            zoomLevel={zoomLevel} 
          />
        </div>
        
        <div className="flex justify-between items-center p-4 border-t">
          <div className="text-sm">
            Page {currentPage} of {pages.length}
          </div>
          
          <div className="flex space-x-3">
            <ZoomControls 
              zoomLevel={zoomLevel}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
            />
            
            {allowUpload && (
              <UploadControls 
                onFileUpload={handleFileUpload} 
                onRemovePage={handleRemovePage} 
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedFlipbook;
