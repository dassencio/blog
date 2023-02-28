<template>
  <div class="item">
    <div class="item__bullet"><div class="item__bullet-icon"></div></div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  gap: $view-list-block-horizontal-gap;
  line-height: $view-paragraph-line-height;
  text-align: left;
  @media (min-width: $desktop-width-mode) {
    text-align: justify;
  }
  &__bullet {
    display: flex;
    height: $view-paragraph-line-height;
    align-items: center;
    &-icon {
      background-color: $view-text-color-normal;
      height: $view-list-bullet-size;
      width: $view-list-bullet-size;
    }
  }
}
</style>
