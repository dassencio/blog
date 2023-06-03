import type { RouteComponent } from "vue-router";

export enum PostLabel {
  Algorithms = "Algorithms",
  AppliedMathematics = "Applied mathematics",
  CompAnalysis = "Complex analysis",
  ComputationalGeometry = "Computational geometry",
  ComputerScience = "Computer science",
  Cpp = "C/C++",
  DSP = "Digital signal processing",
  Electromagnetism = "Electromagnetism",
  FluidDynamics = "Fluid dynamics",
  Git = "Git",
  Gravitation = "Gravitation",
  IPv6 = "IPv6",
  Kinematics = "Kinematics",
  LinearAlgebra = "Linear algebra",
  Linux = "Linux",
  Mathematics = "Mathematics",
  Mechanics = "Mechanics",
  NaturalLanguageProcessing = "Natural language processing",
  Networking = "Networking",
  Peripherals = "Peripherals",
  Physics = "Physics",
  Probability = "Probability theory",
  Programming = "Programming",
  QuantumMechanics = "Quantum mechanics",
  RaspberryPi = "Raspberry Pi",
  RealAnalysis = "Real analysis",
  RelationalAlgebra = "Relational algebra",
  Relativity = "Relativity",
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
