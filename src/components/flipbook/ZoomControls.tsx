
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, ZoomReset } from 'lucide-react';

export interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ 
  zoomLevel, 
  onZoomIn, 
  onZoomOut,
  onResetZoom
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline" 
        size="sm"
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.5}
        className="p-1 h-8 w-8"
      >
        <ZoomOut size={16} />
      </Button>
      <span className="text-sm min-w-[40px] text-center">
        {Math.round(zoomLevel * 100)}%
      </span>
      <Button
        variant="outline" 
        size="sm"
        onClick={onZoomIn}
        disabled={zoomLevel >= 2.5}
        className="p-1 h-8 w-8"
      >
        <ZoomIn size={16} />
      </Button>
      <Button
        variant="ghost" 
        size="sm"
        onClick={onResetZoom}
        className="text-xs"
      >
        Reset
      </Button>
    </div>
  );
};

export default ZoomControls;
