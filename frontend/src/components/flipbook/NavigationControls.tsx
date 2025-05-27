
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface NavigationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        size="icon"
        variant="outline"
        onClick={onPrevPage}
        disabled={currentPage <= 1}
        className="bg-white/20 text-white hover:bg-white/30 border-white/40"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
        className="bg-white/20 text-white hover:bg-white/30 border-white/40"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavigationControls;
