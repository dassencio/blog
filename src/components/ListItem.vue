<template>
  <span class="item"><span class="item__bullet"></span></span><slot></slot>
</template>

<style scoped lang="scss">
.item {
  align-items: center;
  display: flex;
  height: $view-paragraph-line-height;
  justify-self: center;
  &__bullet {
    background-color: $view-text-color-normal;
    height: $view-list-bullet-size;
    width: $view-list-bullet-size;
  }
}
</style>
