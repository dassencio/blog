<template>
  <div class="code">
    <pre class="code__contents"><slot></slot></pre>
  </div>
</template>

<style scoped lang="scss">
.code {
  margin: $view-paragraph-vertical-margin 0;
  padding: $view-vertical-correction-padding 0;
  &__contents {
    background: $view-code-block-background-color;
    border: $view-code-block-border;
    font-family: "Noto Sans Mono Regular";
    font-size: $view-code-block-font-size;
    line-height: $view-paragraph-line-height;
    overflow-x: auto;
    padding: $view-code-block-vertical-padding
      $view-code-block-horizontal-padding;
    :deep(b) {
      font-family: "Noto Sans Mono SemiBold";
    }
  }
}
</style>
