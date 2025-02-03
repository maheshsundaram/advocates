import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter as FilterIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import {
  type Advocate,
  type Specialty,
  type Degree,
  type City,
  specialties,
  degrees,
  cities,
  minExperience,
  maxExperience,
} from "@/types";

type FilterProps = {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  city: City | "";
  setCity: (value: City | "") => void;
  selectedDegrees: Degree[];
  setSelectedDegrees: (value: Degree[]) => void;
  experienceRange: number[];
  setExperienceRange: (value: number[]) => void;
  selectedSpecialties: Specialty[];
  setSelectedSpecialties: (value: Specialty[]) => void;
  onClear: () => void;
};

export function Filter({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  city,
  onClear,
  setCity,
  selectedDegrees,
  setSelectedDegrees,
  experienceRange,
  setExperienceRange,
  selectedSpecialties,
  setSelectedSpecialties,
}: FilterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5" />
            Filters
          </div>
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-900"
          >
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input
              placeholder="Filter by first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              placeholder="Filter by last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Degrees</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {degrees.map((degree) => (
              <div key={degree} className="flex items-center space-x-2">
                <Checkbox
                  id={degree}
                  checked={selectedDegrees.includes(degree)}
                  onCheckedChange={(checked) => {
                    setSelectedDegrees(
                      checked
                        ? [...selectedDegrees, degree]
                        : selectedDegrees.filter((d) => d !== degree),
                    );
                  }}
                />
                <label htmlFor={degree} className="text-sm">
                  {degree}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Years of Experience</label>
            <span className="text-sm text-gray-500">
              {experienceRange[0]} - {experienceRange[1]} years
            </span>
          </div>
          <Slider
            value={experienceRange}
            min={minExperience}
            max={maxExperience}
            step={1}
            onValueChange={setExperienceRange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Specialties</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={specialty}
                  checked={selectedSpecialties.includes(specialty)}
                  onCheckedChange={(checked) => {
                    setSelectedSpecialties(
                      checked
                        ? [...selectedSpecialties, specialty]
                        : selectedSpecialties.filter((s) => s !== specialty),
                    );
                  }}
                />
                <label htmlFor={specialty} className="text-sm">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
