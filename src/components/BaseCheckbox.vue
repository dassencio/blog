<template>
  <div
    class="option"
    :class="optionClass"
    tabindex="0"
    @click="onClick"
    @keydown.enter="onPress"
    @keydown.space="onPress"
    @keyup.enter="onRelease"
    @keyup.space="onRelease"
  >
    <div class="option__checkbox">
      <span class="option__cross-line-1"></span>
      <span class="option__cross-line-2"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const checkboxActive = ref(false);
const emit = defineEmits(["update:modelValue"]);

const optionClass = computed(() => ({
  checked: props.modelValue,
  active: checkboxActive.value,
}));

function onClick() {
  toggleModelValue();
}
function onPress() {
  checkboxActive.value = true;
}
function onRelease() {
  checkboxActive.value = false;
  toggleModelValue();
}

function toggleModelValue() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style scoped lang="scss">
.option {
  align-items: center;
  column-gap: $view-checkbox-horizontal-gap;
  cursor: pointer;
  display: flex;
  line-height: 1;
  outline: none;
  user-select: none;
  &.active &__checkbox,
  &:active &__checkbox {
    border: $view-form-element-border-active;
  }
  &:focus:not(:active):not(.active) &__checkbox,
  &:hover:not(:active):not(.active) &__checkbox {
    border: $view-form-element-border-focus;
  }
  &__checkbox {
    align-items: center;
    border-radius: $view-form-element-border-radius;
    border: $view-form-element-border-normal;
    display: inline-flex;
    flex-direction: column;
    height: $view-checkbox-size;
    justify-content: center;
    width: $view-checkbox-size;
  }
  &__cross-line-1,
  &__cross-line-2 {
    background-color: $view-text-color-normal;
    border-radius: $view-checkbox-cross-line-border-radius;
    display: none;
    height: $view-checkbox-cross-line-height;
    width: $view-checkbox-cross-line-width;
  }
  &__cross-line-1 {
    transform: translateY(0.5 * $view-checkbox-cross-line-height) rotate(45deg);
  }
  &__cross-line-2 {
    transform: translateY(-0.5 * $view-checkbox-cross-line-height)
      rotate(-45deg);
  }
  &.checked &__cross-line-1,
  &.checked &__cross-line-2 {
    display: block;
  }
}
</style>
