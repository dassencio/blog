<template>
  <button
    class="button"
    :class="buttonClass"
    @keydown.enter="onPress"
    @keydown.space="onPress"
    @keyup.enter="onRelease"
    @keyup.space="onRelease"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const buttonClass = ref("");
const emit = defineEmits(["clicked"]);

function onPress() {
  buttonClass.value = "active";
}
function onRelease() {
  buttonClass.value = "";
  emit("clicked");
}
</script>

<style scoped lang="scss">
.button {
  background: $view-button-background-color-normal;
  border-radius: $view-form-element-border-radius;
  border: $view-form-element-border-normal;
  outline: none;
  padding: $view-button-vertical-padding $view-button-horizontal-padding;
  text-align: center;
  user-select: none;
  white-space: nowrap;
  &.active,
  &:active {
    border: $view-form-element-border-active;
  }
  &:focus,
  &:hover {
    background: $view-button-background-color-focus;
    &:not(:active):not(.active) {
      border: $view-form-element-border-focus;
    }
  }
}
</style>
