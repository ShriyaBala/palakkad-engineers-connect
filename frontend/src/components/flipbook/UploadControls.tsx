
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';

export interface UploadControlsProps {
  onFileUpload: (files: FileList | null) => void;
  onRemovePage: () => void;
}

const UploadControls: React.FC<UploadControlsProps> = ({ 
  onFileUpload, 
  onRemovePage 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*,application/pdf"
        multiple
        onChange={(e) => onFileUpload(e.target.files)}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => document.getElementById('file-upload')?.click()}
        className="flex items-center space-x-1"
      >
        <Upload size={16} />
        <span>Add</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onRemovePage}
        className="flex items-center space-x-1"
      >
        <Trash2 size={16} />
        <span>Remove</span>
      </Button>
    </div>
  );
};

export default UploadControls;
