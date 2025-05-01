
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileImage, FileText } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface UploadControlsProps {
  onAddPages: (newPages: FlipbookPage[]) => void;
}

interface FlipbookPage {
  id: number;
  type: 'image' | 'pdf';
  content: React.ReactNode | string;
}

export const UploadControls: React.FC<UploadControlsProps> = ({ onAddPages }) => {
  const [uploadType, setUploadType] = React.useState<'image' | 'pdf'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newPages: FlipbookPage[] = [];
    Array.from(files).forEach((file, index) => {
      if (uploadType === 'image' && file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        newPages.push({
          id: Date.now() + index,
          type: 'image',
          content: (
            <div className="h-full flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt={`Uploaded image ${index + 1}`} 
                className="max-h-full max-w-full object-contain" 
              />
            </div>
          )
        });
      } else if (uploadType === 'pdf' && file.type === 'application/pdf') {
        const pdfUrl = URL.createObjectURL(file);
        newPages.push({
          id: Date.now() + index,
          type: 'pdf',
          content: (
            <div className="h-full w-full">
              <iframe 
                src={`${pdfUrl}#toolbar=0`} 
                className="w-full h-full" 
                title={`PDF ${index + 1}`}
              ></iframe>
            </div>
          )
        });
      }
    });

    if (newPages.length > 0) {
      onAddPages(newPages);
      toast({
        title: "Files uploaded successfully",
        description: `Added ${newPages.length} new pages to the flipbook`
      });
    } else {
      toast({
        title: "Upload failed",
        description: `Please upload valid ${uploadType} files`,
        variant: "destructive"
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = (type: 'image' | 'pdf') => {
    setUploadType(type);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex space-x-2">
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => triggerFileUpload('image')} 
        className="flex items-center gap-1"
      >
        <FileImage size={16} />
        <span>Upload Images</span>
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => triggerFileUpload('pdf')} 
        className="flex items-center gap-1"
      >
        <FileText size={16} />
        <span>Upload PDF</span>
      </Button>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept={uploadType === 'image' ? 'image/*' : 'application/pdf'} 
        multiple={uploadType === 'image'} 
        onChange={handleFileUpload} 
      />
    </div>
  );
};

export default UploadControls;
