
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

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
        size="icon" 
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.5}
        className="h-8 w-8"
      >
        <ZoomOut size={16} />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onResetZoom}
        disabled={zoomLevel === 1}
        className="h-8 w-8"
      >
        <RefreshCw size={16} />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onZoomIn}
        disabled={zoomLevel >= 2.5}
        className="h-8 w-8"
      >
        <ZoomIn size={16} />
      </Button>
      
      <span className="text-xs text-gray-500">{Math.round(zoomLevel * 100)}%</span>
    </div>
  );
};

export default ZoomControls;
