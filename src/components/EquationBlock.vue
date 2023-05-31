<template>
  <div class="equation">
    $$
    {{ boxed ? "\\boxed{" : "" }}
    {{ align ? "\\begin{alignat}{99}" : "" }}
    {{ slotText }}
    {{ align ? "\\end{alignat}" : "" }}
    {{ boxed ? "}" : "" }}
    $$
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = defineProps<{
  align?: boolean;
  boxed?: boolean;
  numberLines?: boolean;
}>();

/**
 * Fixes newlines in an equation. All occurrences of \\ which are not inside
 * \Matrix{...} are replaced with \\[6px].
 *
 * @param equation Equation text.
 * @returns Equation text with newlines fixed.
 */
function fixNewlines(equation: string) {
  const matrixPrefix = "\\Matrix{";
  const newline = `${props.numberLines ? "" : "\\nonumber"}\\\\[6px]`;

  let result = "";
  let lastEnd = 0;
  let matrixStart = equation.indexOf(matrixPrefix);

  while (matrixStart !== -1) {
    // Fix newlines in the segment of the equation before the next matrix.
    result += equation
      .substring(lastEnd, matrixStart)
      .replace(/\\\\/g, newline);

    let matrixEnd = matrixStart + matrixPrefix.length;
    let braceCount = 1;

    // Identify the end position of the next matrix.
    while (matrixEnd < equation.length && braceCount !== 0) {
      if (equation[matrixEnd] === "{") {
        ++braceCount;
      } else if (equation[matrixEnd] === "}") {
        --braceCount;
      }
      ++matrixEnd;
    }

    if (braceCount !== 0) {
      throw new Error("Mismatched braces in \\Matrix{}");
    }

    // Append the matrix contents without modification.
    result += equation.substring(matrixStart, matrixEnd);
    lastEnd = matrixEnd;

    // Find the start position of the next matrix.
    matrixStart = equation.indexOf(matrixPrefix, matrixEnd);
  }

  // Process the remaining segment of the equation after the last matrix.
  result += equation.substring(lastEnd).replace(/\\\\/g, newline);

  return result;
}

const slots = useSlots();
const slotText = computed(() => {
  if (slots.default) {
    return fixNewlines(slots.default()[0].children as string);
  }
  throw new Error("Equation cannot be empty.");
});
</script>

<style scoped lang="scss">
.equation {
  margin: $view-paragraph-vertical-margin 0 $view-paragraph-vertical-margin
    $view-indentation-length;
  max-width: 100%;
  overflow-x: auto;
  padding: $view-vertical-correction-padding 0;
  :deep(mjx-container[display="true"]) {
    margin: 0;
  }
}
</style>
