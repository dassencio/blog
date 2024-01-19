<template>
  <footer>
    <PostFooterSeparator />
    <PostFooterLinks :post="post" />
  </footer>
</template>

<script setup lang="ts">
import PostFooterLinks from "@/components/PostFooterLinks.vue";
import PostFooterSeparator from "@/components/PostFooterSeparator.vue";
import type { Post } from "@/posts";

defineProps<{
  post: Post;
}>();
</script>
