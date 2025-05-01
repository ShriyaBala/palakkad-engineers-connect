
import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFFlipbookProps {
  pdfUrl: string;
  title?: string;
}

const PDFFlipbook: React.FC<PDFFlipbookProps> = ({ pdfUrl, title }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-center text-engineering-800">
          {title}
        </h3>
      )}
      
      <div className="aspect-[1.4] relative bg-white rounded-lg shadow-lg overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            plugins={[defaultLayoutPluginInstance]}
            onDocumentLoad={(e) => {
              // Extract numPages safely from the event object
              if (e && 'doc' in e && e.doc && typeof e.doc.numPages === 'number') {
                setTotalPages(e.doc.numPages);
              }
            }}
            onPageChange={(e) => {
              // Handle page change event
              if (e && typeof e.currentPage === 'number') {
                setCurrentPage(e.currentPage);
              }
            }}
          />
        </Worker>
      </div>
      
      <div className="mt-4 text-center text-gray-600">
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  );
};

export default PDFFlipbook;
