import type { RouteComponent } from "vue-router";

export enum PostLabel {
  Algorithms = "Algorithms",
  CompAnalysis = "Complex analysis",
  Compsci = "Computer science",
  Electromagnetism = "Electromagnetism",
  Git = "Git",
  Gravitation = "Gravitation",
  IPv6 = "IPv6",
  Kinematics = "Kinematics",
  Linux = "Linux",
  Mathematics = "Mathematics",
  Mechanics = "Mechanics",
  Networking = "Networking",
  Physics = "Physics",
  Probability = "Probability theory",
  Programming = "Programming",
  Shell = "Shell",
  Statistics = "Statistics",
  Technology = "Technology",
}

export interface Post {
  author?: string;
  compatibilityIndex: string;
  component: () => Promise<RouteComponent>;
  date: string;
  id: string;
  labels: PostLabel[];
  title: string;
}
