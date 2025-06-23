import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Award, CheckCircle, User } from 'lucide-react';
import { Engineer } from '@/contexts/SearchContext';

interface EngineerCardProps {
  engineer: Engineer;
}

const EngineerCard: React.FC<EngineerCardProps> = ({ engineer }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative">
        {engineer.passport_photo ? (
          <img 
            src={`http://127.0.0.1:8000${engineer.passport_photo}`}
            alt={engineer.name} 
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
            <User size={48} className="text-gray-400" />
          </div>
        )}
        {engineer.is_approved && (
          <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
            <CheckCircle size={12} />
            <span>Approved</span>
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{engineer.name}</h3>
          <Badge variant="outline">{engineer.role}</Badge>
        </div>
        
        {engineer.qualification && (
          <div className="flex items-center mb-3">
            <Award size={16} className="mr-2 text-blue-500" />
            <span className="text-gray-700">{engineer.qualification}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-2 text-blue-600" />
          <span>{engineer.area}</span>
          {engineer.unit && (
            <span className="ml-1 text-gray-400 text-sm">({engineer.unit})</span>
          )}
        </div>
        
        {engineer.skills && (
          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">Skills:</div>
            <div className="flex flex-wrap gap-1">
              {engineer.skills.split(',').map((skill, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-auto space-y-2">
          {engineer.phone && (
            <a 
              href={`tel:${engineer.phone}`}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <Phone size={16} className="mr-2" />
              {engineer.phone}
            </a>
          )}
          
          {engineer.email && (
            <a 
              href={`mailto:${engineer.email}`}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Mail size={16} className="mr-2" />
              <span className="text-sm">{engineer.email}</span>
            </a>
          )}
        </div>
        
        {engineer.licenseNo && (
          <div className="mt-3 text-sm text-gray-600">
            License: {engineer.licenseNo}
          </div>
        )}
        
        {engineer.panchayath && (
          <div className="mt-1 text-sm text-gray-600">
            Panchayath: {engineer.panchayath}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EngineerCard;
