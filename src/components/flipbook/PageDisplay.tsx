
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
    <div className="relative w-full h-full min-h-[400px] border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="absolute top-0 right-0 z-10 p-2 flex items-center bg-white/80 rounded-bl-md">
        <span className="text-sm font-medium mr-2">
          Page {currentPage + 1} of {totalPages}
        </span>
        {allowPageRemoval && onRemovePage && (
          <Button variant="ghost" size="sm" onClick={onRemovePage} className="ml-2 p-1 h-auto">
            <X size={16} className="text-red-500" />
          </Button>
        )}
      </div>
      
      <div 
        className="flipbook-page-content w-full h-full flex items-center justify-center p-4"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
      >
        {content}
      </div>
    </div>
  );
};

export default PageDisplay;
