<template>
  <p>
    To capture packets with <a href="https://www.wireshark.org">Wireshark</a>
    without needing to be root, open a terminal and run the following command:
  </p>

  <CodeBlock
    code="sudo setcap cap_net_raw,cap_net_admin+eip /usr/bin/dumpcap"
  />

  <p>
    This command enables all users to capture live traffic going through any
    network interface. If this meets your requirements, you're all set: simply
    launch Wireshark and enjoy it!
  </p>

  <p>
    For the curious readers, the command above modifies the
    <a href="http://man7.org/linux/man-pages/man7/capabilities.7.html"
      >capabilities</a
    >
    of <a href="http://linux.die.net/man/1/dumpcap">Dumpcap</a>, which is a tool
    that Wireshark uses to capture packets. You can verify that the command was
    successful by running:
  </p>

  <CodeBlock code="getcap /usr/bin/dumpcap" />

  <p>This is what you should see:</p>

  <CodeBlock code="/usr/bin/dumpcap = cap_net_admin,cap_net_raw+eip" />

  <p>
    If you feel that granting this privilege to all users is too permissive, you
    might want to create a group and only allow users within that group to
    execute Dumpcap (and therefore capture live traffic with Wireshark). If
    you're using Ubuntu/Debian, you can create a group called
    <code>wireshark</code> using the following command:
  </p>

  <CodeBlock code="sudo addgroup wireshark" />

  <p>Now, change the group of Dumpcap to <code>wireshark</code>:</p>

  <CodeBlock code="sudo chgrp wireshark /usr/bin/dumpcap" />

  <p>
    Next, ensure that only users in the <code>wireshark</code> group can execute
    Dumpcap:
  </p>

  <CodeBlock code="sudo chmod o-rx /usr/bin/dumpcap" />

  <p>
    Finally, add the necessary capabilities to Dumpcap as discussed earlier.
    Even if you have already run this command before, it's important to do it
    again since Dumpcap might have lost the capabilities that were previously
    assigned to it:
  </p>

  <CodeBlock
    code="sudo setcap cap_net_raw,cap_net_admin+eip /usr/bin/dumpcap"
  />

  <p>
    To check if the Dumpcap permissions are set correctly, start Wireshark as a
    regular user (I'm assuming you haven't added this user to the
    <code>wireshark</code> group yet). If you're unable to capture live traffic,
    the permissions are correct. At this point, you can add users to the
    <code>wireshark</code> group with the command below:
  </p>

  <CodeBlock code="sudo usermod -a -G wireshark <username>" />

  <p>
    To verify that a user has been correctly added to the
    <code>wireshark</code> group, run the following command:
  </p>

  <CodeBlock code="id <username>" />

  <p>
    Ensure that <code>wireshark</code> appears in the output; the rest is
    irrelevant:
  </p>

  <CodeBlock
    code="uid=1000(username) gid=1000(username) ..., 1001(**wireshark**)"
  />

  <p>
    Now, start Wireshark as a user in the <code>wireshark</code> group. You
    should be able to capture live traffic. If you completed all the steps above
    while logged in as a user you added to the <code>wireshark</code> group,
    logging out and back in may be necessary for the new permissions to take
    effect.
  </p>

  <NoteBlock>
    While, in principle, you could simply run Wireshark as root instead of
    following the instructions above, it is highly advised not to do this.
    Wireshark is a large application, and running it as root could unnecessarily
    risk damaging your system.
  </NoteBlock>

  <p>
    To learn more about this topic, please visit the
    <a href="http://wiki.wireshark.org/CaptureSetup/CapturePrivileges"
      >Wireshark wiki</a
    >.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
