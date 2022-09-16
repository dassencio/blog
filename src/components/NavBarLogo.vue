<template>
  <RouterLink class="logo" @click="onNavLogoClick" to="/"
    >Diego Assencio
  </RouterLink>
</template>

<script setup lang="ts">
function onNavLogoClick() {
  (document.activeElement as HTMLElement).blur();
}
</script>

<style scoped lang="scss">
.logo {
  color: $nav-bar-logo-color-normal;
  font-family: "Open Sans Light";
  font-size: 2 * $base-length;
  text-decoration: none;
  &:active,
  &:focus,
  &:hover {
    color: $nav-bar-logo-color-active;
  }
}
</style>
