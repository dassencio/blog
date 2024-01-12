<template>
  <li class="post">
    <RouterLink class="post__title" :to="{ name: post.id }"
      ><span v-html="post.title"></span
    ></RouterLink>
    <PostDetails class="post__details" :post="post" />
  </li>
</template>

<script setup lang="ts">
import PostDetails from "@/components/PostDetails.vue";
import type { Post } from "@/posts";

defineProps<{
  post: Post;
}>();
</script>

<style scoped lang="scss">
.post {
  list-style: none;
  &__title {
    font-size: $view-subtitle-font-size;
    line-height: fontSizeToLineHeight($view-subtitle-font-size);
  }
  &__details {
    margin: $view-post-details-vertical-margin 0;
  }
}
</style>
