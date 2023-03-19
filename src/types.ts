import type { RouteComponent } from "vue-router";

export enum PostLabel {
  Algorithms = "Algorithms",
  AppliedMathematics = "Applied mathematics",
  CompAnalysis = "Complex analysis",
  Compsci = "Computer science",
  Cpp = "C/C++",
  Electromagnetism = "Electromagnetism",
  FluidDynamics = "Fluid dynamics",
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
  QuantumMechanics = "Quantum mechanics",
  RaspberryPi = "Raspberry Pi",
  ScientificComputing = "Scientific computing",
  Security = "Security",
  Shell = "Shell",
  SSH = "SSH",
  Statistics = "Statistics",
  Technology = "Technology",
  USB = "USB",
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
