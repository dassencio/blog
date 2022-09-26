import { dateToString } from "@/functions";
import { PostLabel, type Post } from "@/types";

const posts: Post[] = [
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
