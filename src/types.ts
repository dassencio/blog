import type { RouteComponent } from "vue-router";

export enum PostLabel {
  Algorithms = "Algorithms",
  CompAnalysis = "Complex analysis",
  Compsci = "Computer science",
  Git = "Git",
  Gravitation = "Gravitation",
  IPv6 = "IPv6",
  Kinematics = "Kinematics",
  Mathematics = "Mathematics",
  Mechanics = "Mechanics",
  Networking = "Networking",
  Physics = "Physics",
  Probability = "Probability theory",
  Programming = "Programming",
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
