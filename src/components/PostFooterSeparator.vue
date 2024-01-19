<template>
  <div class="separator">
    <div class="separator__circle" v-for="i in 3" :key="i"></div>
  </div>
</template>

<style scoped lang="scss">
.separator {
  align-items: center;
  column-gap: $post-footer-separator-horizontal-gap;
  display: flex;
  justify-content: center;
  margin: $post-footer-separator-vertical-margin 0;
  &__circle {
    background-color: $post-footer-separator-circle-color;
    border-radius: 50%;
    height: 2 * $post-footer-separator-circle-radius;
    width: 2 * $post-footer-separator-circle-radius;
  }
}
</style>
