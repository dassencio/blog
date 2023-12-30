<template>
  <p>
    I have recently developed a tool,
    <a href="https://github.com/dassencio/mapgen"><code>mapgen</code></a
    >, that generates interactive maps with customizable markers. It takes a
    YAML file containing map settings and marker data as input and generates an
    HTML page as output. This page contains all the JavaScript and CSS code it
    needs, inlined into it, so it can be directly opened in a web browser
    (without the need for a web server), shared with others (e.g., via email),
    or added to an existing webpage through an
    <code>&lt;iframe&gt;</code> element. Below is an example of a simple map
    generated with <code>mapgen</code>:
  </p>

  <FigureBlock
    caption="Largest capital cities of the European Union. Clicking on a marker
             will open a popup showing its associated city name and estimated
             population."
  >
    <iframe class="eu-capitals" src="/files/largest-eu-capitals.html"></iframe>
  </FigureBlock>

  <p>
    The contents of the YAML file used as input to generate this map can be
    found
    <a
      href="https://github.com/dassencio/mapgen/blob/master/examples/largest-eu-capitals/input.yaml"
      >here</a
    >. If you would like to see additional examples or read the tool's
    documentation, visit its
    <a href="https://github.com/dassencio/mapgen/blob/master/README.md"
      ><code>README</code></a
    >
    file.
  </p>

  <p>Feedback and feature requests will be welcome. Have fun! :-)</p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>

<style scoped lang="scss">
.eu-capitals {
  height: 20 * $base-length;
  width: 35 * $base-length;
}
</style>
