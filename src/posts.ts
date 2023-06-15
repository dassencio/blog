import { dateToString } from "@/functions";
import { PostLabel, type Post } from "@/types";

const posts: Post[] = [
  {
    compatibilityIndex: "4515794de9f941c632d593384ca39dea",
    component: () => import("@/posts/51.vue"),
    date: dateToString(2014, 9, 7),
    id: "51",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Setting the CPU affinity of a process on Linux",
  },
  {
    compatibilityIndex: "485cc3a040fb3474092a617ba17bb473",
    component: () => import("@/posts/50.vue"),
    date: dateToString(2014, 6, 29),
    id: "50",
    labels: [PostLabel.Algorithms, PostLabel.ComputerScience],
    title: "Binary search: a simple but tricky algorithm",
  },
  {
    compatibilityIndex: "79a3928625303f53593f2112ebd8ac86",
    component: () => import("@/posts/49.vue"),
    date: dateToString(2014, 6, 25),
    id: "49",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Storing DNA data efficiently in C/C++",
  },
  {
    compatibilityIndex: "a500ab0fa6037fc2dc20224e7505b82f",
    component: () => import("@/posts/48.vue"),
    date: dateToString(2014, 6, 15),
    id: "48",
    labels: [PostLabel.Linux],
    title: "Introduction to dynamic libraries on Linux",
  },
  {
    compatibilityIndex: "6c1cfa313064329046317358d2aa22c0",
    component: () => import("@/posts/47.vue"),
    date: dateToString(2014, 5, 21),
    id: "47",
    labels: [
      PostLabel.Mathematics,
      PostLabel.Probability,
      PostLabel.Statistics,
    ],
    title: "How many coin flips are needed until you get a head?",
  },
  {
    compatibilityIndex: "e5ac36fcb129ce95a61f8e8ce0572dbf",
    component: () => import("@/posts/46.vue"),
    date: dateToString(2014, 5, 17),
    id: "46",
    labels: [PostLabel.Mechanics, PostLabel.Physics],
    title: "Double pendulum: Hamiltonian formulation",
  },
  {
    compatibilityIndex: "9636c4a74afcc3924fdd2f03f83492c6",
    component: () => import("@/posts/45.vue"),
    date: dateToString(2014, 5, 12),
    id: "45",
    labels: [PostLabel.ComputerScience, PostLabel.NaturalLanguageProcessing],
    title: "Is German harder than English?",
  },
  {
    compatibilityIndex: "c772250d88e35665d3a793882a7b70e5",
    component: () => import("@/posts/44.vue"),
    date: dateToString(2014, 5, 1),
    id: "44",
    labels: [PostLabel.Mathematics, PostLabel.RealAnalysis],
    title: "The Fibonacci sequence and the golden ratio",
  },
  {
    compatibilityIndex: "ffdadfc79cd5e667a65d2e325e14fee3",
    component: () => import("@/posts/43.vue"),
    date: dateToString(2014, 4, 27),
    id: "43",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Listing partitions and mounting points on Linux",
  },
  {
    compatibilityIndex: "154ad17dc1b473b59bb57dcaaebed050",
    component: () => import("@/posts/42.vue"),
    date: dateToString(2014, 4, 16),
    id: "42",
    labels: [PostLabel.Linux, PostLabel.Peripherals],
    title: "Using a Brother DCP-7055 on Linux",
  },
  {
    compatibilityIndex: "ec3d5dfdfc0b6a0d147a656f0af332bd",
    component: () => import("@/posts/41.vue"),
    date: dateToString(2014, 4, 13),
    id: "41",
    labels: [PostLabel.ComputationalGeometry, PostLabel.ComputerScience],
    title: "Closest point on a segment to a point",
  },
  {
    compatibilityIndex: "cec5e38d29aae1b00e0d488b0088e952",
    component: () => import("@/posts/40.vue"),
    date: dateToString(2014, 4, 11),
    id: "40",
    labels: [PostLabel.ComputationalGeometry, PostLabel.ComputerScience],
    title: "Closest point on a line to a point",
  },
  {
    compatibilityIndex: "0e18f5485ff4de58d94e494e3649c6eb",
    component: () => import("@/posts/39.vue"),
    date: dateToString(2014, 4, 9),
    id: "39",
    labels: [PostLabel.Linux, PostLabel.Security],
    title: "Performance of cryptographic algorithms in OpenSSL",
  },
  {
    compatibilityIndex: "871bde72c7f83a2229625a5f94fee744",
    component: () => import("@/posts/38.vue"),
    date: dateToString(2014, 3, 31),
    id: "38",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Limiting command execution time on Linux",
  },
  {
    compatibilityIndex: "688f3a536f63c43566c94f0818d9ecf3",
    component: () => import("@/posts/37.vue"),
    date: dateToString(2014, 3, 29),
    id: "37",
    labels: [PostLabel.Linux, PostLabel.Security, PostLabel.SSH],
    title: "Specifying SSH connection parameters manually",
  },
  {
    compatibilityIndex: "f8cf6364586db30c14e1742f378bbc1c",
    component: () => import("@/posts/36.vue"),
    date: dateToString(2014, 3, 27),
    id: "36",
    labels: [PostLabel.AppliedMathematics, PostLabel.ScientificComputing],
    title: "Integrating polynomials over polygonal domains in 2D",
  },
  {
    compatibilityIndex: "85b94ecb875ce2f318beabfa7f0150a7",
    component: () => import("@/posts/35.vue"),
    date: dateToString(2014, 3, 17),
    id: "35",
    labels: [PostLabel.ComputerScience, PostLabel.RelationalAlgebra],
    title: "Obtaining the largest value in relational algebra",
  },
  {
    compatibilityIndex: "8bfc2bade698bb0c82690aedf17c7875",
    component: () => import("@/posts/34.vue"),
    date: dateToString(2014, 3, 7),
    id: "34",
    labels: [
      PostLabel.AppliedMathematics,
      PostLabel.DSP,
      PostLabel.Mathematics,
    ],
    title: "Compressing images using SVD factorization",
  },
  {
    compatibilityIndex: "1500c66ae7ab27bb0106467c68feebc6",
    component: () => import("@/posts/33.vue"),
    date: dateToString(2014, 2, 28),
    id: "33",
    labels: [PostLabel.Mechanics, PostLabel.Physics],
    title: "Double pendulum: Lagrangian formulation",
  },
  {
    compatibilityIndex: "6c183e1fe7b7c7ab478ef70de01215eb",
    component: () => import("@/posts/32.vue"),
    date: dateToString(2014, 2, 15),
    id: "32",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Listing all files with a set of possible extensions",
  },
  {
    compatibilityIndex: "3b71b2622e02f1f11d72d524764fae03",
    component: () => import("@/posts/31.vue"),
    date: dateToString(2014, 2, 11),
    id: "31",
    labels: [PostLabel.Physics, PostLabel.Relativity],
    title: "Energy at your fingertips: $E = mc^2$",
  },
  {
    compatibilityIndex: "82209f7b8bc7c143f4419238ef16c129",
    component: () => import("@/posts/30.vue"),
    date: dateToString(2014, 2, 9),
    id: "30",
    labels: [PostLabel.LinearAlgebra, PostLabel.Mathematics],
    title: "Compressing matrices using SVD factorization",
  },
  {
    compatibilityIndex: "0ef89c5007d8811268b3ecfda26af22a",
    component: () => import("@/posts/29.vue"),
    date: dateToString(2014, 2, 7),
    id: "29",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Monitoring data transfers through pipes",
  },
  {
    compatibilityIndex: "89e39302a98c02d56378f7d895633a3c",
    component: () => import("@/posts/28.vue"),
    date: dateToString(2014, 1, 4),
    id: "28",
    labels: [PostLabel.RaspberryPi, PostLabel.Technology],
    title: "How much power does a Raspberry Pi Model B consume?",
  },
  {
    compatibilityIndex: "4920812dedb0e1d15f6f8ff2b1f4daa1",
    component: () => import("@/posts/27.vue"),
    date: dateToString(2014, 2, 5),
    id: "27",
    labels: [
      PostLabel.AppliedMathematics,
      PostLabel.Cpp,
      PostLabel.ScientificComputing,
    ],
    title: "A new project: freeAML",
  },
  {
    compatibilityIndex: "7d8105088d8f0a68627c750621d2199f",
    component: () => import("@/posts/26.vue"),
    date: dateToString(2014, 1, 6),
    id: "26",
    labels: [PostLabel.Linux, PostLabel.Networking],
    title: "Changing a network interface's MAC address",
  },
  {
    compatibilityIndex: "c6d2b27efe4c87b1cc24686bf8793c0f",
    component: () => import("@/posts/25.vue"),
    date: dateToString(2014, 1, 1),
    id: "25",
    labels: [PostLabel.AppliedMathematics, PostLabel.ScientificComputing],
    title: "Integrating polynomials over polygonal curves in 2D",
  },
  {
    compatibilityIndex: "ec0bf1e2547df878846dd841b8d657b2",
    component: () => import("@/posts/24.vue"),
    date: dateToString(2013, 12, 30),
    id: "24",
    labels: [PostLabel.Physics, PostLabel.QuantumMechanics],
    title: "Can the electron be found inside the nucleus?",
  },
  {
    compatibilityIndex: "62f54ab6114d473b6933ad5bf5a5fc88",
    component: () => import("@/posts/23.vue"),
    date: dateToString(2013, 12, 24),
    id: "23",
    labels: [PostLabel.FluidDynamics, PostLabel.Physics],
    title: "Fluid flow through a funnel",
  },
  {
    compatibilityIndex: "5e41315c9dedf9fd1d27776c1df18509",
    component: () => import("@/posts/22.vue"),
    date: dateToString(2013, 12, 23),
    id: "22",
    labels: [PostLabel.Linux, PostLabel.USB],
    title: "Disabling USB devices from a host controller",
  },
  {
    compatibilityIndex: "1363692dafeabeff8e3f975077f92dfe",
    component: () => import("@/posts/21.vue"),
    date: dateToString(2013, 12, 19),
    id: "21",
    labels: [PostLabel.Linux, PostLabel.USB],
    title: "Interpreting the output of lsusb",
  },
  {
    compatibilityIndex: "eacd6eedf46c9dd596a5f12221ad15b8",
    component: () => import("@/posts/20.vue"),
    date: dateToString(2013, 12, 17),
    id: "20",
    labels: [PostLabel.Git, PostLabel.Programming],
    title: "How hard is it to get a Git hash collision?",
  },
  {
    compatibilityIndex: "c59e4c7dd11d1d61bf902136ee9cafcb",
    component: () => import("@/posts/19.vue"),
    date: dateToString(2013, 12, 16),
    id: "19",
    labels: [
      PostLabel.Mathematics,
      PostLabel.Probability,
      PostLabel.Statistics,
    ],
    title: "The birthday paradox",
  },
  {
    compatibilityIndex: "12e26437a18f045febf1c8a281abd05e",
    component: () => import("@/posts/18.vue"),
    date: dateToString(2013, 12, 9),
    id: "18",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Extending disk partitions via command line",
  },
  {
    compatibilityIndex: "743e1168d330797a3dbdb1ce920383d6",
    component: () => import("@/posts/17.vue"),
    date: dateToString(2013, 12, 8),
    id: "17",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Creating a Debian image for an Alix board",
  },
  {
    compatibilityIndex: "0e9aedb78cc73a737ec28a344c2d396e",
    component: () => import("@/posts/16.vue"),
    date: dateToString(2013, 11, 30),
    id: "16",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Resizing images via command line on Linux",
  },
  {
    compatibilityIndex: "1bb7826792e3d5f8d4af531e1fca6075",
    component: () => import("@/posts/15.vue"),
    date: dateToString(2013, 11, 29),
    id: "15",
    labels: [PostLabel.Mechanics, PostLabel.Physics],
    title: "Can we travel to infinity in a finite amount of time?",
  },
  {
    compatibilityIndex: "771ffcf2efe6efe3e934d81cb6b8bbfb",
    component: () => import("@/posts/14.vue"),
    date: dateToString(2013, 11, 27),
    id: "14",
    labels: [PostLabel.Linux, PostLabel.Security, PostLabel.SSH],
    title: "Improve your SSH experience with a config file",
  },
  {
    compatibilityIndex: "e48aa7b74bd7acb76c30de0a240108c2",
    component: () => import("@/posts/13.vue"),
    date: dateToString(2013, 11, 26),
    id: "13",
    labels: [PostLabel.Linux, PostLabel.Networking],
    title: "Capturing packets with Wireshark as a normal user",
  },
  {
    compatibilityIndex: "1d16b3e5666a13fc6cfa572b64f47dd2",
    component: () => import("@/posts/12.vue"),
    date: dateToString(2013, 11, 26),
    id: "12",
    labels: [PostLabel.Electromagnetism, PostLabel.Physics],
    title: "Electric field at the center of a regular polygon",
  },
  {
    compatibilityIndex: "ad242ecf67be43e63f86a43f0fa71426",
    component: () => import("@/posts/11.vue"),
    date: dateToString(2013, 11, 24),
    id: "11",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Concatenating (joining) PDF files on Linux",
  },
  {
    compatibilityIndex: "e15c85cda7ddf7bfc212109fa121a283",
    component: () => import("@/posts/10.vue"),
    date: dateToString(2013, 11, 24),
    id: "10",
    labels: [PostLabel.Linux, PostLabel.Networking],
    title: "Disabling the Network Manager",
  },
  {
    compatibilityIndex: "d4492209add19ed9842b79411f21657d",
    component: () => import("@/posts/9.vue"),
    date: dateToString(2013, 11, 23),
    id: "9",
    labels: [PostLabel.Mechanics, PostLabel.Physics],
    title: "Uniform circular motion: a mechanics problem",
  },
  {
    compatibilityIndex: "83aa8ba50acf8f902bd6850862846e17",
    component: () => import("@/posts/8.vue"),
    date: dateToString(2013, 11, 16),
    id: "8",
    labels: [PostLabel.Kinematics, PostLabel.Physics],
    title: "Uniform circular motion: a kinematics problem",
  },
  {
    compatibilityIndex: "827f3801cb1a0f2b336b0fc67f9e1abd",
    component: () => import("@/posts/7.vue"),
    date: dateToString(2013, 11, 12),
    id: "7",
    labels: [PostLabel.CompAnalysis, PostLabel.Mathematics],
    title: "How much can $i^i$ buy?",
  },
  {
    compatibilityIndex: "dd84af0964fb8d47db6e9cd6e73abac9",
    component: () => import("@/posts/6.vue"),
    date: dateToString(2013, 11, 10),
    id: "6",
    labels: [PostLabel.Gravitation, PostLabel.Physics],
    title: "Do black holes exist in Newtonian physics?",
  },
  {
    compatibilityIndex: "3a9fab02df4edf42cf495bf087b37c2d",
    component: () => import("@/posts/5.vue"),
    date: dateToString(2013, 11, 9),
    id: "5",
    labels: [PostLabel.Git, PostLabel.Programming],
    title: "Backporting changes to renamed files using Git",
  },
  {
    compatibilityIndex: "8f1e844d7916305b8e0b5e85e4073d9b",
    component: () => import("@/posts/4.vue"),
    date: dateToString(2013, 11, 5),
    id: "4",
    labels: [PostLabel.IPv6, PostLabel.Networking, PostLabel.Technology],
    title: "IPv6 address space: how large is it?",
  },
  {
    compatibilityIndex: "eeb0a9ec9ceed243221955dad220b478",
    component: () => import("@/posts/3.vue"),
    date: dateToString(2013, 10, 27),
    id: "3",
    labels: [
      PostLabel.Algorithms,
      PostLabel.ComputerScience,
      PostLabel.Mathematics,
    ],
    title: "Escaping from the police: a brute-force solver",
  },
  {
    compatibilityIndex: "b30e25e3b6a86586342729a19cfaf299",
    component: () => import("@/posts/2.vue"),
    date: dateToString(2013, 10, 13),
    id: "2",
    labels: [
      PostLabel.Mathematics,
      PostLabel.Probability,
      PostLabel.Statistics,
    ],
    title: "Bayes' theorem: an intriguing example",
  },
  {
    compatibilityIndex: "bcb216aa523d43833789bc008e394275",
    component: () => import("@/posts/1.vue"),
    date: dateToString(2013, 10, 12),
    id: "1",
    labels: [
      PostLabel.Mathematics,
      PostLabel.Probability,
      PostLabel.Statistics,
    ],
    title: "A proof of Bayes' theorem",
  },
];

export default posts;
