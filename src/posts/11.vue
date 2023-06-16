<template>
  <p>
    On Linux, you can merge (concatenate) PDF files using a CLI tool called
    <a href="http://linux.die.net/man/1/pdfjam"><code>pdfjam</code></a
    >. If you're using Ubuntu/Debian, you can install it by opening a terminal
    and running the following command:
  </p>

  <CodeBlock code="sudo apt-get install pdfjam" />

  <p>You can now merge as many PDF files as you want by running:</p>

  <CodeBlock
    code="pdfjam file1.pdf file2.pdf ... fileN.pdf --outfile output-file.pdf"
  />

  <p>
    This will generate a file called <code>output-file.pdf</code>, which will be
    the result of joining together the input files <code>file1.pdf</code>,
    <code>file2.pdf</code>, ..., <code>fileN.pdf</code>.
  </p>

  <p>
    If you do not get the desired page orientation in the generated file, you
    can manually set it by adding
    <code>--landscape</code> or <code>--no-landscape</code> to the end of the
    command above.
  </p>

  <p>
    If you encounter problems with page orientations when merging multiple files
    together, consider merging only a few of them at a time and then merging the
    intermediate files you generated into a final document.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
