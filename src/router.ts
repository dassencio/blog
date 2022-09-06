import { createRouter, createWebHashHistory } from "vue-router";
import posts from "@/posts";
import PostList from "@/views/PostList.vue";

export const routes = [
  {
    path: "/",
    name: "post-list",
    component: PostList,
  },
  ...posts,
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
