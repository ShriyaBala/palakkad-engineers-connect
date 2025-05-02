import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import FlipPage from 'react-flip-page';
import '@/styles/flipbook.css';

interface PageProps {
  pageNumber: number;
  image: string;
}

const Page: React.FC<PageProps> = ({ pageNumber, image }) => {
  return (
    <div className="page relative bg-white shadow-md" style={{ width: '100%', height: '100%' }}>
      <div className="page-content">
        <div className="page-image">
          <img 
            src={image} 
            alt={`Page ${pageNumber}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => console.error(`Error loading image: ${image}`)}
          />
        </div>
        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
          {pageNumber}
        </div>
      </div>
    </div>
  );
};

const Flipbook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Generate array of all 116 pages
  const pages = Array.from({ length: 116 }, (_, i) => {
    const pageNumber = (i + 1).toString().padStart(4, '0');
    return encodeURI(`/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-${pageNumber}.jpg`);
  });

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
    setCurrentPage(0);
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
          placeholder="Search in directory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {/* Flipbook */}
      <div className="book-container w-full flex justify-center" style={{ minHeight: '800px' }}>
        <FlipPage
          orientation="horizontal"
          height={733}
          width={550}
          animationDuration={400}
          uncutPages={true}
          showSides={true}
          flipOnTouch={true}
          flipOnTouchZone={20}
          perspective="1000px"
          onPageChange={(page) => setCurrentPage(page)}
        >
          {pages.map((page, index) => (
            <Page key={index} pageNumber={index + 1} image={page} />
          ))}
        </FlipPage>
      </div>

      <div className="mt-6 text-center text-gray-600">
        Page {currentPage + 1} of {pages.length}
      </div>
    </div>
  );
};

export default Flipbook;
