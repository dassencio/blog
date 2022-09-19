<template>
  <p class="equation">
    $$
    {{ boxed ? "\\boxed{" : "" }}
    {{ align ? "\\begin{align}" : "" }}
    {{ slotText }}
    {{ align ? "\\end{align}" : "" }}
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
  /*
   * Equations need extra padding to account for paragraph line height,
   * otherwise they appear too close to the paragraphs above and below. Using
   * margin instead of padding does not fix the problem since adjacent equations
   * still appear closer to each other than adjacent text paragraphs.
   */
  padding: 0.5 * ($view-paragraph-line-height - $view-paragraph-font-size) 0;
  margin-left: $view-indentation-length;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  :deep(mjx-container[display="true"]) {
    margin: 0;
  }
}
</style>
