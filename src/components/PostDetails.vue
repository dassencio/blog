<template>
  <div class="details">
    <span class="details__date"> Posted on {{ post.date }} </span>
    <div class="details__labels">
      <RouterLink
        class="details__label"
        v-for="label in post.labels"
        :key="label"
        :to="`/?label=${label}`"
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
  flex-wrap: wrap-reverse;
  font-size: 0.8 * $base-length;
  gap: (0.5 * $base-length) $base-length;
  &__labels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3 * $base-length;
  }
  &__label {
    background-color: $view-label-background-color-normal;
    border-radius: 0.6 * $base-length;
    color: $view-text-color-normal !important;
    padding: (0.2 * $base-length) (0.5 * $base-length);
    text-decoration: none !important;
    &:active,
    &:focus,
    &:hover {
      background-color: $view-label-background-color-active;
    }
  }
}
</style>
