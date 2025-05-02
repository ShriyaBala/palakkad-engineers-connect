
import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Engineer } from '@/contexts/SearchContext';

interface EngineerCardProps {
  engineer: Engineer;
}

const EngineerCard: React.FC<EngineerCardProps> = ({ engineer }) => {
  return (
    <Card key={engineer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <div className="relative">
            <img 
              src={engineer.profileImage}
              alt={engineer.name}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
            {engineer.verified && (
              <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg">{engineer.name}</h3>
            <p className="text-sm text-gray-600">{engineer.specialization}</p>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <MapPin size={14} className="mr-1" />
              {engineer.location} ({engineer.distance})
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Briefcase size={14} className="mr-1" />
              {engineer.occupation} • {engineer.experience} years
            </div>
          </div>
        </div>
        
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-1 mb-3">
            {engineer.skills?.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="outline" className="text-xs bg-engineering-50">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-100 p-4 flex justify-between items-center">
          <div className="text-sm">
            {engineer.contactDetails?.email && (
              <a href={`mailto:${engineer.contactDetails.email}`} className="text-engineering-600 hover:underline">
                Contact
              </a>
            )}
          </div>
          <Button variant="outline" size="sm">View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngineerCard;
