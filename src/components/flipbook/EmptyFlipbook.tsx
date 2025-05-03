
import React from 'react';
import { Upload } from 'lucide-react';

interface EmptyFlipbookProps {
  allowUpload: boolean;
}

export const EmptyFlipbook: React.FC<EmptyFlipbookProps> = ({ allowUpload }) => {
  return (
    <div className="w-full aspect-[3/2] bg-white rounded-lg flipbook-shadow flex flex-col items-center justify-center p-6">
      <Upload size={48} className="text-gray-300 mb-4" />
      <h3 className="text-xl font-medium text-gray-500 mb-2">No pages available</h3>
      {allowUpload ? (
        <p className="text-gray-400 text-center">
          Upload images or PDFs to create your flipbook
        </p>
      ) : (
        <p className="text-gray-400 text-center">
          No content has been added to this flipbook yet
        </p>
      )}
    </div>
  );
};

export default EmptyFlipbook;
