<template>
  <p>
    If you're using
    <a href="http://linux.die.net/man/1/bmake"><code>bmake</code></a>
    to compile a software project on Linux, you may get the following type of
    error:
  </p>

  <CodeBlock
    code="
    cc: error: <libname>.so.1: No such file or directory
    cc: error: unrecognized command line option ‘-soname’
    *** Error code 1
    "
  />

  <p>
    This error indicates that the <code>bmake</code> package in your
    distribution has a bug in one of its BSD Makefiles. Fortunately, the fix is
    simple. All you need to do is open the following file:
  </p>

  <CodeBlock code="sudo nano /usr/share/mk/bsd.lib.mk" />

  <p>and replace this line:</p>

  <CodeBlock
    code="SHLIB_SHFLAGS=          -soname lib${LIB}.so.${SHLIB_SOVERSION}"
  />

  <p>with this:</p>

  <CodeBlock
    code="SHLIB_SHFLAGS=          -Wl,-soname=lib${LIB}.so.${SHLIB_SOVERSION}"
  />

  <p>
    After saving the file, you should be able to compile your project without
    any problems.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
