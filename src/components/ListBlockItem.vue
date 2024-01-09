<template>
  <div class="item">
    <div v-if="bullet" v-html="bullet"></div>
    <div v-else class="item__bullet"><div class="item__bullet-icon"></div></div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

const props = defineProps<{
  bullet?: string;
}>();

const bullet = computed(
  () => props.bullet || (inject("bulletIterator") as () => string)()
);
</script>

<style scoped lang="scss">
.item {
  display: flex;
  gap: $view-list-block-horizontal-gap;
  line-height: $view-paragraph-line-height;
  text-align: left;
  @media (min-width: $desktop-width-mode) {
    text-align: justify;
  }
  &__bullet {
    display: flex;
    height: $view-paragraph-line-height;
    align-items: center;
    &-icon {
      background-color: $view-text-color-normal;
      height: $view-list-bullet-size;
      width: $view-list-bullet-size;
    }
  }
}
</style>
