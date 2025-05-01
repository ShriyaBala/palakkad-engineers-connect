
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageSelect: (index: number) => void;
  pages: Array<{id: number}>;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onPageSelect,
  pages = [] // Provide a default empty array if pages is undefined
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full flex justify-center">
        {/* Previous button */}
        <Button
          variant="ghost"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md"
          onClick={onPrevPage}
          disabled={currentPage === 0}
        >
          <ChevronLeft size={24} />
        </Button>
        
        {/* Next button */}
        <Button
          variant="ghost"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md"
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRight size={24} />
        </Button>
      </div>
      
      {/* Page thumbnails */}
      {totalPages > 0 && pages.length > 0 && (
        <div className="w-full max-w-2xl mx-auto mt-6 overflow-x-auto">
          <div className="flex space-x-2 px-4">
            {pages.map((page, index) => (
              <button
                key={page.id}
                className={`min-w-16 h-12 border-2 rounded overflow-hidden transition-all ${
                  currentPage === index 
                    ? 'border-engineering-600 shadow-md' 
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
                onClick={() => onPageSelect(index)}
              >
                <div className="w-full h-full bg-white flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationControls;
