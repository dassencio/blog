import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocation,
} from "vue-router";
import posts from "@/posts";
import store from "@/store";

const routes = [
  {
    beforeEnter(
      to: RouteLocation,
      _from: RouteLocation,
      next: NavigationGuardNext
    ) {
      store.dispatch("reset");
      /*
       * In the previous architecture of this blog, posts were reachable
       * through query parameters (?index=<postIndex>). This is no longer the
       * case, so in order to avoid breaking existing links to this blog, a
       * navigation guard is used to redirect them to the new paths.
       */
      const index = to.query.index;
      if (index) {
        const post = posts.find((post) => post.compatibilityIndex === index);
        if (post) {
          next({ name: post.id });
          return;
        }
      }
      next();
    },
    component: () => import("@/components/PostList.vue"),
    name: "post-list",
    path: "/",
  },
  ...posts.map((post) => ({
    beforeEnter() {
      store.dispatch("reset");
    },
    component: post.component,
    name: post.id,
    path: `/${post.id}`,
  })),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
