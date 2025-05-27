

import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
// ...other imports...

const pdfAds = [
  "/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0006.jpg",
  "/resources/ilovepdf_pages-to-jpg (1)/directory inner_page-0007.jpg",
  "https://dcassetcdn.com/design_img/3837580/456467/24259615/k6h6tq8n973mammy0w7bfrat69_thumbnail.png",
  "https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:344ad42e-5176-5256-95da-d868bf3ade97/component?assetType=TEMPLATE&etag=dd2f5ecdf13646be9f0f9622ee37b734&revision=b9aec714-4e40-4425-9b00-3ba131be20c1&component_id=3aba44f2-c50f-4b04-b5b3-db2f03ee4c90"
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