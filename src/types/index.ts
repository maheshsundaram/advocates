import { advocates } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Advocate = InferSelectModel<typeof advocates> & {
  specialties: Specialty[];
  degree: Degree;
};

export const specialties = [
  "Attention and Hyperactivity (ADHD)",
  "Bipolar",
  "Chronic pain",
  "Coaching (leadership, career, academic and wellness)",
  "Diabetic Diet and nutrition",
  "Eating disorders",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "LGBTQ",
  "Life coaching",
  "Medication/Prescribing",
  "Men's issues",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Obsessive-compulsive disorders",
  "Pediatrics",
  "Personal growth",
  "Personality disorders",
  "Relationship Issues (family, friends, couple, etc)",
  "Schizophrenia and psychotic disorders",
  "Sleep issues",
  "Substance use/abuse",
  "Suicide History/Attempts",
  "Trauma & PTSD",
  "Weight loss & nutrition",
  "Women's issues (post-partum, infertility, family planning)",
] as const;
export type Specialty = (typeof specialties)[number];

export const degrees = ["MD", "MSW", "PhD"] as const;
export type Degree = (typeof degrees)[number];

export const cities = [
  "Austin",
  "Chicago",
  "Columbus",
  "Dallas",
  "Fort Worth",
  "Houston",
  "Jacksonville",
  "Los Angeles",
  "New York",
  "Philadelphia",
  "Phoenix",
  "San Antonio",
  "San Diego",
  "San Francisco",
  "San Jose",
] as const;
export type City = (typeof cities)[number] | "all";

export const minExperience = 0;
export const maxExperience = 20;
