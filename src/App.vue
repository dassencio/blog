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
* {
  font-family: "Open Sans Regular";
}
html {
  background-color: white;
  height: 100%;
}
</style>
