<template>
  <p>
    This post describes how to obtain and interpret the
    <a href="https://en.wikipedia.org/wiki/Routing_table">routing table</a>
    of your system on Linux. A routing table is a set of rules that specify how
    network packets are routed based on their destination
    <a href="https://en.wikipedia.org/wiki/IP_address">IP addresses</a>.
  </p>

  <p>
    To understand this post, you should be familiar with two concepts: the
    <a href="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing"
      >CIDR notation</a
    >, which is used to specify IP subnetworks in the format
    <code>&lt;network-prefix&gt;/&lt;netmask-length&gt;</code>, and the
    <a href="https://en.wikipedia.org/wiki/Longest_prefix_match"
      >longest prefix match</a
    >
    algorithm. If you're not familiar with them, please take the time to read
    the linked articles before proceeding. While our examples will focus on IPv4
    networks, all the concepts we go over apply to IPv6 networks as well.
  </p>

  <p>
    On Linux, there are two commands that are typically used for obtaining
    routing table information:
    <a href="http://linux.die.net/man/8/route"><code>route</code></a>
    and <a href="http://linux.die.net/man/8/ip"><code>ip</code></a
    >. This post will use the <code>ip</code> command because its output is
    easier to interpret than the output of <code>route</code>. To display the
    routing table of your system with the <code>ip</code> command, open a
    terminal and run:
  </p>

  <CodeBlock code="ip route show" />

  <p>
    The output will depend on your network configuration. Here is an example
    that is very common for devices connected to a
    <a href="https://en.wikipedia.org/wiki/Wireless_router">wireless router</a>
    in home networks:
  </p>

  <CodeBlock
    code="
    default via 192.168.1.1 dev wlan0
    192.168.1.0/24 dev wlan0  proto kernel  scope link  src 192.168.1.100
    "
  />

  <p>
    Let's interpret the output above, starting with the second line. This line
    states that packets sent to any IP address within the subnetwork
    <code>192.168.1.0/24</code> must be sent through the network interface
    <code>wlan0</code> (a
    <a
      href="https://en.wikipedia.org/wiki/Wireless_network_interface_controller"
      >wireless network interface</a
    >) with <code>192.168.1.100</code> as the source IP address, which in this
    case is the IP address assigned to <code>wlan0</code> via
    <a href="https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol"
      >DHCP</a
    >. In addition, <code>proto kernel</code> shows that this entry in the
    routing table was created by the kernel during autoconfiguration, while
    <code>scope link</code> expresses that the destination IP addresses within
    <code>192.168.1.0/24</code> are valid only on the device <code>wlan0</code>.
  </p>

  <p>
    The first line states that the
    <a href="https://en.wikipedia.org/wiki/Default_route">default route</a> for
    any packet (i.e., the route taken by a packet when no other route applies)
    is through the network device <code>wlan0</code> via the
    <a href="https://en.wikipedia.org/wiki/Default_gateway">default gateway</a>
    (the router), which has the IP address <code>192.168.1.1</code>.
    <FigureLink id="local-network" capitalized /> illustrates this network
    scheme.
  </p>

  <FigureBlock
    id="local-network"
    caption="A local network scheme. The IP addresses belonging to the local
             network fall within the range <code>192.168.1.0/24</code>. The
             external IP address of the router (the one visible to the Internet)
             is omitted."
  >
    <ResponsiveImage alt="Local network" :src="localNetwork" />
  </FigureBlock>

  <p>
    The <code>ip</code> command is highly flexible regarding its input
    parameters. You can enter them partially, and <code>ip</code> will
    autocomplete them internally. To clarify, all of the commands below are
    equivalent:
  </p>

  <CodeBlock
    code="
    ip r s
    ip r show
    ip ro sh
    ip route show
    "
  />

  <SectionTitle>A complex example: VPN routing</SectionTitle>

  <p>
    When you connect to a
    <a href="https://en.wikipedia.org/wiki/Virtual_private_network"
      >virtual private network</a
    >
    (VPN), your network traffic is routed through an encrypted tunnel to the VPN
    server. As an example, let's analyze how
    <a href="https://openvpn.net/">OpenVPN</a> accomplishes this. Consider what
    happens when the user of the laptop shown in
    <FigureLink id="local-network" /> connects to an OpenVPN server. First, a
    <a href="https://en.wikipedia.org/wiki/Virtual_network_interface"
      >virtual network interface</a
    >
    (usually named <code>tun0</code>) is created. Routes are then added to the
    routing table to direct all traffic through this virtual interface, where
    packets are encrypted and sent via the (physical) interface
    <code>wlan0</code> to the OpenVPN server.
    <FigureLink id="openvpn-scheme" capitalized /> illustrates a summary of this
    setup.
  </p>

  <FigureBlock
    id="openvpn-scheme"
    caption="An OpenVPN network scheme. The arrow from the router to the OpenVPN
             server indicates that the encrypted packet may travel through the
             Internet before reaching the server, where it's decrypted and then
             sent to its final destination."
  >
    <ResponsiveImage alt="OpenVPN scheme" :src="openvpnScheme" />
  </FigureBlock>

  <p>
    Below is a potential routing table for the OpenVPN client after it connects
    to the OpenVPN server:
  </p>

  <CodeBlock
    code="
    0.0.0.0/1 via 192.168.254.9 dev tun0
    default via 192.168.1.1 dev wlan0
    95.91.22.94 via 192.168.1.1 dev wlan0
    128.0.0.0/1 via 192.168.254.9 dev tun0
    192.168.1.0/24 dev wlan0  proto kernel  scope link  src 192.168.1.100
    192.168.254.0/24 via 192.168.254.9 dev tun0
    192.168.254.9 dev tun0  proto kernel  scope link  src 192.168.254.10
    "
  />

  <p>
    Covering all the details of this routing table would be tedious, so we will
    concentrate on the most relevant aspects. The second and fifth lines are
    identical to those in the routing table shown earlier, meaning the default
    route and the route for the local network remain unchanged. On the other
    hand, the first and fourth lines introduce two new routes that significantly
    alter the routing rules: packets with destination addresses matching either
    <code>0.0.0.0/1</code> or <code>128.0.0.0/1</code> are now routed through
    <code>tun0</code>, with <code>192.168.254.9</code> as the gateway IP
    address.
  </p>

  <p>
    The catch here is that <code>0.0.0.0/1</code> and
    <code>128.0.0.0/1</code> match packets with destination IP addresses where
    the first bit equals <code>0</code> and <code>1</code> respectively.
    Combined, they match all packets not matched by other routes. The fifth line
    will still apply for all IP addresses within the range
    <code>192.168.1.0/24</code> (so communicating with devices in the local
    network will still be possible), but since the first bit of a packet will
    always be either <code>0</code> or <code>1</code>, the default route will
    never be applied. In other words, OpenVPN creates two routes that
    collectively match every packet that is not addressed to a device in the
    local network; these packets are then routed to the interface
    <code>tun0</code>. From there, packets are encrypted and sent to
    <code>95.91.22.94</code> (the OpenVPN server). Finally, the route specified
    on the third line directs the packets to be sent out through the physical
    interface <code>wlan0</code> via the gateway <code>192.168.1.1</code>.
  </p>

  <p>
    The last two lines are also important. They exist due to the fact that
    OpenVPN creates the virtual <code>tun0</code> interface in
    <a
      href="https://en.wikipedia.org/wiki/Point-to-point_%28telecommunications%29"
      >point-to-point</a
    >
    mode, meaning this interface functions as if directly connected to another
    endpoint: the OpenVPN server. The server establishes a virtual local network
    <code>192.168.254.0/24</code> and assigns IP addresses from this pool to
    each endpoint of the connection. As shown on the last line, the IP address
    assigned to the client is <code>192.168.254.10</code>, with
    <code>192.168.254.9</code> being the IP address of the server endpoint. This
    can be seen more clearly by running:
  </p>

  <CodeBlock code="ip addr show dev tun0" />

  <p>
    The output provides a clear demonstration of the point-to-point connection
    mentioned in the previous paragraph:
  </p>

  <CodeBlock
    code="
    21: tun0: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UNKNOWN group default qlen 100
        link/none
        **inet 192.168.254.10 peer 192.168.254.9/32 scope global tun0**
          valid_lft forever preferred_lft forever
    "
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import localNetwork from "@/assets/images/local-network.svg";
import openvpnScheme from "@/assets/images/openvpn-scheme.svg";

onMounted(() => onViewMounted());
</script>
