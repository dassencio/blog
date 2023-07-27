<template>
  <p>
    If you're using
    <a href="http://manpages.debian.org/cgi-bin/man.cgi?query=iptables"
      ><code>iptables</code></a
    >
    on your Raspberry Pi, you may start getting an error similar to the one
    below after a firmware upgrade:
  </p>

  <CodeBlock
    code="
    iptables v1.4.14: can't initialize iptables table `nat': Table does not exist (do you need to insmod?)
    Perhaps iptables or your kernel needs to be upgraded.
    "
  />

  <p>
    You can resolve the issue by downgrading the firmware to a version that
    doesn't have this problem. Here is how to do it: first, navigate to the
    <a href="https://github.com/Hexxeh/rpi-update/commits/master"
      >rpi-update repository page</a
    >, select a commit that was created before the day you upgraded the firmware
    on your Raspberry Pi, and then copy the sequence of characters associated
    with that commit. For those unfamiliar with
    <a href="https://en.wikipedia.org/wiki/Git">Git</a>, this sequence of
    characters is known as a commit hash and it uniquely identifies a commit.
    Specifically, you will be looking for something like this:
  </p>

  <CodeBlock code="commit 3ddf56c" />

  <p>
    Next, open a terminal on your Raspberry Pi and execute the following
    command:
  </p>

  <CodeBlock code="sudo rpi-update <commit-hash>" />

  <p>Here is an example using the commit hash shown above:</p>

  <CodeBlock code="sudo rpi-update 3ddf56c" />

  <p>
    Once you've done this, reboot your Raspberry Pi and verify if
    <code>iptables</code> is now working correctly. Should the problem persist,
    select an even older commit and rerun the command with its associated commit
    hash.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
