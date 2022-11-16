<template>
  <p>
    To capture packets with <a href="https://www.wireshark.org">Wireshark</a>
    without being root, open a terminal and run:
  </p>

  <CodeBlock
    code="sudo setcap cap_net_raw,cap_net_admin+eip /usr/bin/dumpcap"
  />

  <p>
    This will enable all users to capture live traffic going through any network
    interface. If this is what you wish, you're done: just start Wireshark and
    have fun!
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

  <CodeBlock code="getcap /usr/bin/dumpcap" />

  <p>This is what you should see:</p>

  <CodeBlock code="/usr/bin/dumpcap = cap_net_admin,cap_net_raw+eip" />

  <p>
    If you feel that granting this privilege to all users is too permissive,
    then you should create a group and only allow users within that group to
    execute Dumpcap (and therefore to capture live traffic with Wireshark). If
    you're using Ubuntu/Debian, you can create a group called
    <code>wireshark</code> with the following command:
  </p>

  <CodeBlock code="sudo addgroup wireshark" />

  <p>Now change the group of Dumpcap to <code>wireshark</code>:</p>

  <CodeBlock code="sudo chgrp wireshark /usr/bin/dumpcap" />

  <p>
    Next, make sure only users in the <code>wireshark</code> group can execute
    Dumpcap:
  </p>

  <CodeBlock code="sudo chmod o-rx /usr/bin/dumpcap" />

  <p>
    Finally, add the necessary capabilities to Dumpcap as discussed above (even
    if you already ran this command before, run it again as Dumpcap might have
    lost its given capabilities at this point):
  </p>

  <CodeBlock
    code="sudo setcap cap_net_raw,cap_net_admin+eip /usr/bin/dumpcap"
  />

  <p>
    To check if your permissions are correct, start Wireshark as a regular user
    (I'm assuming you haven't added this user to the
    <code>wireshark</code> group yet). If you cannot capture live traffic,
    everything is fine. At this point, you can add users to the
    <code>wireshark</code> group with the command below:
  </p>

  <CodeBlock code="sudo usermod -a -G wireshark <username>" />

  <p>
    To verify that a user was correctly added to the
    <code>wireshark</code> group, run:
  </p>

  <CodeBlock code="id <username>" />

  <p>
    The output should look similar to this (<code>wireshark</code>
    must appear in the output; the rest is irrelevant):
  </p>

  <CodeBlock
    code="uid=1000(username) gid=1000(username) ..., 1001(**wireshark**)"
  />

  <p>
    Now start Wireshark as one of the users in the
    <code>wireshark</code> group: you should be able to capture live traffic. If
    you did all of the above while logged in as one of the users you added to
    the <code>wireshark</code> group, you may need to log out and log back in
    for your newly added permissions to become active.
  </p>

  <p>
    <b>NOTE</b>: While in principle you could simply run Wireshark as root
    instead of following the instructions above, <b>do not do this</b>!
    Wireshark is a huge application, and running it as root unnecessarily risks
    damaging your system.
  </p>

  <p>
    To learn more about this topic, see the
    <a href="http://wiki.wireshark.org/CaptureSetup/CapturePrivileges"
      >Wireshark wiki</a
    >.
  </p>
</template>
