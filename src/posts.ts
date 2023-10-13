import { dateToString } from "@/functions";
import { PostLabel, type Post } from "@/types";

const posts: Post[] = [
  {
    compatibilityIndex: "c3786420b609c854925a86014b9f1f7b",
    component: () => import("@/posts/93.vue"),
    date: dateToString(2016, 11, 22),
    id: "93",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Function arguments vs. function parameters in C/C++",
  },
  {
    compatibilityIndex: "d379f7e34709563115ebd4c41241ed5e",
    component: () => import("@/posts/92.vue"),
    date: dateToString(2016, 10, 15),
    id: "92",
    labels: [PostLabel.Physics, PostLabel.QuantumMechanics],
    title: "Hydrogen energy levels: an algebraic derivation",
  },
  {
    compatibilityIndex: "b155574a293a5cbfdd0fbe82a9b8bf28",
    component: () => import("@/posts/91.vue"),
    date: dateToString(2016, 9, 23),
    id: "91",
    labels: [PostLabel.LinearAlgebra, PostLabel.Mathematics],
    title: "An easy derivation of 3D rotation matrices",
  },
  {
    compatibilityIndex: "9855aa01a29468b71375991f55324fe2",
    component: () => import("@/posts/90.vue"),
    date: dateToString(2016, 9, 19),
    id: "90",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Computing permutations of sequences in C++",
  },
  {
    compatibilityIndex: "f9a58faf18bdbd019f06a0f09c123d60",
    component: () => import("@/posts/89.vue"),
    date: dateToString(2016, 9, 16),
    id: "89",
    labels: [PostLabel.Mechanics, PostLabel.Physics],
    title: "Earth's rotation and the surface of the ocean",
  },
  {
    compatibilityIndex: "b2c5a655b21561be1f23a9ee2021b0a4",
    component: () => import("@/posts/88.vue"),
    date: dateToString(2016, 9, 2),
    id: "88",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Sorting arrays of C-style strings in C++",
  },
  {
    compatibilityIndex: "3a276b23223addae28b13d7c6ac4344e",
    component: () => import("@/posts/87.vue"),
    date: dateToString(2016, 8, 14),
    id: "87",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "C++ solutions: Cracking the Coding Interview, 4th ed.",
  },
  {
    compatibilityIndex: "442426c276274d96d1297cf9e19a1db4",
    component: () => import("@/posts/86.vue"),
    date: dateToString(2016, 1, 23),
    id: "86",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Shifting calendar times using <code>struct tm</code> in C/C++",
  },
  {
    compatibilityIndex: "a2386030d8d82e457a8c7dc124d00564",
    component: () => import("@/posts/85.vue"),
    date: dateToString(2016, 1, 15),
    id: "85",
    labels: [PostLabel.LinearAlgebra, PostLabel.Mathematics],
    title: "Surface normals and linear transformations",
  },
  {
    compatibilityIndex: "2720885db684284ab33d1ba3b65cab1b",
    component: () => import("@/posts/84.vue"),
    date: dateToString(2016, 1, 1),
    id: "84",
    labels: [PostLabel.Programming],
    title: "Sorting in less than $O(n \\log_2 n)$ time",
  },
  {
    compatibilityIndex: "85e407d6c771ba2bc5f02b17714241e2",
    component: () => import("@/posts/83.vue"),
    date: dateToString(2015, 12, 27),
    id: "83",
    labels: [PostLabel.Programming, PostLabel.Python],
    title: "Checking if an IP belongs to a subnetwork in Python",
  },
  {
    compatibilityIndex: "b875a967eebd37d4071d87d990397d43",
    component: () => import("@/posts/82.vue"),
    date: dateToString(2015, 12, 14),
    id: "82",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "A deep dive into the <code>char</code> type in C/C++",
  },
  {
    compatibilityIndex: "c51c5ab87e0ee7e7a5cbfafb04f2ba4b",
    component: () => import("@/posts/81.vue"),
    date: dateToString(2015, 12, 1),
    id: "81",
    labels: [PostLabel.AutomataTheory, PostLabel.ComputerScience],
    title: "The set of languages over $\\{0,1\\}$ is not countable",
  },
  {
    compatibilityIndex: "b961027fbfa5495824696f987e26f50a",
    component: () => import("@/posts/80.vue"),
    date: dateToString(2015, 11, 27),
    id: "80",
    labels: [PostLabel.Geolocation, PostLabel.Technology],
    title: "Easy-geoip: an easy-to-use IP geolocation server",
  },
  {
    compatibilityIndex: "058320cdb129ffb4075ae2c1db3de0d4",
    component: () => import("@/posts/79.vue"),
    date: dateToString(2015, 11, 23),
    id: "79",
    labels: [PostLabel.Cpp, PostLabel.Linux, PostLabel.Programming],
    title: "Obtaining C/C++ integer sizes and ranges on Linux",
  },
  {
    compatibilityIndex: "6890b8c50169ef45b74db135063c227c",
    component: () => import("@/posts/78.vue"),
    date: dateToString(2015, 11, 19),
    id: "78",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Generating random numbers in C++",
  },
  {
    compatibilityIndex: "63f2ce1a5c3bb291485c0ef5fb8223f2",
    component: () => import("@/posts/77.vue"),
    date: dateToString(2015, 11, 14),
    id: "77",
    labels: [PostLabel.Calculus, PostLabel.Mathematics],
    title: "An interpretation of the Lagrange multiplier method",
  },
  {
    compatibilityIndex: "2e182d595da3f4f04b8526111476e64d",
    component: () => import("@/posts/76.vue"),
    date: dateToString(2015, 11, 12),
    id: "76",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Negating globbing patterns in Bash",
  },
  {
    compatibilityIndex: "649b7a71b35fc7ad41e03b6d0e825f07",
    component: () => import("@/posts/75.vue"),
    date: dateToString(2015, 11, 9),
    id: "75",
    labels: [PostLabel.Linux, PostLabel.Peripherals],
    title: "Interpreting the output of <code>lspci</code>",
  },
  {
    compatibilityIndex: "0aaa86531535669388d4aa67b44e1f26",
    component: () => import("@/posts/74.vue"),
    date: dateToString(2015, 10, 15),
    id: "74",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Adjusting PulseAudio volume via the command line",
  },
  {
    compatibilityIndex: "be83d9c57ef2d0c138c880ce222471eb",
    component: () => import("@/posts/73.vue"),
    date: dateToString(2015, 10, 14),
    id: "73",
    labels: [PostLabel.Mechanics, PostLabel.Physics],
    title: "Elastic forces on a rubber band",
  },
  {
    compatibilityIndex: "bd2985d293fcd5959b3b4f4f36d3965a",
    component: () => import("@/posts/72.vue"),
    date: dateToString(2015, 10, 5),
    id: "72",
    labels: [PostLabel.Technology],
    title: "The complexity of feature-rich systems",
  },
  {
    compatibilityIndex: "99d3134bb98fdcc9a7c2bd6071db737d",
    component: () => import("@/posts/71.vue"),
    date: dateToString(2015, 9, 18),
    id: "71",
    labels: [PostLabel.Programming, PostLabel.Python],
    title: "Writing to binary files in Python",
  },
  {
    compatibilityIndex: "f985010e0a51a5bb6348ec8a2f48d055",
    component: () => import("@/posts/70.vue"),
    date: dateToString(2015, 9, 7),
    id: "70",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Working with max- and min-heaps in C++, part II",
  },
  {
    compatibilityIndex: "d59df235a67e8efaec11682d86ac28e9",
    component: () => import("@/posts/69.vue"),
    date: dateToString(2015, 8, 30),
    id: "69",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Working with max- and min-heaps in C++, part I",
  },
  {
    compatibilityIndex: "c34d06f4f4de2375658ed41f70177d59",
    component: () => import("@/posts/68.vue"),
    date: dateToString(2015, 7, 26),
    id: "68",
    labels: [PostLabel.AppliedMathematics, PostLabel.ScientificComputing],
    title: "Numerically stable computation of arithmetic means",
  },
  {
    compatibilityIndex: "9659cade0e5077813008c3f34f416c36",
    component: () => import("@/posts/67.vue"),
    date: dateToString(2015, 7, 24),
    id: "67",
    labels: [PostLabel.Linux, PostLabel.Networking],
    title: "Extracting a host's network traffic from a pcap file",
  },
  {
    compatibilityIndex: "df0bdbd936cfac191141770bf91a6b6e",
    component: () => import("@/posts/66.vue"),
    date: dateToString(2015, 7, 19),
    id: "66",
    labels: [PostLabel.AppliedMathematics, PostLabel.ScientificComputing],
    title: "Denoising data without using fitting functions",
  },
  {
    compatibilityIndex: "d01265d3700dd27dd99a4e6ee3ac67eb",
    component: () => import("@/posts/65.vue"),
    date: dateToString(2015, 4, 25),
    id: "65",
    labels: [PostLabel.RaspberryPi, PostLabel.Technology],
    title: "Resolving <code>iptables</code> errors on a Raspberry Pi",
  },
  {
    compatibilityIndex: "195438f696c2c11e15340392ea2bf1cc",
    component: () => import("@/posts/64.vue"),
    date: dateToString(2015, 4, 22),
    id: "64",
    labels: [PostLabel.Mechanics, PostLabel.Physics],
    title: "Water surface shape inside a rotating bucket",
  },
  {
    compatibilityIndex: "86c137b502561d44b8be02f06d80ee16",
    component: () => import("@/posts/63.vue"),
    date: dateToString(2015, 4, 9),
    id: "63",
    labels: [PostLabel.Programming, PostLabel.R],
    title: "Pausing R scripts with a generic pause function",
  },
  {
    compatibilityIndex: "36c4c02124a10282d8a0f92277a43ec4",
    component: () => import("@/posts/62.vue"),
    date: dateToString(2015, 4, 5),
    id: "62",
    labels: [PostLabel.Algorithms, PostLabel.ComputerScience],
    title: "Lossless data compression with Huffman coding",
  },
  {
    compatibilityIndex: "26abaf6aa4fd450564a038d599bb7f5c",
    component: () => import("@/posts/61.vue"),
    date: dateToString(2015, 1, 19),
    id: "61",
    labels: [PostLabel.Linux],
    title: "Fixing <code>bmake</code> compilation errors on Linux",
  },
  {
    compatibilityIndex: "d71346b8737ee449bb09496784c9b344",
    component: () => import("@/posts/60.vue"),
    date: dateToString(2014, 12, 30),
    id: "60",
    labels: [PostLabel.Linux, PostLabel.Networking],
    title: "Obtaining and interpreting routing tables on Linux",
  },
  {
    compatibilityIndex: "50ed9dcd9009dd70c3a2f8822271e4c7",
    component: () => import("@/posts/59.vue"),
    date: dateToString(2014, 12, 23),
    id: "59",
    labels: [PostLabel.Programming, PostLabel.Python],
    title: "Generating bitmask permutations in Python",
  },
  {
    compatibilityIndex: "8a4390f653cdd7dca0e05db14bd8f760",
    component: () => import("@/posts/58.vue"),
    date: dateToString(2014, 11, 26),
    id: "58",
    labels: [PostLabel.Physics, PostLabel.Thermodynamics],
    title: "Converting between Fahrenheit and Celsius the easy way",
  },
  {
    compatibilityIndex: "e83a797bcee562e2f1a4faa9293316ab",
    component: () => import("@/posts/57.vue"),
    date: dateToString(2014, 11, 13),
    id: "57",
    labels: [PostLabel.Algorithms, PostLabel.ComputerScience],
    title: "Detecting cycles on undirected graphs",
  },
  {
    compatibilityIndex: "51416695075e0ba12a5bb95029450fdb",
    component: () => import("@/posts/56.vue"),
    date: dateToString(2014, 10, 17),
    id: "56",
    labels: [PostLabel.Mechanics, PostLabel.Physics],
    title: "Non-inertial frames of reference",
  },
  {
    compatibilityIndex: "614d73283d49e939ebfb648cfb86819d",
    component: () => import("@/posts/55.vue"),
    date: dateToString(2014, 10, 11),
    id: "55",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Getting CPU architecture information with <code>lscpu</code>",
  },
  {
    compatibilityIndex: "bc04395b103021d338b4e30a061bfc74",
    component: () => import("@/posts/54.vue"),
    date: dateToString(2014, 9, 19),
    id: "54",
    labels: [PostLabel.Electromagnetism, PostLabel.Physics],
    title: "A proof of Earnshaw's theorem",
  },
  {
    compatibilityIndex: "49ca2901b398d175b4356b14cc015532",
    component: () => import("@/posts/53.vue"),
    date: dateToString(2014, 9, 18),
    id: "53",
    labels: [PostLabel.Linux, PostLabel.Shell],
    title: "Redirecting output from <code>stderr</code> to <code>stdout</code>",
  },
  {
    compatibilityIndex: "6980262e219b201507d0f932e4829567",
    component: () => import("@/posts/52.vue"),
    date: dateToString(2014, 9, 9),
    id: "52",
    labels: [PostLabel.Cpp, PostLabel.Programming],
    title: "Adding elements to <code>std::deque</code>: a nasty surprise",
  },
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
    title: "Listing all files with a set of possible extensions on Linux",
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
    title: "Monitoring data transfers through pipes on Linux",
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
    title: "Changing a network interface's MAC address on Linux",
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
    labels: [PostLabel.Linux, PostLabel.Peripherals, PostLabel.USB],
    title: "Disabling USB devices from a host controller on Linux",
  },
  {
    compatibilityIndex: "1363692dafeabeff8e3f975077f92dfe",
    component: () => import("@/posts/21.vue"),
    date: dateToString(2013, 12, 19),
    id: "21",
    labels: [PostLabel.Linux, PostLabel.Peripherals, PostLabel.USB],
    title: "Interpreting the output of <code>lsusb</code>",
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
    title: "Extending disk partitions via the command line on Linux",
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
    title: "Resizing images via the command line on Linux",
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
    title: "Merging PDF files on Linux",
  },
  {
    compatibilityIndex: "e15c85cda7ddf7bfc212109fa121a283",
    component: () => import("@/posts/10.vue"),
    date: dateToString(2013, 11, 24),
    id: "10",
    labels: [PostLabel.Linux, PostLabel.Networking],
    title: "Disabling the NetworkManager",
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
