<template>
  <p>
    To capture packets on <a href="https://www.wireshark.org">Wireshark</a>
    without being root, open a terminal and run:
  </p>

  <CodeBlock
    >sudo setcap 'CAP_NET_RAW+eip CAP_NET_ADMIN+eip' /usr/bin/dumpcap
  </CodeBlock>

  <p>
    This will enable all users to capture live traffic going through any network
    interface. If this is what you wish, you're done: just run
    <code>wireshark</code> and have fun!
  </p>

  <p>
    For the curious reader, the command above changes the
    <a href="http://man7.org/linux/man-pages/man7/capabilities.7.html"
      >capabilities</a
    >
    of <a href="http://linux.die.net/man/1/dumpcap">Dumpcap</a>, a tool which
    Wireshark uses to capture packets. You can verify that the command worked by
    running:
  </p>

  <CodeBlock>getcap /usr/bin/dumpcap</CodeBlock>

  <p>This is what you should see:</p>

  <CodeBlock>/usr/bin/dumpcap = cap_net_admin,cap_net_raw+eip</CodeBlock>

  <p>
    If you feel that allowing all users to have this privilege is too
    permissive, then you should create a group and only allow users from that
    group to execute <code>dumpcap</code> (and therefore to capture live traffic
    with Wireshark). On Ubuntu/Debian, you can create a group called
    <code>wireshark</code> with the following command:
  </p>

  <CodeBlock>sudo addgroup wireshark</CodeBlock>

  <p>
    Now change the group of the <code>dumpcap</code> binary to
    <code>wireshark</code>:
  </p>

  <CodeBlock>sudo chgrp wireshark /usr/bin/dumpcap</CodeBlock>

  <p>
    Make sure only users in the <code>wireshark</code> group can execute
    <code>dumpcap</code>:
  </p>

  <CodeBlock>sudo chmod 754 /usr/bin/dumpcap</CodeBlock>

  <p>
    Now add the necessary capabilities to <code>dumpcap</code> as discussed
    above (even if you already ran this command before, run it again as
    <code>dumpcap</code> might have lost its given capabilities at this point):
  </p>

  <CodeBlock
    >sudo setcap 'CAP_NET_RAW+eip CAP_NET_ADMIN+eip' /usr/bin/dumpcap
  </CodeBlock>

  <p>
    To test if your permissions are correct, run
    <code>wireshark</code> as a regular user (I'm assuming you have not added
    this user to the <code>wireshark</code> group). If you cannot capture live
    traffic, everything is fine. You should now add each user who should be
    allowed to capture traffic to the <code>wireshark</code> group with the
    command below:
  </p>

  <CodeBlock>sudo usermod -a -G wireshark &lt;username&gt;</CodeBlock>

  <p>
    To verify that the user now belongs to the <code>wireshark</code> group,
    run:
  </p>

  <CodeBlock>id &lt;username&gt;</CodeBlock>

  <p>
    The output should look similar to this (<code>wireshark</code>
    must be on the output, the rest is irrelevant):
  </p>

  <CodeBlock
    >uid=1000(username) gid=1000(username) ..., 1001(<b>wireshark</b>)
  </CodeBlock>

  <p>
    Now run <code>wireshark</code> as one of the users in the
    <code>wireshark</code> group; you should be able to capture live traffic. If
    you did all of the above as one of the users you added to the
    <code>wireshark</code> group, you may need to log out and log back in for
    your newly added permissions to take place.
  </p>

  <p>
    <b>NOTE</b>: While in principle you could just run <code>wireshark</code> as
    root instead of following the instructions above, <b>do not do this</b>!
    Wireshark is a huge application, and running it as root unnecessarily risks
    damaging your system.
  </p>

  <p>
    To read more about this topic, see the
    <a href="http://wiki.wireshark.org/CaptureSetup/CapturePrivileges"
      >Wireshark wiki</a
    >.
  </p>
</template>
