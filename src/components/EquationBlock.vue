<template>
  <p class="equation">
    $$
    {{ boxed ? "\\boxed{" : "" }}
    {{ align ? "\\begin{alignat}{99}" : "" }}
    {{ slotText }}
    {{ align ? "\\end{alignat}" : "" }}
    {{ boxed ? "}" : "" }}
    $$
  </p>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = defineProps<{
  align?: boolean;
  boxed?: boolean;
  numberLines?: boolean;
}>();

const slots = useSlots();
const slotText = computed(() => {
  if (slots.default) {
    return (slots.default()[0].children as string).replace(
      /\\\\/g,
      `${props.numberLines ? "" : "\\nonumber"}\\\\[6px]`
    );
  }
  throw new Error("Equation cannot be empty.");
});
</script>

<style scoped lang="scss">
.equation {
  padding: $view-vertical-correction-padding 0;
  margin-left: $view-indentation-length;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  :deep(mjx-container[display="true"]) {
    margin: 0;
  }
}
</style>
