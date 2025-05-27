
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NavigationControls from './flipbook/NavigationControls';
import PageDisplay from './flipbook/PageDisplay';
import EmptyFlipbook from './flipbook/EmptyFlipbook';
import ZoomControls from './flipbook/ZoomControls';
import UploadControls from './flipbook/UploadControls';

export interface FlipbookPage {
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
    return <EmptyFlipbook allowUpload={allowUpload} />;
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
          {pages[currentPage - 1] && (
            <div 
              style={{ 
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.3s ease'
              }}
              className="w-full max-w-2xl"
            >
              <img 
                src={pages[currentPage - 1].url} 
                alt={pages[currentPage - 1].title || `Page ${currentPage}`}
                className="max-w-full shadow-lg"
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center p-4 border-t">
          <div className="text-sm">
            Page {currentPage} of {pages.length}
          </div>
          
          <div className="flex space-x-3">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline" 
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
              >
                -
              </Button>
              <span className="text-sm">{Math.round(zoomLevel * 100)}%</span>
              <Button
                variant="outline" 
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
              >
                +
              </Button>
              <Button
                variant="ghost" 
                size="sm"
                onClick={handleResetZoom}
              >
                Reset
              </Button>
            </div>
            
            {allowUpload && (
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*,application/pdf"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Add Pages
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemovePage}
                  disabled={pages.length === 0}
                >
                  Remove Page
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedFlipbook;
