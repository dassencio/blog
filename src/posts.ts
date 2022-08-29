export default [
  {
    path: "/1",
    name: "post-1",
    title: "Post #1",
    component: () => import("@/views/posts/1.vue"),
  },
  {
    path: "/2",
    name: "post-2",
    title: "Post #2",
    component: () => import("@/views/posts/2.vue"),
  },
];
