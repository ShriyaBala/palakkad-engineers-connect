
import React from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface EmptyFlipbookProps {
  allowUpload?: boolean;
  onFileUpload?: (files: FileList | null) => void;
}

const EmptyFlipbook: React.FC<EmptyFlipbookProps> = ({ 
  allowUpload = true,
  onFileUpload 
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onFileUpload) {
      onFileUpload(e.target.files);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
      <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">No pages to display</h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {allowUpload 
          ? "Upload PDF or image files to start viewing them in the flipbook format."
          : "There are no pages available for this flipbook at the moment."}
      </p>
      
      {allowUpload && (
        <>
          <Button 
            onClick={handleUploadClick}
            className="flex items-center gap-2"
          >
            <Upload size={16} />
            <span>Upload Files</span>
          </Button>
          <input 
            type="file" 
            ref={fileInputRef}
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="mt-3 text-sm text-gray-500">
            Supported formats: PDF, JPG, PNG
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyFlipbook;
