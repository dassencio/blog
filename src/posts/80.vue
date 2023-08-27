<template>
  <p>
    I recently released the first version of a new project called
    <a href="https://github.com/dassencio/easy-geoip/">easy-geoip</a>: an
    easy-to-install and easy-to-use IP geolocation server. It supports both IPv4
    and IPv6 addresses.
  </p>

  <p>
    With easy-geoip, you can obtain IP geolocation data in either JSON or plain
    text format. To see what the output looks like for your IP address, visit
    <a href="http://geoip.assencio.com">my own running instance</a> of
    easy-geoip. For output in plain text data, use
    <a href="http://geoip.assencio.com/?format=plain">this link</a>.
  </p>

  <p>
    Download and installation instructions are available
    <a href="https://github.com/dassencio/easy-geoip/blob/master/README.md"
      >here</a
    >. Enjoy!
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
