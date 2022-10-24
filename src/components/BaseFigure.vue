<template>
  <p class="figure" :id="`fig_${number}`">
    <span class="figure__contents"><slot></slot></span>
    <span class="figure__caption">
      <b class="figure__number">Fig. {{ number }}:</b>
      <span class="figure__description">{{ description }}</span>
    </span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  description: string;
  number: number;
}>();
</script>

<style scoped lang="scss">
.figure {
  padding-top: $view-vertical-correction-padding;
  text-align: center;
  &__caption {
    column-gap: $view-figure-caption-horizontal-gap;
    display: flex;
    justify-content: center;
    margin: $view-figure-caption-vertical-margin 0;
    padding: 0 $view-indentation-length;
  }
  &__contents {
    display: flex;
    flex-wrap: wrap;
    gap: $view-figure-content-gap;
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
