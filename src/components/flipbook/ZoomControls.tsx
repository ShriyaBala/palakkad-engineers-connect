
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.5}
        className="flex items-center gap-1"
      >
        <ZoomOut size={16} />
        <span>Zoom Out</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomIn}
        disabled={zoomLevel >= 2}
        className="flex items-center gap-1"
      >
        <ZoomIn size={16} />
        <span>Zoom In</span>
      </Button>
    </div>
  );
};

export default ZoomControls;
