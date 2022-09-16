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

<style scoped lang="scss">
$base-length: $view-paragraph-font-size;

.view {
  color: $view-text-color-normal;
  font-size: $base-length;
  margin: 0 auto;
  max-width: 100%;
  padding: (3.5 * $base-length) $base-length;
  width: $desktop-width-mode;
}
</style>
