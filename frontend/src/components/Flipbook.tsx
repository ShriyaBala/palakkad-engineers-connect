
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import '@/styles/flipbook.css';

interface PageProps {
  pageNumber: number;
  image: string;
  isLeft?: boolean;
}

const Page: React.FC<PageProps> = ({ pageNumber, image, isLeft }) => {
  return (
    <div className={`page ${isLeft ? 'left-page' : 'right-page'}`}>
      <div className="page-content">
        <img 
          src={image} 
          alt={`Page ${pageNumber}`}
          className="page-image"
          onError={(e) => console.error(`Error loading image: ${image}`)}
        />
        <div className="page-number">{pageNumber}</div>
      </div>
    </div>
  );
};

const Flipbook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Generate array of all 116 pages
  const pages = Array.from({ length: 116 }, (_, i) => {
    const pageNumber = (i + 1).toString().padStart(4, '0');
    return encodeURI(`/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-${pageNumber}.jpg`);
  });

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Check if images are loading
    const checkImages = async () => {
      try {
        console.log('Starting to load images...');
        const imagePromises = pages.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              console.log(`Loaded image: ${src}`);
              resolve(src);
            };
            img.onerror = (error) => {
              console.error(`Failed to load image: ${src}`, error);
              reject(error);
            };
            img.src = src;
          });
        });
        await Promise.all(imagePromises);
        console.log('All images loaded successfully');
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setLoadingError('Failed to load some images. Please check the console for details.');
        setIsLoading(false);
      }
    };
    checkImages();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(searchQuery);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= pages.length) {
      setCurrentPage(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (isMobile) {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage < pages.length - 2) {
        setCurrentPage(currentPage + 2);
      }
    }
  };

  const goToPreviousPage = () => {
    if (isMobile) {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 2);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading flipbook...</div>;
  }

  if (loadingError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <p>{loadingError}</p>
        <p className="text-sm mt-2">Please check the browser console for more details.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-xl mb-8 flex gap-2">
        <Input
          type="text"
          placeholder="Enter page number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Go to Page
        </Button>
      </form>

      {/* Flipbook */}
      <div className="book-container">
        <div className="book">
          <div className="pages">
            {isMobile ? (
              <Page 
                pageNumber={currentPage + 1} 
                image={pages[currentPage]} 
                isLeft={false} 
              />
            ) : (
              <>
                <Page 
                  pageNumber={currentPage + 1} 
                  image={pages[currentPage]} 
                  isLeft={true} 
                />
                <Page 
                  pageNumber={currentPage + 2} 
                  image={pages[currentPage + 1]} 
                  isLeft={false} 
                />
              </>
            )}
          </div>
          <div className="controls">
            <button 
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="control-button"
            >
              Previous
            </button>
            <button 
              onClick={goToNextPage}
              disabled={isMobile ? currentPage >= pages.length - 1 : currentPage >= pages.length - 2}
              className="control-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-600">
        {isMobile ? (
          `Page ${currentPage + 1} of ${pages.length}`
        ) : (
          `Pages ${currentPage + 1}-${currentPage + 2} of ${pages.length}`
        )}
      </div>
    </div>
  );
};

export default Flipbook;
