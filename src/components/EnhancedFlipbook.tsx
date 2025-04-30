import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Upload, FileImage, FileText, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/components/ui/use-toast';
interface FlipbookPage {
  id: number;
  type: 'image' | 'pdf';
  content: React.ReactNode | string;
}
interface EnhancedFlipbookProps {
  title: string;
  defaultPages?: FlipbookPage[];
  allowUpload?: boolean;
}
const EnhancedFlipbook: React.FC<EnhancedFlipbookProps> = ({
  title,
  defaultPages = [],
  allowUpload = true
}) => {
  const [pages, setPages] = useState<FlipbookPage[]>(defaultPages);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [uploadType, setUploadType] = useState<'image' | 'pdf'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const zoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };
  const zoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };
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
          content: <div className="h-full flex items-center justify-center">
              <img src={imageUrl} alt={`Page ${pages.length + index + 1}`} className="max-h-full max-w-full object-contain" />
            </div>
        });
      } else if (uploadType === 'pdf' && file.type === 'application/pdf') {
        const pdfUrl = URL.createObjectURL(file);
        newPages.push({
          id: Date.now() + index,
          type: 'pdf',
          content: <div className="h-full w-full">
              <iframe src={`${pdfUrl}#toolbar=0`} className="w-full h-full" title={`PDF ${pages.length + index + 1}`}></iframe>
            </div>
        });
      }
    });
    if (newPages.length > 0) {
      setPages([...pages, ...newPages]);
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
  const removePage = (pageId: number) => {
    const newPages = pages.filter(page => page.id !== pageId);
    setPages(newPages);

    // Adjust current page if needed
    if (currentPage >= newPages.length) {
      setCurrentPage(Math.max(0, newPages.length - 1));
    }
    toast({
      title: "Page removed",
      description: "The page has been removed from the flipbook"
    });
  };
  const downloadCurrentPage = () => {
    const currentPageContent = pages[currentPage];
    if (!currentPageContent) return;

    // For image content that has a URL in it
    const imgElement = document.querySelector('.flipbook-page-content img') as HTMLImageElement;
    if (imgElement && imgElement.src) {
      const a = document.createElement('a');
      a.href = imgElement.src;
      a.download = `engineer-community-page-${currentPage + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // For PDF content
    const iframeElement = document.querySelector('.flipbook-page-content iframe') as HTMLIFrameElement;
    if (iframeElement && iframeElement.src) {
      window.open(iframeElement.src, '_blank');
      return;
    }
    toast({
      title: "Download failed",
      description: "Could not download the current page",
      variant: "destructive"
    });
  };
  return <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mb-8">{title}</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap space-x-2 space-y-2 md:space-y-0">
            <Button variant="outline" size="sm" onClick={zoomOut} disabled={zoomLevel <= 0.5} className="flex items-center gap-1">
              <ZoomOut size={16} />
              <span>Zoom Out</span>
            </Button>
            <Button variant="outline" size="sm" onClick={zoomIn} disabled={zoomLevel >= 2} className="flex items-center gap-1">
              <ZoomIn size={16} />
              <span>Zoom In</span>
            </Button>
            
          </div>
          
          {allowUpload && <div className="flex space-x-2">
              <Button variant="secondary" size="sm" onClick={() => triggerFileUpload('image')} className="flex items-center gap-1">
                <FileImage size={16} />
                
              </Button>
              
              <input type="file" ref={fileInputRef} className="hidden" accept={uploadType === 'image' ? 'image/*' : 'application/pdf'} multiple={uploadType === 'image'} onChange={handleFileUpload} />
            </div>}
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          {pages.length === 0 ? <div className="w-full aspect-[3/2] bg-white rounded-lg flipbook-shadow flex flex-col items-center justify-center p-6">
              <Upload size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No pages available</h3>
              {allowUpload ? <p className="text-gray-400 text-center">
                  Upload images or PDFs to create your flipbook
                </p> : <p className="text-gray-400 text-center">
                  No content has been added to this flipbook yet
                </p>}
            </div> : <div className="flipbook-container relative w-full aspect-[3/2] bg-white rounded-lg flipbook-shadow overflow-hidden" style={{
          perspective: '1500px'
        }}>
              <div className="flipbook-page-content overflow-hidden" style={{
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.3s ease'
          }}>
                <div className="bg-white p-6 h-full overflow-auto">
                  {pages[currentPage].content}
                </div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-black/5"></div>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800/70 text-white text-xs px-2 py-1 rounded-full">
                Page {currentPage + 1} of {pages.length}
              </div>
              
              {allowUpload && <Button variant="ghost" size="sm" className="absolute top-2 right-2 p-1 h-8 w-8 rounded-full bg-red-500/80 text-white hover:bg-red-600" onClick={() => removePage(pages[currentPage].id)}>
                  <X size={16} />
                </Button>}
            </div>}
          
          {pages.length > 0 && <>
              <Button variant="ghost" className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md" onClick={prevPage} disabled={currentPage === 0}>
                <ChevronLeft size={24} />
              </Button>
              
              <Button variant="ghost" className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md" onClick={nextPage} disabled={currentPage === pages.length - 1}>
                <ChevronRight size={24} />
              </Button>
            </>}
        </div>
        
        {pages.length > 0 && <div className="max-w-2xl mx-auto mt-6 overflow-x-auto">
            <div className="flex space-x-2 px-4">
              {pages.map((page, index) => <button key={page.id} className={`min-w-16 h-12 border-2 rounded overflow-hidden transition-all ${currentPage === index ? 'border-engineering-600 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'}`} onClick={() => setCurrentPage(index)}>
                  <div className="w-full h-full bg-white flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                </button>)}
            </div>
          </div>}
      </div>
    </div>;
};
export default EnhancedFlipbook;