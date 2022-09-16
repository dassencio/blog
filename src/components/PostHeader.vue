<template>
  <header class="header">
    <h1 class="header__title">{{ props.post.title }}</h1>
    <PostHeaderSeparator class="header__separator" />
    <PostDetails :post="post" />
  </header>
</template>

<script setup lang="ts">
import PostDetails from "@/components/PostDetails.vue";
import PostHeaderSeparator from "@/components/PostHeaderSeparator.vue";
import type { Post } from "@/types";

const props = defineProps<{
  post: Post;
}>();
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 1.5 * $base-length;
  &__title {
    color: $view-title-color;
    font-size: 1.6 * $base-length;
    line-height: 2.1 * $base-length;
  }
  &__separator {
    margin: (0.5 * $base-length) 0;
  }
}
</style>
