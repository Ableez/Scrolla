import { learningPaths } from "./data";

export type LearningPath = (typeof learningPaths)[0];

export type Level = (typeof learningPaths)[0]["levels"][0];

export type Course = (typeof learningPaths)[0]["levels"][0]["courses"][0];

export type SwipeCard = {
  id: string;
  imageUrl: string;
  percentComplete: number;
  slug: string;
  title: string;
  isUpdated: boolean;
  content: string;
};
