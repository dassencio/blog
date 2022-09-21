<template>
  <div class="details">
    <div class="details__date">Posted on {{ post.date }}</div>
    <div class="details__labels">
      <RouterLink
        class="details__label"
        v-for="label in post.labels"
        :key="label"
        :to="{ name: 'post-list', query: { label } }"
        >{{ label }}</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "@/types";

defineProps<{
  post: Post;
}>();
</script>

<style scoped lang="scss">
.details {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: $view-post-details-vertical-margin $view-post-details-horizontal-gap;
  &__date {
    font-size: $view-post-details-font-size;
  }
  &__labels {
    display: flex;
    flex-wrap: wrap;
    gap: $view-label-space-around;
  }
  &__label {
    background-color: $view-label-background-color-normal;
    border-radius: $view-label-border-radius;
    color: $view-text-color-normal;
    font-size: $view-post-details-font-size;
    padding: $view-label-vertical-padding $view-label-horizontal-padding;
    text-decoration: none;
    &:active,
    &:focus,
    &:hover {
      background-color: $view-label-background-color-active;
    }
  }
}
</style>
