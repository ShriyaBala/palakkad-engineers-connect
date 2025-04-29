
import React from 'react';

interface FlipbookPage {
  id: number;
  content: React.ReactNode;
}

export const engineeringResourcesPages: FlipbookPage[] = [
  {
    id: 1,
    content: (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6 text-engineering-800">Engineering Resources</h1>
        <h2 className="text-xl font-semibold mb-4 text-engineering-700">Palakkad Engineers Connect</h2>
        <p className="mb-4 text-gray-600">Issue 01 - 2025</p>
        <div className="mt-8">
          <img 
            src="https://images.unsplash.com/photo-1581093458791-9f03bcf261e9?auto=format&fit=crop&q=80&w=640" 
            alt="Engineering Projects" 
            className="mx-auto rounded-lg shadow-md mb-6"
          />
          <p className="text-sm text-gray-500">Your guide to local engineering advancements</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>1. Latest Engineering Trends</span>
            <span className="text-gray-500">Page 3</span>
          </li>
          <li className="flex justify-between">
            <span>2. Local Engineering Projects</span>
            <span className="text-gray-500">Page 4</span>
          </li>
          <li className="flex justify-between">
            <span>3. Engineering Education</span>
            <span className="text-gray-500">Page 5</span>
          </li>
          <li className="flex justify-between">
            <span>4. Job Opportunities</span>
            <span className="text-gray-500">Page 6</span>
          </li>
          <li className="flex justify-between">
            <span>5. Professional Development</span>
            <span className="text-gray-500">Page 7</span>
          </li>
          <li className="flex justify-between">
            <span>6. Engineering Ethics</span>
            <span className="text-gray-500">Page 8</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Engineering Trends</h2>
        <p className="mb-4">
          The engineering industry in Kerala is witnessing significant transformations driven by technological advancements 
          and sustainability demands. Here are the key trends shaping the future of engineering in our region:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Renewable energy infrastructure development</li>
          <li>Smart city initiatives gaining momentum</li>
          <li>Green building designs becoming mainstream</li>
          <li>AI and automation in engineering processes</li>
          <li>Increased focus on disaster-resistant structures</li>
        </ul>
        <p>
          Local engineering firms are adapting rapidly to these changes, with many Palakkad-based companies leading 
          innovation in sustainable engineering practices.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Local Engineering Projects</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Palakkad Smart City Initiative</h3>
          <p className="mb-2">
            A comprehensive urban development project that aims to make Palakkad a technology-driven, 
            sustainable city with improved quality of life for residents.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&q=80&w=640" 
            alt="Smart City Project" 
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <p className="text-sm text-gray-600">
            Status: Ongoing | Expected Completion: 2026
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Renewable Energy Park</h3>
          <p>
            A large-scale solar and wind energy installation that will provide clean 
            energy to the district while creating new jobs in the renewable sector.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Engineering Education</h2>
        <p className="mb-4">
          Palakkad district hosts several prestigious engineering institutions that are nurturing the next 
          generation of engineering talent.
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Featured Institution</h3>
          <div className="flex items-center mb-2">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-gray-500">NSS</span>
            </div>
            <div>
              <h4 className="font-medium">NSS College of Engineering</h4>
              <p className="text-sm text-gray-600">Palakkad</p>
            </div>
          </div>
          <p className="text-sm mb-4">
            One of Kerala's oldest and most respected engineering colleges, offering programs 
            in Civil, Mechanical, Electrical, and Computer Science Engineering.
          </p>
        </div>
        
        <p>
          Several new educational initiatives are being developed to bridge the gap between 
          academic knowledge and industry requirements, including internship programs 
          and industry-academia partnerships.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Job Opportunities</h2>
        <div className="space-y-4">
          <div className="p-3 border border-gray-200 rounded-md hover:bg-engineering-50 transition-colors">
            <h3 className="font-medium">Senior Civil Engineer</h3>
            <p className="text-sm text-gray-600 mb-2">Kerala State Construction Corporation</p>
            <div className="flex justify-between text-sm">
              <span>Palakkad Town</span>
              <span className="text-engineering-600 font-medium">₹8-12 LPA</span>
            </div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-md hover:bg-engineering-50 transition-colors">
            <h3 className="font-medium">Mechanical Design Engineer</h3>
            <p className="text-sm text-gray-600 mb-2">Precision Engineering Ltd.</p>
            <div className="flex justify-between text-sm">
              <span>Kanjikode</span>
              <span className="text-engineering-600 font-medium">₹6-9 LPA</span>
            </div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-md hover:bg-engineering-50 transition-colors">
            <h3 className="font-medium">Electrical Systems Specialist</h3>
            <p className="text-sm text-gray-600 mb-2">Green Power Solutions</p>
            <div className="flex justify-between text-sm">
              <span>Shoranur</span>
              <span className="text-engineering-600 font-medium">₹7-10 LPA</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Visit our website for complete job listings and application details.
          </p>
        </div>
      </div>
    ),
  },
];
