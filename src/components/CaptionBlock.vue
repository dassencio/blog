<template>
  <div class="caption">
    <b class="caption__key">{{ captionKey }}:</b>
    <div class="caption__text">{{ caption }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  caption: string;
  figureNumber?: number;
  tableNumber?: number;
}>();

const captionKey = props.figureNumber
  ? `Fig. ${props.figureNumber}`
  : `Table ${props.tableNumber}`;
</script>

<style scoped lang="scss">
.caption {
  column-gap: $view-caption-block-horizontal-gap;
  display: flex;
  justify-content: center;
  line-height: $view-paragraph-line-height;
  margin: $view-caption-block-vertical-margin 0;
  padding: 0 $view-caption-block-horizontal-padding;
  &__key {
    white-space: nowrap;
  }
  &__text {
    text-align: left;
    @media (min-width: $desktop-width-mode) {
      text-align: justify;
    }
  }
}
</style>
