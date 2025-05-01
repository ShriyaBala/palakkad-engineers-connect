
import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFFlipbookProps {
  pdfUrl: string;
  title?: string;
}

// Individual page component for the flipbook
const Page = React.forwardRef<HTMLDivElement, { content: React.ReactNode }>(
  ({ content }, ref) => {
    return (
      <div className="page bg-white shadow-md" ref={ref}>
        <div className="page-content">{content}</div>
      </div>
    );
  }
);

Page.displayName = 'Page';

const PDFFlipbook: React.FC<PDFFlipbookProps> = ({ pdfUrl, title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const bookRef = useRef<any>(null);

  // Create an array of pages for the PDF viewer
  // For simplicity, we'll use 10 pages in this example
  // In a real app, you would dynamically determine the number of pages from the PDF
  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => ({
    id: i,
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <iframe
          src={`${pdfUrl}#page=${i + 1}&view=FitH`}
          className="w-full h-full border-none"
          title={`Page ${i + 1}`}
          onLoad={() => {
            // This is a simple way to check if the PDF is loaded
            // In a real app, you might want to use the PDF.js events
            setTotalPages((prev) => Math.max(prev, 10));
          }}
        />
      </div>
    )
  }));

  const nextPage = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipPrev();
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

  const handlePageChange = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-center text-engineering-800">
          {title}
        </h3>
      )}
      
      <div className="flex justify-center mb-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          className="flex items-center gap-1"
        >
          <ZoomOut size={16} />
          <span>Zoom Out</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          className="flex items-center gap-1"
        >
          <ZoomIn size={16} />
          <span>Zoom In</span>
        </Button>
      </div>
      
      <div className="relative">
        {/* Navigation buttons */}
        <Button
          variant="ghost"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md z-10"
          onClick={prevPage}
        >
          <ChevronLeft size={24} />
        </Button>
        
        <Button
          variant="ghost"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md z-10"
          onClick={nextPage}
        >
          <ChevronRight size={24} />
        </Button>
        
        {/* The flipbook container */}
        <div 
          className="flip-book-container"
          style={{ 
            height: '600px',
            perspective: '1500px',
            transformStyle: 'preserve-3d',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease'
          }}
        >
          <HTMLFlipBook
            width={400}
            height={600}
            size="stretch"
            minWidth={300}
            maxWidth={800}
            minHeight={400}
            maxHeight={800}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startPage={0}
            className="flipbook"
            style={{ backgroundColor: '#f7f7f7' }}
            ref={bookRef}
            onFlip={handlePageChange}
            showCover={true}
          >
            {pages.map((page) => (
              <Page key={page.id} content={page.content} />
            ))}
          </HTMLFlipBook>
        </div>
      </div>
      
      <div className="mt-4 text-center text-gray-600">
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  );
};

export default PDFFlipbook;
