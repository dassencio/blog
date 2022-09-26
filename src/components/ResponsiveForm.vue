<template>
  <p class="form">
    <span class="form__contents">
      <slot></slot>
    </span>
  </p>
</template>

<style scoped lang="scss">
.form {
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
