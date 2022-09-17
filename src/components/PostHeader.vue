<template>
  <header class="header">
    <h1 class="header__title">{{ post.title }}</h1>
    <div class="header__separator"></div>
    <PostDetails :post="post" />
  </header>
</template>

<script setup lang="ts">
import PostDetails from "@/components/PostDetails.vue";
import type { Post } from "@/types";

defineProps<{
  post: Post;
}>();
</script>

<style scoped lang="scss">
.header {
  margin-bottom: $view-header-margin-bottom;
  &__title {
    color: $view-title-color;
    font-size: $view-title-font-size;
    line-height: fontSizeToLineHeight($view-title-font-size);
  }
  &__separator {
    border-bottom: $view-separator-bottom-line;
    border-top: $view-separator-top-line;
    margin: $view-post-details-vertical-margin 0;
  }
}
</style>
