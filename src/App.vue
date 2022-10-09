<template>
  <NavBar />
  <main class="view">
    <PostHeader v-if="post" :post="post" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import PostHeader from "@/components/PostHeader.vue";
import posts from "@/posts";

const route = useRoute();
const post = computed(() => posts.find((post) => post.id === route.name));

watch(post, (post) => {
  document.title = (post ? `${post.title} - ` : "") + "Diego Assencio";
});
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
@font-face {
  font-family: "Open Sans SemiBold";
  src: url("@/assets/fonts/opensans-semibold.ttf") format("truetype");
}
@font-face {
  font-family: "Open Sans Italic";
  src: url("@/assets/fonts/opensans-italic.ttf") format("truetype");
}
@font-face {
  font-family: "Noto Sans Mono Regular";
  src: url("@/assets/fonts/notosansmono-regular.ttf") format("truetype");
}
* {
  background-color: transparent;
  color: $view-text-color-normal;
  font-family: "Open Sans Regular";
  font-size: $view-paragraph-font-size;
  font-synthesis: none;
  font-weight: normal;
  line-height: 1;
}
html {
  background-color: white;
  height: 100%;
}
p {
  line-height: $view-paragraph-line-height;
  margin: $view-paragraph-vertical-margin 0;
  text-align: left;
  @media (min-width: $desktop-width-mode) {
    text-align: justify;
  }
}
a {
  color: $view-link-color-normal;
  text-decoration: none;
  &:active,
  &:focus,
  &:hover {
    color: $view-link-color-focus;
    text-decoration: underline;
  }
}
mjx-container {
  a > g {
    fill: $view-link-color-normal;
  }
  &:active,
  &:focus,
  &:hover {
    a > g {
      fill: $view-link-color-focus;
    }
  }
}
b {
  font-family: "Open Sans SemiBold";
}
i {
  font-family: "Open Sans Italic";
}
code,
code * {
  font-family: "Noto Sans Mono Regular";
}
</style>

<style scoped lang="scss">
.view {
  margin: 0 auto;
  max-width: 100%;
  padding: $view-content-vertical-padding $content-horizontal-padding;
  width: $desktop-width-mode;
}
</style>
