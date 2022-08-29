<template>
  <ul v-for="post in posts" :key="post.path">
    <RouterLink :to="post.path"
      ><li>{{ post.title }}</li></RouterLink
    >
  </ul>
</template>

<script setup lang="ts">
import posts from "@/posts";
</script>
