// src/pages/JoinUsLanding.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const JoinUsLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Join LENSFED</CardTitle>
            <CardDescription className="text-center">
              Please choose how you'd like to join:
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-4 pb-8">
            <Button
              className="w-full"
              onClick={() => navigate('/joinus')}
            >
              Join as Member
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/register')}
            >
              Join as User
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JoinUsLanding;
