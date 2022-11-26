<template>
  <p class="list">
    <slot></slot>
  </p>
</template>

<style scoped lang="scss">
.list {
  display: grid;
  gap: $view-list-block-vertical-gap $view-list-block-horizontal-gap;
  grid-template-columns: auto minmax(0, 1fr);
  margin-left: $view-list-block-horizontal-gap;
  :deep(> *) {
    line-height: $view-paragraph-line-height;
  }
}
</style>
