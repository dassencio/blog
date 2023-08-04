<template>
  <p>
    If you have a pcap file from which you want to extract all the network
    traffic associated with a certain host, i.e., all packets sent to or from
    this host, you can use
    <a href="http://linux.die.net/man/8/tcpdump"><code>tcpdump</code></a> to get
    the job done with the following shell command:
  </p>

  <CodeBlock
    code="tcpdump -r in-file.pcap -w out-file.pcap host <ip-address>"
  />

  <p>
    This command reads a pcap file named <code>in-file.pcap</code> as a packet
    stream and writes all packets sent to or from the host (specified by its IP
    address) to an output pcap file <code>out-file.pcap</code>.
  </p>

  <p>
    If you want to only visualize the host traffic on a terminal, omit the
    <code>-w out-file.pcap</code> part. By default, <code>tcpdump</code> will
    automatically convert IP addresses, port numbers, etc., to human-readable
    values such as hostnames and application names. You can disable this
    behavior by adding <code>-n</code> to the end of the command above.
  </p>

  <p>
    As a side note, <code>tcpdump</code> will automatically build a mapping
    between IP addresses and
    <a href="https://en.wikipedia.org/wiki/MAC_address">MAC addresses</a> from
    the packets in the pcap file, so non-IP traffic associated with the given
    host (e.g.,
    <a href="https://en.wikipedia.org/wiki/Address_Resolution_Protocol">ARP</a>
    and other
    <a href="https://en.wikipedia.org/wiki/OSI_model">layer 2</a> protocols) may
    be extracted as well, since <code>tcpdump</code> will assume that those
    packets were sent or received by that host. To only extract IPv4 traffic for
    the host, use the following command:
  </p>

  <CodeBlock
    code="tcpdump **ip** -r in-file.pcap -w out-file.pcap host <ip-address>"
  />

  <p>
    To extract only
    <a href="https://en.wikipedia.org/wiki/IPv6">IPv6</a> traffic, run:
  </p>

  <CodeBlock
    code="tcpdump **ip6** -r in-file.pcap -w out-file.pcap host <ip-address>"
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
