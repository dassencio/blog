<template>
  <a class="icon" tabindex="0" :href="url">
    <img class="icon__image" :alt="name" :src="image" />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  name: string;
  url: string;
}>();
</script>

<style scoped lang="scss">
.icon {
  display: flex;
  filter: $nav-bar-icon-filter;
  &:active,
  &:focus,
  &:hover {
    filter: none;
  }
  &__image {
    border-radius: $nav-bar-icon-border-radius;
    width: $nav-bar-icon-width;
  }
}
</style>
