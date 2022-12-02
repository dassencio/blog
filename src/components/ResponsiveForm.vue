<template>
  <div class="form">
    <div class="form__contents">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form {
  margin: $view-paragraph-vertical-margin 0;
  padding: $view-vertical-correction-padding 0;
  text-align: center;
  &__contents {
    display: inline-flex;
    flex-direction: column;
    gap: $view-form-vertical-gap;
    max-width: 100%;
  }
}
</style>
