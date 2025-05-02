import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Import refactored components
import ZoomControls from './flipbook/ZoomControls';
import UploadControls from './flipbook/UploadControls';
import NavigationControls from './flipbook/NavigationControls';
import PageDisplay from './flipbook/PageDisplay';
import EmptyFlipbook from './flipbook/EmptyFlipbook';
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
  const handleAddPages = (newPages: FlipbookPage[]) => {
    setPages([...pages, ...newPages]);
  };
  const removePage = () => {
    const newPages = [...pages];
    newPages.splice(currentPage, 1);
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
  return;
};
export default EnhancedFlipbook;