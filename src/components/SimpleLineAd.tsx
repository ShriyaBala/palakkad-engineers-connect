import React from 'react';
import { Mail, Phone } from 'lucide-react';
interface SimpleLineAdProps {
  shopName: string;
  phoneNumber: string;
  email: string;
}
const SimpleLineAd: React.FC<SimpleLineAdProps> = ({
  shopName,
  phoneNumber,
  email
}) => {
  return <div className="border-t border-b border-engineering-100 py-3 text-sm bg-sky-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <span className="font-medium">{shopName}</span>
          <div className="flex items-center">
            <Phone size={14} className="mr-1 text-engineering-600" />
            <a href={`tel:${phoneNumber}`} className="hover:underline">{phoneNumber}</a>
          </div>
          <div className="flex items-center">
            <Mail size={14} className="mr-1 text-engineering-600" />
            <a href={`mailto:${email}`} className="hover:underline">{email}</a>
          </div>
        </div>
      </div>
    </div>;
};
export default SimpleLineAd;