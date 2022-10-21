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
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import PostListItem from "@/components/PostListItem.vue";
import mathjax from "@/mathjax";
import posts from "@/posts";
import type { PostLabel } from "@/types";

const route = useRoute();
const label = computed(() => route.query.label as PostLabel);
const matchingPosts = computed(() => {
  return label.value
    ? posts.filter((post) => post.labels.includes(label.value))
    : posts;
});

onMounted(() => {
  mathjax.render();
});
</script>

<style scoped lang="scss">
.header {
  margin-bottom: $view-header-margin-bottom;
  &__title {
    color: $view-title-color;
    font-size: $view-title-font-size;
    line-height: fontSizeToLineHeight($view-title-font-size);
  }
}
.post-list {
  &__item {
    margin-top: $view-subtitle-font-size;
  }
}
</style>
