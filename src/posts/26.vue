<template>
  <p>
    There are multiple ways to change the
    <a href="https://en.wikipedia.org/wiki/MAC_address">MAC address</a> of a
    network interface on Linux. In this post, I will show how this can be done
    using a very intuitive CLI tool called
    <a href="http://manpages.ubuntu.com/manpages/lucid/man1/macchanger.1.html"
      >macchanger</a
    >. If you're using Ubuntu/Debian, you can install it by opening a terminal
    and running:
  </p>

  <CodeBlock code="sudo apt-get install macchanger" />

  <p>
    Before changing the MAC address of an interface, you must first bring it
    down:
  </p>

  <CodeBlock code="sudo ifconfig <interface> down" />

  <p>
    For instance, if the interface whose MAC address you wish to change is
    <code>eth0</code>, run:
  </p>

  <CodeBlock code="sudo ifconfig eth0 down" />

  <p>
    Now you can change the MAC address of your interface with the following
    command:
  </p>

  <CodeBlock code="sudo macchanger -m <new-mac-address> <interface>" />

  <p>
    where <code>&lt;new-mac-address&gt;</code> must have the format
    <code>XX:XX:XX:XX:XX:XX</code>, with each <code>X</code> representing a
    hexadecimal digit (e.g. <code>a1:b2:c3:d4:e5:f6</code>). The output of the
    command above will display three MAC addresses: the (permanent) one set by
    the vendor, the current one (before being modified) and the new one being
    assigned to the interface. As an example, this is what I get when setting
    the MAC address of my <code>eth0</code> interface to
    <code>aa:bb:cc:dd:ee:ff</code>:
  </p>

  <CodeBlock
    code="
    Permanent MAC: f0:4d:a2:95:77:31 (Dell Inc.)
    Current   MAC: f0:4d:a2:95:77:31 (Dell Inc.)
    New       MAC: aa:bb:cc:dd:ee:ff (unknown)
    "
  />

  <p>To restore the interface's MAC address to its original value, run:</p>

  <CodeBlock code="sudo macchanger -p <interface>" />

  <SectionTitle>A deeper dive into the topic</SectionTitle>

  <p>
    A MAC address is a 48-bit long identifier which is assigned to a device when
    it is manufactured. This identifier is usually globally unique and commonly
    expressed as a string of six octets. The first three octets (24 bits)
    identify the organization which has manufactured the device (e.g. Intel
    Corporation, Cisco Systems, Netgear Inc. etc.; this organization is
    typically the device vendor) and correspond to an
    <a href="https://en.wikipedia.org/wiki/Organizationally_Unique_Identifier">
      Organizationally Unique Identifier</a
    >
    (OUI). Vendors must purchase OUI's from the
    <a href="https://en.wikipedia.org/wiki/IEEE_registration_authority"
      >IEEE registration authority</a
    >. You can see a list of OUIs and the organizations they belong to with the
    following command:
  </p>

  <CodeBlock code="sudo macchanger -l" />

  <p>
    To assign a random MAC address to your interface while keeping the OUI
    unchanged (in other words, a MAC address from the same vendor), run:
  </p>

  <CodeBlock code="sudo macchanger -e <interface>" />

  <p>
    To assign a random MAC address from any known vendor to your interface, run:
  </p>

  <CodeBlock code="sudo macchanger -a <interface>" />

  <p>
    Finally, to assign a completely random MAC address to your interface (this
    will very likely generate a MAC address with an invalid OUI), run:
  </p>

  <CodeBlock code="sudo macchanger -r <interface>" />

  <SectionTitle>MAC spoofing: an experiment</SectionTitle>

  <p>
    If you set the MAC address of your interface to the MAC address of some
    other device in your network, you will be <i>de facto</i> impersonating it.
    This is a form of attack called
    <a href="https://en.wikipedia.org/wiki/MAC_spoofing">MAC spoofing</a>.
  </p>

  <p>
    In order to better understand how MAC spoofing works, I ran the following
    experiment: I changed the MAC address of my laptop to the MAC address of my
    mobile phone and then connected my laptop to my wireless router (my phone
    was already connected). This caused my phone's internet connection to stop
    working, and it only started working again after I disconnected my laptop
    from the wireless router and reconnected my phone. By spoofing my laptop's
    MAC address, I have therefore produced a
    <a href="https://en.wikipedia.org/wiki/Denial-of-service_attack"
      >denial-of-service</a
    >
    attack, and if I kept on reconnecting my laptop to the router, my phone
    would be permanently deprived of internet access.
  </p>

  <p>
    In this situation, a denial of service happened because there are encryption
    parameters which must be in sync between a connected device and a
    <a href="https://en.wikipedia.org/wiki/Wireless_access_point"
      >wireless access point</a
    >
    (WAP). Connecting my laptop to the WAP using the same MAC address as my
    phone made my phone and the WAP become out of sync with respect to these
    parameters and therefore unable to communicate.
  </p>

  <SectionTitle>Bonus: The Coca Cola Company</SectionTitle>

  <p>
    While writing this post, I was surprised to find out that The Coca Cola
    Company has its own OUI. To see it, run:
  </p>

  <CodeBlock code="sudo macchanger -l | grep Coca" />

  <p>This is what the result should look like:</p>

  <CodeBlock code="14691 - fc:d4:f2 - The Coca Cola Company" />

  <p>
    Needless to say, such a weird fact
    <a
      href="http://tech.slashdot.org/story/14/01/02/170216/coca-cola-reserves-a-massive-range-of-mac-addresses"
      >did not go unnoticed</a
    >
    on Slashdot.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
