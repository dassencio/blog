<template>
  <div class="figure" :id="`fig_${number}`">
    <div class="figure__contents"><slot></slot></div>
    <div class="figure__caption">
      <b class="figure__number">Fig. {{ number }}:</b>
      <div class="figure__description">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  description: string;
  number: number;
}>();
</script>

<style scoped lang="scss">
.figure {
  margin: $view-paragraph-vertical-margin 0;
  padding-top: $view-vertical-correction-padding;
  text-align: center;
  &__caption {
    column-gap: $view-figure-caption-horizontal-gap;
    display: flex;
    justify-content: center;
    line-height: $view-paragraph-line-height;
    margin: $view-figure-caption-vertical-margin 0;
    padding: 0 $view-figure-caption-horizontal-padding;
  }
  &__contents {
    display: flex;
    flex-wrap: wrap;
    gap: $view-figure-contents-gap;
    justify-content: center;
  }
  &__description {
    text-align: left;
    @media (min-width: $desktop-width-mode) {
      text-align: justify;
    }
  }
  &__number {
    white-space: nowrap;
  }
}
</style>
