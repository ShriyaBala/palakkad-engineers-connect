
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';

export interface UploadControlsProps {
  onFileUpload: (files: FileList | null) => void;
  onRemovePage: () => void;
}

const UploadControls: React.FC<UploadControlsProps> = ({ onFileUpload, onRemovePage }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(e.target.files);
  };

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" onClick={handleUploadClick} className="h-8 w-8">
        <Upload size={16} />
      </Button>
      <Button variant="outline" size="icon" onClick={onRemovePage} className="h-8 w-8">
        <Trash2 size={16} />
      </Button>
      <input 
        type="file" 
        ref={fileInputRef}
        accept=".pdf,.jpg,.jpeg,.png"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadControls;
