import type { RouteComponent } from "vue-router";

export enum PostLabel {
  Algorithms = "Algorithms",
  Compsci = "Computer science",
  IPv6 = "IPv6",
  Mathematics = "Mathematics",
  Networks = "Networks",
  Probability = "Probability theory",
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
