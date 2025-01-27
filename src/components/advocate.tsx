import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Award } from "lucide-react";

import { type Advocate } from "@/types";

type AdvocateProps = {
  advocate: Advocate;
};

const formatPhone = (phone: number) => {
  const str = phone.toString();
  return `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6)}`;
};

export function AdvocateCard({ advocate }: AdvocateProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-serif">
              {advocate.firstName} {advocate.lastName}
            </span>
            <span className="ml-2 text-lg text-green-700">
              {advocate.degree}
            </span>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            {advocate.yearsOfExperience} years
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {advocate.city}
          </div>
          <a
            href={`tel:${advocate.phoneNumber}`}
            className="flex items-center gap-1 underline underline-offset-1 hover:text-green-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {formatPhone(advocate.phoneNumber)}
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {advocate.specialties.sort().map((specialty, index) => (
            <Badge key={index} variant="outline" className="bg-green-50">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
