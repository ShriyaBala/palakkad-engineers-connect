import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useRef, useState } from 'react';

const pdfAds = [
  "/resources/WhatsApp Image 2025-05-28 at 12.33.42_55b4be14.jpg",
  //"/videos/WhatsApp Video 2025-05-28 at 12.33.42_e9909f36.mp4", // Video ad
  // Add more image or video paths here if needed
];

interface MarketersShowcaseProps {
  title?: string;
}

const MarketersShowcase: React.FC<MarketersShowcaseProps> = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVideo = pdfAds[currentIndex].toLowerCase().endsWith('.mp4');

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (!isVideo) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % pdfAds.length);
      }, 5000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentIndex, isVideo]);

  // Handler for when the video ends
  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % pdfAds.length);
  };

  return (
    <div>
      
      <div className="flex justify-center">
        <Card className="bg-transparent shadow-none border-none">
          <CardContent className="bg-transparent p-0">
            {isVideo ? (
              <video
                ref={videoRef}
                src={pdfAds[currentIndex]}
                className="w-full h-auto rounded max-h-[80vh]"
                controls
                playsInline
                preload="auto"
                onEnded={handleVideoEnd}
                autoPlay
              />
            ) : (
              <img
                src={pdfAds[currentIndex]}
                alt={`Ad ${currentIndex + 1}`}
                className="w-full h-auto rounded max-h-[80vh]"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketersShowcase;