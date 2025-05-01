
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PageDisplayProps {
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  content: React.ReactNode;
  allowPageRemoval?: boolean;
  onRemovePage?: () => void;
}

export const PageDisplay: React.FC<PageDisplayProps> = ({
  currentPage,
  totalPages,
  zoomLevel,
  content,
  allowPageRemoval = false,
  onRemovePage
}) => {
  return (
    <div 
      className="flipbook-container relative w-full aspect-[3/2] bg-white rounded-lg flipbook-shadow overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      <div 
        className="flipbook-page-content overflow-hidden" 
        style={{
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.3s ease'
        }}
      >
        <div className="bg-white p-6 h-full overflow-auto">
          {content}
        </div>
      </div>
      
      {/* Page turning overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-black/5"></div>
      
      {/* Page number indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800/70 text-white text-xs px-2 py-1 rounded-full">
        Page {currentPage + 1} of {totalPages}
      </div>
      
      {/* Remove page button */}
      {allowPageRemoval && onRemovePage && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2 p-1 h-8 w-8 rounded-full bg-red-500/80 text-white hover:bg-red-600"
          onClick={onRemovePage}
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
};

export default PageDisplay;
