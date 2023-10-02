<template>
  <div v-if="paragraphMode" class="code">
    <div class="code__contents"><slot></slot></div>
  </div>
  <pre
    v-else
    class="code"
    v-highlightjs
  ><code class="code__contents" :class="language" v-html="code"></code></pre>
</template>

<script setup lang="ts">
import { computed } from "vue";
import _ from "lodash";
import { escapeHtml, removeExcessIndentation } from "@/functions";

const props = withDefaults(
  defineProps<{
    code?: string;
    highlightDelimiter?: string;
    language?: string;
    paragraphMode?: boolean;
  }>(),
  {
    code: "",
    highlightDelimiter: "**",
    language: "plaintext",
    paragraphMode: false,
  }
);

function highlightCode(code: string) {
  if (props.language === "plaintext" && props.highlightDelimiter) {
    const delimiter = _.escapeRegExp(props.highlightDelimiter);
    const highlightRegex = new RegExp(`${delimiter}(.+?)${delimiter}`, "g");
    return code.replace(highlightRegex, "<span class='highlight'>$1</span>");
  }
  return code;
}

const code = computed(() =>
  removeExcessIndentation(
    highlightCode(escapeHtml(props.code.replace(/^\n+/, "").trimEnd()))
  )
);
</script>

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
    :deep(.highlight) {
      font-family: "Noto Sans Mono SemiBold";
    }
  }
}
</style>
