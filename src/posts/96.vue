<template>
  <p>
    <a
      href="https://web.archive.org/web/20170120220642/http://www.gpsinformation.org/dale/nmea.htm"
      >NMEA</a
    >
    is a standard widely used to represent GPS position information in textual
    form. This standard defines a set of one-line sentences, each independent of
    the others, containing information such as position, velocity, and time.
  </p>

  <p>
    Given the vast array of applications that understand NMEA data, I decided to
    create a tool to generate NMEA sentences from a path that can be manually
    drawn on a map. This path represents an object or person moving around with
    a GPS device, which is assumed to provide its current position at regular
    intervals (e.g., once every second).
  </p>

  <p>
    The tool is named <a href="https://nmeagen.org">NMEA Generator</a>. I hope
    you find it useful. Should you have any questions, please don't hesitate to
    <a href="https://github.com/dassencio/nmeagen/issues"
      >open an issue on GitHub</a
    >. Enjoy!
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
