<template>
  <p>
    To resize images on Linux via command line, you can use a tool called
    <a href="http://linux.die.net/man/1/convert">convert</a> which is part of
    the
    <a href="http://linux.die.net/man/1/imagemagick">ImageMagick</a> package. If
    you're using Ubuntu/Debian, you can install it by opening a terminal and
    running the following command:
  </p>

  <CodeBlock code="sudo apt-get install imagemagick" />

  <p>
    Here is an example of how to resize a JPEG file to
    <code>640x480</code> pixels:
  </p>

  <CodeBlock
    code="convert -resize 640x480 <input-file.jpg> <output-file.jpg>"
  />

  <p>
    The command above takes an image called
    <code>input-file.jpg</code>, resizes it to <code>640x480</code> pixels and
    outputs the result to <code>output-file.jpg</code>.
  </p>

  <p>
    You can also use a percentage value to resize an image. For instance, to
    shrink an image to 50% of its original size, run:
  </p>

  <CodeBlock code="convert -resize 50% <input-file.jpg> <output-file.jpg>" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
