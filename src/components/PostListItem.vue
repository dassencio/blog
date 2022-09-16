<template>
  <li class="post">
    <RouterLink class="post__title" :to="{ name: post.id }">{{
      post.title
    }}</RouterLink>
    <PostDetails class="post__details" :post="post" />
  </li>
</template>

<script setup lang="ts">
import type { Post } from "@/types";
import PostDetails from "./PostDetails.vue";

defineProps<{
  post: Post;
}>();
</script>

<style scoped lang="scss">
.post {
  list-style: none;
  &__title {
    display: block;
    font-size: 1.25 * $base-length;
    line-height: 1.75 * $base-length;
  }
  &__details {
    margin-top: 0.5 * $base-length;
  }
}
</style>
