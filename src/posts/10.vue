<template>
  <p>
    If you do not wish to use the Network Manager, you have two options:
    disabling it or uninstalling it.
  </p>

  <SectionTitle>Option #1: disable it (recommended)</SectionTitle>

  <p>To stop the Network Manager, open a terminal and run:</p>

  <CodeBlock code="sudo service network-manager stop" />

  <p>You can restart the Network Manager at any time by running:</p>

  <CodeBlock code="sudo service network-manager start" />

  <p>
    To prevent the Network Manager from starting again on boot, create a file
    called <code>network-manager.override</code> in <code>/etc/init/</code> and
    add "<code>manual</code>" to its contents. This can be done with the
    following command:
  </p>

  <CodeBlock
    code='echo "manual" | sudo tee /etc/init/network-manager.override'
  />

  <p>
    To have the Network Manager start on boot again, simply remove the file you
    generated:
  </p>

  <CodeBlock code="sudo rm /etc/init/network-manager.override" />

  <p>
    This is the approach I recommend as it's easily reversible and keeps the
    Network Manager installed but inactive. If you run into trouble while trying
    to connect to the internet, you can still manually start the Network Manager
    to reestablish internet connection and then search for a solution to the
    problem you encountered.
  </p>

  <SectionTitle>Option #2: uninstall it</SectionTitle>

  <p>
    If you're using Ubuntu/Debian and are sure you will never need the Network
    Manager again, you can uninstall it by running:
  </p>

  <CodeBlock code="sudo apt-get remove network-manager network-manager-gnome" />

  <p>To stop a running instance of the Network Manager, run:</p>

  <CodeBlock code="sudo service network-manager stop" />

  <p>
    <b>NOTE</b>: If you uninstall the Network Manager and stop it, you will
    immediately lose internet access. Make sure you do this only if you know how
    to configure your network interfaces and connect to the internet via command
    line (without internet access, you will not be able to reinstall the Network
    Manager with <code>apt-get</code>). If in doubt about whether this is a safe
    approach, prefer using option #1 above.
  </p>
</template>
