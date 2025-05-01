import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, FileText } from 'lucide-react';

interface FlipbookPage {
  id: number;
  type?: 'image' | 'pdf';
  content: React.ReactNode;
}

interface FlipbookProps {
  title: string;
  pages: FlipbookPage[];
}

const Flipbook: React.FC<FlipbookProps> = ({ title, pages }) => {
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

  const downloadPDF = () => {
    // If the current page is a PDF (from an iframe), open it in a new tab
    const iframeElement = document.querySelector('.flipbook-container iframe') as HTMLIFrameElement;
    if (iframeElement && iframeElement.src) {
      window.open(iframeElement.src.split('#')[0], '_blank');
    } else {
      // Otherwise, try to find any PDF in the pages
      const pdfPage = pages.find(page => page.type === 'pdf');
      if (pdfPage) {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.srcdoc = pdfPage.content as string;
        const embeddedIframe = iframe.contentDocument?.querySelector('iframe');
        if (embeddedIframe && embeddedIframe.src) {
          window.open(embeddedIframe.src.split('#')[0], '_blank');
        }
        document.body.removeChild(iframe);
      }
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mb-8">{title}</h2>
        
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={zoomOut}
              disabled={zoomLevel <= 0.5}
              className="flex items-center gap-1"
            >
              <ZoomOut size={16} />
              <span>Zoom Out</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={zoomIn}
              disabled={zoomLevel >= 2}
              className="flex items-center gap-1"
            >
              <ZoomIn size={16} />
              <span>Zoom In</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={downloadPDF}
            >
              <Download size={16} />
              <span>Download PDF</span>
            </Button>
          </div>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          {/* Flipbook container with perspective for 3D effect */}
          <div 
            className="flipbook-container relative w-full aspect-[3/2] bg-white rounded-lg flipbook-shadow overflow-hidden"
            style={{ perspective: '1500px' }}
          >
            {/* Current Page */}
            <div 
              className="overflow-hidden"
              style={{ 
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="bg-white p-6 h-full overflow-auto">
                {pages[currentPage].content}
              </div>
            </div>
            
            {/* Page turning overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-black/5"></div>
            
            {/* Page number indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800/70 text-white text-xs px-2 py-1 rounded-full">
              Page {currentPage + 1} of {pages.length}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={24} />
          </Button>
          
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md"
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
        
        {/* Page thumbnails */}
        <div className="max-w-2xl mx-auto mt-6 overflow-x-auto">
          <div className="flex space-x-2 px-4">
            {pages.map((page, index) => (
              <button
                key={page.id}
                className={`min-w-16 h-12 border-2 rounded overflow-hidden transition-all ${
                  currentPage === index 
                    ? 'border-engineering-600 shadow-md' 
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
                onClick={() => setCurrentPage(index)}
              >
                <div className="w-full h-full bg-white flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flipbook;
