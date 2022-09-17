import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocation,
} from "vue-router";
import PostList from "@/components/PostList.vue";
import posts from "@/posts";

const routes = [
  {
    beforeEnter(
      to: RouteLocation,
      _from: RouteLocation,
      next: NavigationGuardNext
    ) {
      /*
       * In the previous architecture of this blog, posts were reachable
       * through query parameters (?index=<postIndex>). This is no longer the
       * case, so in order to avoid breaking existing links to this blog, a
       * navigation guard is used to redirect them to the new paths.
       */
      const index = to.query.index;
      const post = posts.find((post) => post.compatibilityIndex === index);
      if (post) {
        next({ name: post.id });
      } else {
        next();
      }
    },
    component: PostList,
    name: "post-list",
    path: "/",
  },
  ...posts.map((post) => ({
    component: post.component,
    name: post.id,
    path: `/${post.id}`,
  })),
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
