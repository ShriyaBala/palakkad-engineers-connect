import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const FlipBook: React.FC = () => {
  // List all your image filenames in order
  const pageCount = 116; // Update to your actual number of images
  const pages = Array.from({ length: pageCount }, (_, i) =>
    `/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-${String(i + 1).padStart(4, '0')}.jpg`
  );

  const bookRef = useRef<any>(null);

  return (
    <div className="flex flex-col items-center">
      <HTMLFlipBook
        width={400}
        height={600}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        ref={bookRef}
        className="shadow-lg"
      >
        {pages.map((img, idx) => (
          <div key={idx} className="page bg-white flex flex-col items-center justify-center h-full">
            <img src={img} alt={`Page ${idx + 1}`} className="max-w-full max-h-full object-contain" />
            <div className="text-xs text-gray-500 mt-2">{idx + 1}</div>
          </div>
        ))}
      </HTMLFlipBook>
      <div className="mt-4 text-gray-600 text-sm">
        Click or tap the left/right page to flip!
      </div>
    </div>
  );
};

export default FlipBook;
