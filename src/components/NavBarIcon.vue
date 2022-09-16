<template>
  <a class="icon" :href="url"
    ><img class="icon__image" :alt="name" :src="image"
  /></a>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  name: string;
  url: string;
}>();
</script>

<style scoped lang="scss">
$base-width: $view-paragraph-font-size;

.icon {
  filter: grayscale(1) opacity(0.2);
  &:active,
  &:focus,
  &:hover {
    filter: none;
  }
  &__image {
    border-radius: 0.4 * $base-width;
    width: 2.75 * $base-width;
  }
}
</style>
