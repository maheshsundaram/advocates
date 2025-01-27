"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Filter } from "@/components/filter";
import { AdvocateCard } from "@/components/advocate";
import { Header } from "@/components/header";

import {
  type Advocate,
  type City,
  type Degree,
  type Specialty,
  minExperience,
  maxExperience,
} from "@/types";

export default function Page() {
  const {
    data: advocates = [],
    isLoading,
    isError,
  } = useQuery<Advocate[]>({
    queryKey: ["advocates"],
    queryFn: async () => {
      const response = await fetch("/api/advocates");
      const { data } = await response.json();
      return data;
    },
  });

  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>(
    [],
  );
  const [selectedDegrees, setSelectedDegrees] = useState<Degree[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState<City | "">("");
  const [experienceRange, setExperienceRange] = useState([0, 20]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const filteredAdvocates = useMemo(() => {
    if (isLoading) return [];

    return advocates.filter((advocate) => {
      const matchesDegrees =
        selectedDegrees.length === 0 ||
        selectedDegrees.includes(advocate.degree);
      const matchesFirstName =
        !firstName ||
        advocate.firstName.toLowerCase().includes(firstName.toLowerCase());
      const matchesLastName =
        !lastName ||
        advocate.lastName.toLowerCase().includes(lastName.toLowerCase());
      const matchesCity = !city || city === "all" || advocate.city === city;
      const matchesExperience =
        advocate.yearsOfExperience >= experienceRange[0] &&
        advocate.yearsOfExperience <= experienceRange[1];
      const matchesSpecialties =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.every((s) => advocate.specialties.includes(s));

      return (
        matchesDegrees &&
        matchesFirstName &&
        matchesLastName &&
        matchesCity &&
        matchesExperience &&
        matchesSpecialties
      );
    });
  }, [
    isLoading,
    advocates,
    selectedDegrees,
    firstName,
    lastName,
    city,
    experienceRange,
    selectedSpecialties,
  ]);

  const clearFilters = () => {
    setFirstName("");
    setLastName("");
    setCity("");
    setSelectedDegrees([]);
    setExperienceRange([minExperience, maxExperience]);
    setSelectedSpecialties([]);
  };

  return (
    <>
      <Header />
      <main className="p-6 pt-24 max-w-7xl mx-auto">
        <h1 className="text-4xl mb-8 font-custom">Find Your Care Advocate</h1>

        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              {isFiltersVisible ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {isFiltersVisible ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          {isFiltersVisible && (
            <Filter
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              city={city}
              setCity={setCity}
              selectedDegrees={selectedDegrees}
              setSelectedDegrees={setSelectedDegrees}
              experienceRange={experienceRange}
              setExperienceRange={setExperienceRange}
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={setSelectedSpecialties}
              onClear={clearFilters}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAdvocates.length > 0 ? (
            filteredAdvocates.map((advocate) => (
              <AdvocateCard key={advocate.id} advocate={advocate} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-gray-600 mb-4">
                No advocates match your current filters
              </p>
              <Button onClick={clearFilters} variant="secondary">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
