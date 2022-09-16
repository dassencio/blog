<template>
  <NavBar />
  <main class="view">
    <PostHeader v-if="post" :post="post" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import PostHeader from "@/components/PostHeader.vue";
import posts from "@/posts";

const route = useRoute();
const post = computed(() => posts.find((post) => post.id === route.name));
</script>

<style scoped lang="scss">
.view {
  color: $view-text-color-normal;
  font-size: $base-length;
  margin: 0 auto;
  max-width: 100%;
  padding: (3.5 * $base-length) $base-length;
  width: $desktop-width-mode;
  :deep(p) {
    line-height: $view-paragraph-line-height;
    margin: $base-length 0;
    text-align: left;
    @media (min-width: $desktop-width-mode) {
      text-align: justify;
    }
  }
  :deep(a),
  :deep(mjx-container a > g) {
    color: $view-link-color-normal;
    fill: $view-link-color-normal;
    text-decoration: none;
    &:active,
    &:focus,
    &:hover {
      color: $view-link-color-active;
      fill: $view-link-color-active;
      text-decoration: underline;
    }
  }
}
</style>
