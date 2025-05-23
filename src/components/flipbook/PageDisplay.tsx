
import React from 'react';
import { FlipbookPage } from '../EnhancedFlipbook';

export interface PageDisplayProps {
  page?: FlipbookPage;
  zoomLevel?: number;
}

const PageDisplay: React.FC<PageDisplayProps> = ({ 
  page,
  zoomLevel = 1
}) => {
  if (!page) {
    return <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">No page to display</span>
    </div>;
  }

  const isPDF = page.url.endsWith('.pdf');

  return (
    <div 
      className="w-full max-w-4xl mx-auto"
      style={{ 
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'center top',
        transition: 'transform 0.3s ease'
      }}
    >
      {isPDF ? (
        <iframe 
          src={`${page.url}#toolbar=0`}
          className="w-full h-[600px] border-0 shadow-lg"
          title={page.title || "PDF Document"}
          style={{ display: 'block' }}
        />
      ) : (
        <img 
          src={page.url}
          alt={page.title || "Flipbook Page"}
          className="w-full shadow-lg mx-auto"
          style={{ display: 'block' }}
        />
      )}
    </div>
  );
};

export default PageDisplay;
