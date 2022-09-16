<template>
  <NavBar />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
</script>

<style lang="scss">
@font-face {
  font-family: "Open Sans Regular";
  src: url("@/assets/fonts/opensans-regular.ttf") format("truetype");
}
@font-face {
  font-family: "Open Sans Light";
  src: url("@/assets/fonts/opensans-light.ttf") format("truetype");
}
* {
  font-family: "Open Sans Regular";
  font-weight: normal;
  line-height: 1;
}
html {
  background-color: white;
  height: 100%;
}
</style>
