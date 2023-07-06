<template>
  <p>
    On Linux, some commands (e.g.,
    <a href="http://linux.die.net/man/1/strace"><code>strace</code></a
    >) output relevant messages to
    <a
      href="https://en.wikipedia.org/wiki/Standard_streams#Standard_error_.28stderr.29"
      ><code>stderr</code></a
    >
    instead of
    <a
      href="https://en.wikipedia.org/wiki/Standard_streams#Standard_output_.28stdout.29"
      ><code>stdout</code></a
    >. This can be a problem when trying to pipe the output of a command to
    tools such as
    <a href="http://linux.die.net/man/1/less"><code>less</code></a> or
    <a href="http://linux.die.net/man/1/grep"><code>grep</code></a
    >. Fortunately, most modern shell interpreters allow you to redirect the
    output of a command from <code>stderr</code> to <code>stdout</code> (and
    vice versa). Here is an example of how this can be done with
    <a href="http://www.tldp.org/LDP/abs/html/io-redirection.html">Bash</a>
    so the output of <code>strace</code> can be read with <code>less</code>:
  </p>

  <CodeBlock code="strace command 2>&1 | less" />

  <p>
    The <code>2>&amp;1</code> part instructs Bash to redirect the contents of
    <code>stderr</code> to <code>stdout</code> before piping them to
    <code>less</code>. This syntax refers to the fact that in C programs, the
    <a href="https://en.wikipedia.org/wiki/File_descriptor">file descriptors</a>
    of <code>stdout</code> and <code>stderr</code> have values
    <code>1</code> and <code>2</code>, respectively. In general, to read
    whatever a command outputs to <code>stderr</code> with <code>less</code>,
    follow the recipe below:
  </p>

  <CodeBlock code="command 2>&1 | less" />

  <NoteBlock>
    The contents originally written to <code>stdout</code> will be mixed up with
    the contents from <code>stderr</code> when you pipe with the redirection
    above. If you want to get only what the command outputs to
    <code>stderr</code> but not what it originally outputs to
    <code>stdout</code>, you must redirect its original <code>stdout</code>
    output somewhere else (e.g., to
    <a href="https://en.wikipedia.org/wiki/Null_device"
      ><code>/dev/null</code></a
    >):
  </NoteBlock>

  <CodeBlock code="command 2>&1 1>/dev/null | less" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
