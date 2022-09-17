<template>
  <a :href="url"><img class="icon" :alt="name" :src="image" /></a>
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
  border-radius: $nav-bar-icon-border-radius;
  filter: $nav-bar-icon-filter;
  width: $nav-bar-icon-width;
  &:active,
  &:focus,
  &:hover {
    filter: none;
  }
}
</style>
