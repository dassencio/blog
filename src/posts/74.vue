<template>
  <p>
    If you're using a Linux distribution that manages sound using
    <a href="https://en.wikipedia.org/wiki/PulseAudio">PulseAudio</a>, you can
    still use
    <a href="http://linux.die.net/man/1/amixer"><code>amixer</code></a> to
    change the master volume or to mute/unmute your speakers via the command
    line.
  </p>

  <p>As an example, to decrease the master volume by 5%, run:</p>

  <CodeBlock code="amixer -D pulse sset Master 5%-" />

  <p>Similarly, to increase the master volume by 5%, run:</p>

  <CodeBlock code="amixer -D pulse sset Master 5%+" />

  <p>
    To mute your speakers, run the following command (to unmute, replace
    <code>mute</code> with <code>unmute</code>):
  </p>

  <CodeBlock code="amixer -D pulse sset Master mute" />

  <p>
    Finally, you can toggle the "muted" state of your speakers with this
    command:
  </p>

  <CodeBlock code="amixer -D pulse sset Master toggle" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
