

import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
// ...other imports...

const pdfAds = [
  "/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0006.jpg",
  "/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0007.jpg",
  "/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0008.jpg",
  "/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0009.jpg"
  // Add more PDF ad image paths here if needed
];

interface MarketersShowcaseProps {
  title?: string;
}

const MarketersShowcase: React.FC<MarketersShowcaseProps> = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pdfAds.length);
    }, 5000); // 3000ms = 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title || "Marketers Showcase"}</h2>
      <div className="flex justify-center">
        <Card>
          <CardContent>
            <img
              src={pdfAds[currentIndex]}
              alt={`Ad ${currentIndex + 1}`}
              className="w-full h-auto rounded max-h-[80vh]"
              style={{ objectFit: 'contain' }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketersShowcase;