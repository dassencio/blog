import { dateToString } from "@/functions";
import { PostLabel, type Post } from "@/types";

const posts: Post[] = [
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
    title: "How to backport changes to renamed files using Git",
  },
  {
    compatibilityIndex: "8f1e844d7916305b8e0b5e85e4073d9b",
    component: () => import("@/posts/4.vue"),
    date: dateToString(2013, 11, 5),
    id: "4",
    labels: [PostLabel.IPv6, PostLabel.Networks, PostLabel.Technology],
    title: "IPv6 address space: how large is it?",
  },
  {
    compatibilityIndex: "eeb0a9ec9ceed243221955dad220b478",
    component: () => import("@/posts/3.vue"),
    date: dateToString(2013, 10, 27),
    id: "3",
    labels: [PostLabel.Algorithms, PostLabel.Compsci, PostLabel.Mathematics],
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
    title: "Bayes' theorem: a strange example",
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
