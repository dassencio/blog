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
  filter: grayscale(1) opacity(0.2);
  width: $nav-bar-icon-width;
  &:active,
  &:focus,
  &:hover {
    filter: none;
  }
}
</style>
