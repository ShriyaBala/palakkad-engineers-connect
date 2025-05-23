
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Globe, MapPin, Award, CheckCircle } from 'lucide-react';
import { Engineer } from '@/contexts/SearchContext';

interface EngineerCardProps {
  engineer: Engineer;
}

const EngineerCard: React.FC<EngineerCardProps> = ({ engineer }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative">
        <img 
          src={engineer.profileImage} 
          alt={engineer.name} 
          className="h-48 w-full object-cover"
        />
        {engineer.verified && (
          <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
            <CheckCircle size={12} />
            <span>Verified</span>
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{engineer.name}</h3>
          <Badge variant="outline">{engineer.specialization}</Badge>
        </div>
        
        {engineer.occupation && (
          <div className="flex items-center mb-3">
            <Award size={16} className="mr-2 text-engineering-500" />
            <span className="text-gray-700">{engineer.occupation}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-2 text-engineering-600" />
          <span>{engineer.location}</span>
          <span className="ml-1 text-gray-400 text-sm">({engineer.distance})</span>
        </div>
        
        {engineer.skills && engineer.skills.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1 mt-1">
              {engineer.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-auto space-y-2">
          {engineer.contactDetails?.phone && (
            <a 
              href={`tel:${engineer.contactDetails.phone}`}
              className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors font-medium"
            >
              <Phone size={16} className="mr-2" />
              {engineer.contactDetails.phone}
            </a>
          )}
          
          {engineer.contactDetails?.email && (
            <a 
              href={`mailto:${engineer.contactDetails.email}`}
              className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors"
            >
              <Mail size={16} className="mr-2" />
              <span className="text-sm">{engineer.contactDetails.email}</span>
            </a>
          )}
          
          {engineer.contactDetails?.website && (
            <a 
              href={`https://${engineer.contactDetails.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-engineering-600 hover:text-engineering-800 transition-colors"
            >
              <Globe size={16} className="mr-2" />
              <span className="text-sm">{engineer.contactDetails.website}</span>
            </a>
          )}
        </div>
        
        {engineer.experience && (
          <div className="mt-3 text-sm text-gray-600">
            {engineer.experience} years of experience
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EngineerCard;
