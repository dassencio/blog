<template>
  <div class="separator">
    <span class="separator__top-line"></span>
    <span class="separator__bottom-line"></span>
  </div>
</template>

<style scoped lang="scss">
.separator {
  display: block;
  &__top-line {
    background-color: $view-separator-top-line-color;
    display: block;
    height: rem(1px);
  }
  &__bottom-line {
    background-color: $view-separator-bottom-line-color;
    display: block;
    height: rem(1px);
  }
}
</style>
