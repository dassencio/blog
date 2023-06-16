<template>
  <p>
    If you no longer want to use the
    <a href="https://en.wikipedia.org/wiki/NetworkManager">NetworkManager</a>,
    you have two options: disabling it or uninstalling it.
  </p>

  <SectionTitle>Option #1: Disable it (recommended)</SectionTitle>

  <p>To stop the NetworkManager, open a terminal and run:</p>

  <CodeBlock code="sudo service network-manager stop" />

  <p>You can restart the NetworkManager at any time by running:</p>

  <CodeBlock code="sudo service network-manager start" />

  <p>
    To prevent the NetworkManager from starting again on boot, create a file
    called <code>network-manager.override</code> in <code>/etc/init/</code> and
    add "<code>manual</code>" to its contents. This can be done with the
    following command:
  </p>

  <CodeBlock
    code='echo "manual" | sudo tee /etc/init/network-manager.override'
  />

  <p>
    To have the NetworkManager start on boot again, simply remove the file you
    created:
  </p>

  <CodeBlock code="sudo rm /etc/init/network-manager.override" />

  <p>
    I recommend this approach as it's easily reversible and keeps the
    NetworkManager installed but inactive. If you run into trouble while trying
    to connect to the internet, you can still manually start the NetworkManager
    to re-establish an internet connection and then search for a solution to the
    problem you encountered.
  </p>

  <SectionTitle>Option #2: Uninstall it</SectionTitle>

  <p>
    If you're using Ubuntu/Debian and are sure you will never need the
    NetworkManager again, you can uninstall it by running:
  </p>

  <CodeBlock code="sudo apt-get remove network-manager network-manager-gnome" />

  <p>To stop a running instance of the NetworkManager, run:</p>

  <CodeBlock code="sudo service network-manager stop" />

  <NoteBlock>
    If you uninstall the NetworkManager and stop it, you will immediately lose
    internet access. Make sure you do this only if you know how to configure
    your network interfaces and connect to the internet via command line
    (without internet access, you will not be able to reinstall the
    NetworkManager with <code>apt-get</code>). If in doubt about whether this is
    a safe approach, consider using option #1 above.
  </NoteBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
