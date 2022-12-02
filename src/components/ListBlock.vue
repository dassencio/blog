<template>
  <div class="list">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: $view-list-block-vertical-gap;
  margin: $view-paragraph-vertical-margin 0 $view-paragraph-vertical-margin
    $view-list-block-horizontal-gap;
}
</style>
