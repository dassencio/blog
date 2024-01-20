<template>
  <div class="links">
    <a class="links__item" :href="issueTypeToUrl('question')">Ask a question</a>
    <a class="links__item" :href="issueTypeToUrl('error')">Report an error</a>
    <a class="links__item" :href="postSourceUrl">Source code</a>
  </div>
</template>

<script setup lang="ts">
import { removeExcessIndentation } from "@/functions";
import type { Post } from "@/posts";

const props = defineProps<{
  post: Post;
}>();

const blogUser = "dassencio";
const blogRepo = "blog";
const blogUrl = `https://github.com/${blogUser}/${blogRepo}`;

const postSourceUrl = `${blogUrl}/tree/main/src/posts/${props.post.id}.vue`;

// GitHub issue labels.
const issueLabel = {
  error: "Error",
  question: "Question",
};

// GitHub issue bodies.
const issueBody = {
  error: removeExcessIndentation(
    `
    **Post URL**\n
    ${window.location.href}\n
    **Description**\n
    Please describe the error here.
    `
  ).trim(),
  question: removeExcessIndentation(
    `
    **Post URL**\n
    ${window.location.href}\n
    **Question**\n
    Please enter your question here.
    `
  ).trim(),
};

function issueTypeToUrl(issueType: keyof typeof issueLabel) {
  const body = encodeURIComponent(issueBody[issueType]);
  const label = issueLabel[issueType];
  return `${blogUrl}/issues/new?labels=${label}&assignees=${blogUser}&body=${body}`;
}
</script>

<style scoped lang="scss">
.links {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: $post-footer-links-vertical-gap $post-footer-links-horizontal-gap;
  justify-content: center;
  margin: $post-footer-links-vertical-margin 0;
  &__item {
    font-size: $post-footer-link-font-size;
    line-height: fontSizeToLineHeight($post-footer-link-font-size);
    text-align: center;
    text-wrap: nowrap;
  }
}
</style>
