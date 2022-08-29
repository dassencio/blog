import { createRouter, createWebHashHistory } from "vue-router";
import PostList from "@/views/PostList.vue";
import posts from "@/posts";

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
