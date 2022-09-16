<template>
  <NavBar />
  <main class="view">
    <PostHeader v-if="post" :post="post" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import PostHeader from "@/components/PostHeader.vue";
import posts from "@/posts";

const route = useRoute();
const post = computed(() => posts.find((post) => post.id === route.name));
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
p {
  font-size: $view-paragraph-font-size;
  line-height: $view-paragraph-line-height;
  margin: $view-paragraph-vertical-margin 0;
  text-align: left;
  @media (min-width: $desktop-width-mode) {
    text-align: justify;
  }
}
a,
mjx-container a > g {
  color: $view-link-color-normal;
  fill: $view-link-color-normal;
  text-decoration: none;
  &:active,
  &:focus,
  &:hover {
    color: $view-link-color-active;
    fill: $view-link-color-active;
    text-decoration: underline;
  }
}
</style>

<style scoped lang="scss">
.view {
  color: $view-text-color-normal;
  margin: 0 auto;
  max-width: 100%;
  padding: $view-content-vertical-padding $content-horizontal-padding;
  width: $desktop-width-mode;
}
</style>
