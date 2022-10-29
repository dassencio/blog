<template>
  <h2 class="title"><slot></slot></h2>
</template>

<style scoped lang="scss">
.title {
  color: $view-title-color;
  font-size: $view-subtitle-font-size;
  line-height: fontSizeToLineHeight($view-subtitle-font-size);
  margin-top: $view-subtitle-margin-top;
}
</style>
