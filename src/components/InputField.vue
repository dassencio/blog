<template>
  <label class="input" ref="input" @click="input.focus">
    {{ label }}
    <input
      class="input__field"
      type="text"
      :value="modelValue"
      @input="updateValue"
    />
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  label: string;
  modelValue: string;
}>();

const input = ref();
const emit = defineEmits(["update:modelValue"]);

function updateValue(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<style scoped lang="scss">
.input {
  align-items: center;
  column-gap: $view-input-field-gap;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover &__field {
    border: $view-form-element-border-focus;
  }
  &__field {
    border-radius: $view-form-element-border-radius;
    border: $view-form-element-border-normal;
    outline: none;
    padding: $view-input-field-padding;
    width: $view-input-field-default-width;
    &:focus {
      border: $view-form-element-border-focus;
    }
  }
}
</style>
