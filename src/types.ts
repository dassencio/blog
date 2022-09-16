import type { RouteComponent } from "vue-router";

export enum PostLabel {
  Mathematics = "Mathematics",
  Probability = "Probability theory",
  Statistics = "Statistics",
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
