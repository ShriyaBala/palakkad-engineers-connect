
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export interface EmptyFlipbookProps {
  allowUpload?: boolean;
}

const EmptyFlipbook: React.FC<EmptyFlipbookProps> = ({ allowUpload = true }) => {
  return (
    <Card className="w-full border border-dashed border-gray-300 shadow-sm">
      <CardContent className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="mb-4">
          <Upload size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pages Available</h3>
        <p className="text-gray-500 mb-6 max-w-md">
          {allowUpload 
            ? "Upload PDF files or images to create your flipbook." 
            : "No content is currently available."}
        </p>
        {allowUpload && (
          <div>
            <input
              type="file"
              id="empty-upload"
              className="hidden"
              accept="image/*,application/pdf"
              multiple
            />
            <Button 
              onClick={() => document.getElementById('empty-upload')?.click()}
              className="bg-engineering-600 hover:bg-engineering-700"
            >
              <Upload size={18} className="mr-2" />
              Upload Files
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyFlipbook;
