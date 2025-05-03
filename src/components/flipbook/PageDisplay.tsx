
import React from 'react';

export interface FlipbookPage {
  url: string;
  title?: string;
}

export interface PageDisplayProps {
  page: FlipbookPage;
  zoomLevel: number;
}

const PageDisplay: React.FC<PageDisplayProps> = ({ page, zoomLevel }) => {
  return (
    <div 
      className="relative"
      style={{
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'center center',
        transition: 'transform 0.3s ease',
        height: '500px',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <img 
        src={page.url} 
        alt={page.title || 'Flipbook page'} 
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default PageDisplay;
