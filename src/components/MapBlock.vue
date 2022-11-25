<template>
  <p class="map">
    <slot></slot>
  </p>
</template>

<style scoped lang="scss">
.map {
  display: grid;
  gap: $view-map-block-vertical-gap $view-map-block-horizontal-gap;
  grid-template-columns: auto minmax(0, 1fr);
  margin-left: $view-indentation-length;
  :deep(> *) {
    line-height: $view-paragraph-line-height;
  }
}
</style>
