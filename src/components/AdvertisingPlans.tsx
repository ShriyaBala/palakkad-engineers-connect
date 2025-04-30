
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    name: "Ad Display Duration",
    basic: "7 days",
    standard: "15 days",
    premium: "30 days",
  },
  {
    name: "Ad Rotation Priority",
    basic: "Low (occasional appearance)",
    standard: "Medium (regular appearance)",
    premium: "High (frequent appearance)",
  },
  {
    name: "Video Ads",
    basic: false,
    standard: true,
    premium: true,
  },
  {
    name: "Regional Targeting",
    basic: false,
    standard: true,
    premium: true,
  },
  {
    name: "Engineer Contact Access",
    basic: "Limited (5 contacts)",
    standard: "Moderate (20 contacts)",
    premium: "Unlimited",
  },
  {
    name: "Analytics Reports",
    basic: false,
    standard: true,
    premium: true,
  },
  {
    name: "Featured Placement",
    basic: false,
    standard: false,
    premium: true,
  },
  {
    name: "Direct Messaging",
    basic: false,
    standard: false,
    premium: true,
  },
];

const AdvertisingPlans: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Advertising Plans for Marketers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reach our community of qualified engineers across Palakkad district.
            Choose the advertising plan that suits your marketing goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <Card className="border-advertise-basic border-t-4 relative">
            <CardHeader>
              <Badge variant="outline" className="bg-advertise-basic text-black self-start mb-2">
                Basic
              </Badge>
              <CardTitle className="text-2xl">Basic Plan</CardTitle>
              <CardDescription>
                Entry-level advertising for small businesses
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹1,999</span>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    {feature.basic ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>
                          <span className="font-medium">{feature.name}:</span>{" "}
                          {typeof feature.basic === "string" ? feature.basic : "Included"}
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
                        <span className="text-gray-500">{feature.name}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-advertise-basic text-black hover:bg-amber-600">
                Choose Basic
              </Button>
            </CardFooter>
          </Card>

          {/* Standard Plan */}
          <Card className="border-advertise-standard border-t-4 relative">
            <CardHeader>
              <Badge variant="outline" className="bg-advertise-standard text-black self-start mb-2">
                Standard
              </Badge>
              <CardTitle className="text-2xl">Standard Plan</CardTitle>
              <CardDescription>
                Most popular choice for regional businesses
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹3,999</span>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    {feature.standard ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>
                          <span className="font-medium">{feature.name}:</span>{" "}
                          {typeof feature.standard === "string" ? feature.standard : "Included"}
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
                        <span className="text-gray-500">{feature.name}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-advertise-standard text-black hover:bg-gray-400">
                Choose Standard
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-advertise-premium border-t-4 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0">
              <div className="bg-engineering-600 text-white text-xs px-3 py-1 rotate-45 translate-x-5 translate-y-3">
                Recommended
              </div>
            </div>
            <CardHeader>
              <Badge variant="outline" className="bg-advertise-premium text-black self-start mb-2">
                Premium
              </Badge>
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
              <CardDescription>
                Comprehensive features for maximum visibility
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹7,999</span>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    {feature.premium ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>
                          <span className="font-medium">{feature.name}:</span>{" "}
                          {typeof feature.premium === "string" ? feature.premium : "Included"}
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
                        <span className="text-gray-500">{feature.name}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-advertise-premium text-black hover:bg-yellow-500">
                Choose Premium
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Custom Advertising Solutions</h3>
          <p className="text-gray-600 mb-6">
            Need a tailored advertising package for your specific needs? 
            Contact our advertising team for custom solutions including event sponsorships, 
            newsletter features, and more.
          </p>
          <Button variant="outline" className="border-engineering-500 text-engineering-600 hover:bg-engineering-50">
            Contact for Custom Plan
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdvertisingPlans;
