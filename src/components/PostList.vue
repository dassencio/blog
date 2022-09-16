<template>
  <header class="header">
    <h1 class="header__title">
      {{ label ? `Posts in ${label}` : "All posts" }}
    </h1>
  </header>
  <ul class="post-list">
    <PostListItem
      class="post-list__item"
      v-for="post in matchingPosts"
      :key="post.id"
      :post="post"
    />
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import PostListItem from "@/components/PostListItem.vue";
import type { PostLabel } from "@/types";
import posts from "@/posts";

const route = useRoute();
const label = computed(() => route.query.label as PostLabel);
const matchingPosts = computed(() => {
  return label.value
    ? posts.filter((post) => post.labels.includes(label.value))
    : posts;
});
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 2.5 * $base-length;
  &__title {
    color: $view-title-color;
    font-size: 2 * $base-length;
    line-height: 2.5 * $base-length;
  }
}
.post-list {
  &__item {
    margin-top: 1.5 * $base-length;
  }
}
</style>
