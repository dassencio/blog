<template>
  <div class="map">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.map {
  display: grid;
  gap: $view-map-block-vertical-gap $view-map-block-horizontal-gap;
  grid-template-columns: auto minmax(0, 1fr);
  line-height: $view-paragraph-line-height;
  margin: $view-paragraph-vertical-margin 0 $view-paragraph-vertical-margin
    $view-indentation-length;
  max-width: 100%;
  overflow-x: auto;
  text-align: left;
  @media (min-width: $desktop-width-mode) {
    text-align: justify;
  }
}
</style>
