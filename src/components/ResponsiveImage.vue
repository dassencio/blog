<template>
  <a class="image" :href="link || src">
    <img class="image__file" :alt="alt" :src="src" />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  alt: string;
  link?: string;
  src: string;
}>();
</script>

<style scoped lang="scss">
.image {
  display: inline-flex;
  &__file {
    display: block;
    max-width: 100%;
    object-fit: contain;
    width: auto;
  }
}
</style>
